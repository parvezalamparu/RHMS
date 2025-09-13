import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Badge from "../../components/general/Badge";
import Button from "../../components/general/Button";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { BsFiletypePdf } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import ToggleButton from "../../components/store/general/ToggleButton";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

interface StockReportItem {
  id: number;
  itemName: string;
  unitType: string;
  totalQty: number;
  returnQty: number;
  amount: number;
  status: boolean;
}

const GeneralStockReport = () => {
  const [viewMode, setViewMode] = useState<"table" | "graph">("table");
  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = (data: any) => {
    console.log("Filter Data:", data);
  };

  const [items] = useState<StockReportItem[]>(
    Array.from({ length: 30 }, (_, i) => {
      const qty = Math.random() > 0.2 ? Math.floor(Math.random() * 100) : 0;
      return {
        id: i + 1,
        itemName: `Item ${i + 1}`,
        unitType: "PCS",
        totalQty: qty,
        returnQty: qty === 0 ? 0 : Math.floor(Math.random() * 10),
        amount: qty === 0 ? 0 : parseFloat((Math.random() * 500).toFixed(2)),
        status: qty > 0,
      };
    })
  );

  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof StockReportItem;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof StockReportItem) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sortedItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const startNumber = startIndex + 1;
  const endNumber = startIndex + paginatedItems.length;

  const totalAmount = filteredItems.reduce((sum, item) => sum + item.amount, 0);

  // EXPORT TO EXCEL
  const handleExportExcel = () => {
    // Map data to clean format
    const dataToExport = filteredItems.map((item, index) => ({
      "Sl. No": index + 1,
      "Item Name": item.itemName,
      "Unit Type": item.unitType,
      "Total Qty": item.totalQty,
      "Return Qty": item.returnQty,
      Amount: item.amount,
      Status: item.status ? "Available" : "Out of Stock",
    }));

    // Convert JSON to worksheet
    const ws = XLSX.utils.json_to_sheet(dataToExport);

    // Create a workbook and append worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "General Stock Report");

    // Save file
    XLSX.writeFile(wb, "general_stock_report.xlsx");
  };

  // EXPORT TO PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text("General Stock Report", 14, 15);

    // Table headers
    const tableColumn = [
      "Sl. No",
      "Item Name",
      "Unit Type",
      "Total Qty",
      "Return Qty",
      "Amount",
      "Status",
    ];

    // Table rows
    const tableRows = filteredItems.map((item, index) => [
      index + 1,
      item.itemName,
      item.unitType,
      item.totalQty,
      item.returnQty,
      `₹${item.amount.toFixed(2)}`,
      item.status ? "Available" : "Out of Stock",
    ]);

    // Add AutoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [3, 93, 103] },
    });

    // Save PDF
    doc.save("general_stock_report.pdf");
  };

  return (
    <div className="flex flex-col pl-2">
      <div className="flex justify-between items-center mb-3 bg-[var(--base-color)] max-h-12 p-2">
        <h2 className="text-2xl font-bold text-[#035d67] uppercase">
          General Stock Report
        </h2>
        <div className="flex gap-2">
          {viewMode === "table" && (
            <div className="flex gap-2">
              {/* export button */}
              <Button
                bgcolor="bg-white"
                border="border-2 border-gray-800"
                textColor="text-black"
                name="Export"
                icon={<BsFiletypePdf />}
                hover="hover:bg-gray-100"
                onClick={handleExportPDF}
              />
              <Button
                bgcolor="bg-white"
                border="border-2 border-gray-800"
                textColor="text-black"
                name="Export"
                icon={<PiMicrosoftExcelLogo />}
                hover="hover:bg-gray-100"
                onClick={handleExportExcel}
              />
            </div>
          )}
          {/* filter button */}
          <Button
            bgcolor="bg-white"
            border="border-2 border-gray-800"
            textColor="text-black"
            icon={<CiFilter className="text-lg" />}
            name="Filter"
            hover="hover:bg-gray-100"
            onClick={() => setShowFilter((prev) => !prev)}
          />

          {/* Toggle Button */}
          <ToggleButton viewMode={viewMode} setViewMode={setViewMode} />

          {viewMode === "table" ? "" : ""}
        </div>
      </div>
      {showFilter && <div className="bg-red-200 h-14"></div>}

      <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          {viewMode === "table" ? (
            <>
              <label htmlFor="pageSize" className="text-sm text-gray-700">
                Show
              </label>
              <select
                id="pageSize"
                className="border border-gray-300 cursor-pointer rounded px-2 py-1 text-sm"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </>
          ) : (
            <p className="text-sm text-gray-700">Graph View Enabled</p>
          )}
        </div>
        <div className="flex gap-6">
          {viewMode === "table" && (
            <input
              type="search"
              className="border px-3 py-2 rounded border-gray-300 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          )}
        </div>
      </div>

      <div className="overflow-auto bg-white rounded shadow-md border border-gray-200">
        {viewMode === "table" ? (
          <table className="w-full text-sm text-gray-800 border-collapse">
            <thead className="bg-[var(--base-color)] text-xs font-semibold">
              <tr>
                {[
                  "Sl. No",
                  "Item Name",
                  "Unit Type",
                  "Total Qty",
                  "Return Qty",
                  "Amount",
                  "Status",
                ].map((header, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 border border-gray-300 text-left cursor-pointer select-none"
                    onClick={() =>
                      handleSort(
                        [
                          "id",
                          "itemName",
                          "unitType",
                          "totalQty",
                          "returnQty",
                          "amount",
                          "status",
                        ][idx] as keyof StockReportItem
                      )
                    }
                  >
                    {header}{" "}
                    <span>
                      {sortConfig?.key ===
                      ([
                        "id",
                        "itemName",
                        "unitType",
                        "totalQty",
                        "returnQty",
                        "amount",
                        "status",
                      ][idx] as keyof StockReportItem)
                        ? sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"
                        : "⇅"}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-4 text-red-400 text-lg"
                  >
                    No data found
                  </td>
                </tr>
              )}
              {paginatedItems.map((item, index) => {
                const isOutOfStock = item.totalQty <= 0;
                return (
                  <tr
                    key={item.id}
                    className={`transition duration-150 border border-gray-300 ${
                      isOutOfStock
                        ? "bg-red-50 text-gray-400"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-2 border border-gray-300">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-1 border border-gray-300 min-w-[18rem]">
                      {item.itemName}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.unitType}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 min-w-[14rem]">
                      {item.totalQty}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {item.returnQty}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      ₹{item.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                          !isOutOfStock ? (
                            <Badge
                              label="Available"
                              color="bg-green-300"
                              text="text-white"
                            />
                          ) : (
                            <Badge
                              label="Out of stock"
                              text="text-white"
                              color="bg-red-300"
                            />
                          )
                        }`}
                      >
                        {!isOutOfStock ? (
                          <Badge
                            label="Available"
                            color="bg-green-400"
                            text="text-white"
                          />
                        ) : (
                          <Badge
                            label="Out of stock"
                            text="text-white"
                            color="bg-red-400"
                          />
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {/* Total row */}
              {filteredItems.length > 0 && (
                <tr className="bg-gray-100 font-bold text-blue-500">
                  <td
                    colSpan={5}
                    className="px-4 py-2 border border-gray-300 text-center"
                  >
                    Grand Total
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    ₹{totalAmount.toFixed(2)}
                  </td>
                  <td className="border border-gray-300"></td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          // Graph
          <>
            <div className="flex">
              <div className="p-4 w-1/2 ">
                {/* Replace with your chart library like recharts or chart.js */}
                <h3 className="text-lg font-semibold mb-4">Graph View</h3>

                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 21, label: "A" },
                        { id: 1, value: 14, label: "B" },
                        { id: 2, value: 34, label: "C" },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
              {/* div 2 */}
              <div className="w-1/2">
                <BarChart
                  xAxis={[{ data: ["group A", "group B", "group C"] }]}
                  series={[
                    { data: [4, 3, 5] },
                    { data: [1, 6, 3] },
                    { data: [2, 5, 6] },
                  ]}
                  height={300}
                />
              </div>
            </div>
            <div className="mt-8 px-2 border border-gray-200">
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    valueFormatter: (value) =>
                      value == null ? "NaN" : value.toString(),
                  },
                  {
                    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
                  },
                  {
                    data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
                    valueFormatter: (value) =>
                      value == null ? "?" : value.toString(),
                  },
                ]}
                height={200}
                margin={{ bottom: 10 }}
              />
            </div>
          </>
        )}
      </div>
      {/* pagination */}
      {viewMode === "table" && (
        <div className="flex justify-between items-center p-2 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            {!searchTerm && (
              <p>
                Showing {startNumber} to {endNumber} of {items.length} entries
              </p>
            )}
            {searchTerm && (
              <p>
                Showing {startNumber} to {endNumber} of {filteredItems.length}{" "}
                items (Filtered from {items.length} items)
              </p>
            )}
          </div>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default GeneralStockReport;
