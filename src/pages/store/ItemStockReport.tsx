import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/store/general/Button";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { BsFiletypePdf } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import ToggleButton from "../../components/store/general/ToggleButton";
import FilterForm from "../../components/general/FilterForm";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

interface IssueItem {
  id: number;
  itemName: string;
  date: string;
  expDate: string;
  updatedBy: string;
  batchNo: string;
  qty: number;
  mrpUnit: number;
  rateUnit: number;
  subTotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
}

const ItemStockReport = () => {
  const [viewMode, setViewMode] = useState<"table" | "graph">("table");

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [tempFilters, setTempFilters] = useState<Record<string, string>>({});
  const [showFilter, setShowFilter] = useState(false);

  const filterFields = [
    { key: "startDate", label: "Start Date", type: "date" },
    { key: "endDate", label: "End Date", type: "date" },
    { key: "itemName", label: "Item Name", type: "text" },
    { key: "batchNo", label: "Batch No", type: "text" },
    { key: "id", label: "ID", type: "number" },
  ];

  const handleApply = () => {
    setFilters(tempFilters);
    setShowFilter(false);
  };

  const handleReset = () => {
    setTempFilters({});
    setFilters({});
  };

  const [items] = useState<IssueItem[]>(
    Array.from({ length: 20 }, (_, i) => {
      const qty = Math.floor(Math.random() * 100) + 1;
      const date = new Date();
      date.setDate(date.getDate() - i);

      const mrpUnit = parseFloat((Math.random() * 100).toFixed(2));
      const rateUnit = parseFloat((Math.random() * 80).toFixed(2));
      const subTotal = parseFloat((qty * rateUnit).toFixed(2));
      const cgst = parseFloat((subTotal * 0.06).toFixed(2));
      const sgst = parseFloat((subTotal * 0.06).toFixed(2));
      const igst = 0;
      const total = parseFloat((subTotal + cgst + sgst + igst).toFixed(2));

      return {
        id: i + 1,
        itemName: `Item ${i + 1}`,
        date: date.toISOString().split("T")[0],
        expDate: date.toISOString().split("T")[0],
        updatedBy: `User ${i + 1}`,
        batchNo: `BATCH-${2000 + i}`,
        qty,
        mrpUnit,
        rateUnit,
        subTotal,
        cgst,
        sgst,
        igst,
        total,
      };
    })
  );

  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof IssueItem;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof IssueItem) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const filterByForm = (item: IssueItem) => {
    const { startDate, endDate, itemName, batchNo, id } = filters;

    if (startDate && new Date(item.date) < new Date(startDate)) return false;
    if (endDate && new Date(item.date) > new Date(endDate)) return false;
    if (
      itemName &&
      !item.itemName.toLowerCase().includes(itemName.toLowerCase())
    )
      return false;
    if (batchNo && !item.batchNo.toLowerCase().includes(batchNo.toLowerCase()))
      return false;
    if (id && item.id.toString() !== id) return false;

    return true;
  };

  const filteredItems = items.filter(
    (item) =>
      filterByForm(item) &&
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key];
    const bVal = b[key];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }
    return direction === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = sortedItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const startNumber = startIndex + 1;
  const endNumber = startIndex + paginatedItems.length;

  const grandTotalAmount = filteredItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const headers: { label: string; key: keyof IssueItem | "sn" }[] = [
    { label: "SN", key: "sn" },
    { label: "Item Name", key: "itemName" },
    { label: "Date", key: "date" },
    { label: "Exp. Date", key: "expDate" },
    { label: "Updated By", key: "updatedBy" },
    { label: "Batch No.", key: "batchNo" },
    { label: "Qty", key: "qty" },
    { label: "MRP Unit", key: "mrpUnit" },
    { label: "Rate Unit", key: "rateUnit" },
    { label: "Sub Total", key: "subTotal" },
    { label: "CGST", key: "cgst" },
    { label: "SGST", key: "sgst" },
    { label: "IGST", key: "igst" },
    { label: "Total", key: "total" },
  ];

  const handleExportExcel = () => {
    const dataToExport = filteredItems.map((item, index) => ({
      "Sl. No": index + 1,
      "Item Name": item.itemName,
      Date: item.date,
      "Exp. Date": item.expDate,
      "Updated By": item.updatedBy,
      "Batch No": item.batchNo,
      QTY: item.qty,
      "MRP Unit": item.mrpUnit,
      "Rate Unit": item.rateUnit,
      "Sub Total": item.subTotal,
      SGST: item.sgst,
      CGST: item.cgst,
      IGST: item.igst,
      TOTAL: item.total,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Item stock Report");

    XLSX.writeFile(wb, "item_stock_report.xlsx");
  };

  const handleExportPDF = () => {
      const doc = new jsPDF();
  
      doc.setFontSize(16);
      doc.text("Item stock Report", 14, 15);
  
      const tableColumn = [
        "SN",
        "Item Name",
        "Exp. Date",
        "Updated By",
        "Date",
        "Batch No",
        "Qty",
        "MRP Unit",
        "Rate Unit",
        "Sub Total",
        "SGST",
        "CGST",
        "IGST",
        "TOTAL",
      ];
  
      const tableRows = filteredItems.map((item, index) => [
        index + 1,
        item.itemName,
        item.date,
        item.expDate,
        item.updatedBy,
        item.batchNo,
        item.qty,
        item.mrpUnit,
        item.rateUnit,
        item.subTotal,
        item.sgst,
        item.cgst,
        item.igst,
        item.total,
      ]);
  
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 25,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [3, 93, 103] },
      });
  
      doc.save("item_stock_report.pdf");
    };

  return (
    <div className="flex flex-col pl-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-[var(--base-color)] max-h-12 p-2">
        <h2 className="text-2xl font-bold text-[#035d67] uppercase">
          Item Stock Report
        </h2>
        <div>
          <div className="flex gap-2">
            {viewMode === "table" && (
              <div className="flex gap-2">
                {/* export buttons */}
                <Button
                  bgcolor="bg-white"
                  border="border-2 border-gray-800"
                  textColor="text-black"
                  name="PDF"
                  icon={<BsFiletypePdf />}
                  hover="hover:bg-gray-100"
                  onClick={handleExportPDF}
                />
                <Button
                  bgcolor="bg-white"
                  border="border-2 border-gray-800"
                  textColor="text-black"
                  name="Excel"
                  icon={<PiMicrosoftExcelLogo />}
                  hover="hover:bg-gray-100"
                  onClick={handleExportExcel}
                />
              </div>
            )}
            <Button
              bgcolor="bg-white"
              border="border-2 border-gray-800"
              textColor="text-black"
              name="Filter"
              icon={<CiFilter className="text-lg" />}
              hover="hover:bg-gray-100"
              onClick={() => setShowFilter((prev) => !prev)}
            />

            <ToggleButton viewMode={viewMode} setViewMode={setViewMode} />

            {viewMode === "table" ? "" : ""}
          </div>
        </div>
      </div>
      {showFilter && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-2">
          <FilterForm
            fields={filterFields}
            filters={tempFilters}
            setFilters={setTempFilters}
            onApply={handleApply}
            onReset={handleReset}
          />
        </div>
        // </div>
      )}

      {/* Top Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
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
          {/* search */}
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

      {/* Table or Graph View */}
      <div className="overflow-auto bg-white rounded shadow-md border border-gray-200">
        {viewMode === "table" ? (
          // Table
          <table className="w-full text-sm text-gray-800 border-collapse">
            <thead className="bg-[var(--base-color)] text-xs font-semibold">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.label}
                    className="px-4 py-3 border border-gray-300 text-left cursor-pointer select-none"
                    onClick={() =>
                      header.key !== "sn" &&
                      handleSort(header.key as keyof IssueItem)
                    }
                  >
                    {header.label}{" "}
                    {header.key !== "sn" && (
                      <span>
                        {sortConfig?.key === header.key
                          ? sortConfig.direction === "asc"
                            ? "▲"
                            : "▼"
                          : "⇅"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 && (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="text-center py-4 text-red-400 text-lg"
                  >
                    No data found
                  </td>
                </tr>
              )}

              {paginatedItems.map((item, index) => (
                <tr
                  key={item.id}
                  className="transition duration-150 border border-gray-300 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 min-w-[14rem]">
                    {item.itemName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.date}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.expDate}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 min-w-[10rem]">
                    {item.updatedBy}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.batchNo}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.qty}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.mrpUnit}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.rateUnit}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.subTotal}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.cgst}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.sgst}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.igst}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.total}
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              {filteredItems.length > 0 && (
                <tr className="bg-gray-100 font-bold text-blue-500">
                  <td
                    colSpan={13}
                    className="px-4 py-2 border border-gray-300 text-center"
                  >
                    Grand Total
                  </td>
                  <td colSpan={1} className="px-4 py-2 border border-gray-300">
                    {grandTotalAmount.toFixed(2)}
                  </td>
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

        {/* Pagination */}
        {viewMode === "table" && (
          <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
            <div>
              {!searchTerm ? (
                <p>
                  Showing {startNumber} to {endNumber} of {items.length} entries
                </p>
              ) : (
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
    </div>
  );
};

export default ItemStockReport;
