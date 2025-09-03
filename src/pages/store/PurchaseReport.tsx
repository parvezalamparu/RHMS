import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/store/general/Button";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { BsFiletypePdf } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { MdTableChart, MdBarChart } from "react-icons/md";

interface PurchaseItem {
  id: number;
  purchaseId: string;
  itemName: string;
  date: string;
  purchaseBy: string;
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

const PurchaseReport = () => {
  const [viewMode, setViewMode] = useState("table");
  const [items] = useState<PurchaseItem[]>(
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
        purchaseId: `PO-${1000 + i}`,
        itemName: `Item ${i + 1}`,
        date: date.toISOString().split("T")[0],
        purchaseBy: `User ${i + 1}`,
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

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PurchaseItem;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof PurchaseItem) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.purchaseId.toLowerCase().includes(searchTerm.toLowerCase())
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

  const totalQty = filteredItems.reduce((sum, item) => sum + item.qty, 0);
  const grandTotalAmount = filteredItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const headers: { label: string; key: keyof PurchaseItem | "sn" }[] = [
    { label: "SN", key: "sn" },
    { label: "Purchase ID", key: "purchaseId" },
    { label: "Item Name", key: "itemName" },
    { label: "Date", key: "date" },
    { label: "Purchase By", key: "purchaseBy" },
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

  return (
    <div className="flex flex-col pl-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-[var(--base-color)] max-h-12 p-2">
        <h2 className="text-2xl font-bold text-[#035d67] uppercase">
          Purchase Report
        </h2>
        {viewMode === "table" && (
          <div className="flex gap-2">
            {/* filter button */}
            <Button
              bgcolor="bg-white"
              border="border-2 border-gray-800"
              textColor="text-black"
              icon={<CiFilter className="text-lg" />}
              hover="hover:bg-gray-100"
            />
            {/* export button */}

            <Button
              bgcolor="bg-white"
              border="border-2 border-gray-800"
              textColor="text-black"
              name="Export"
              icon={<BsFiletypePdf />}
              hover="hover:bg-gray-100"
            />
            <Button
              bgcolor="bg-white"
              border="border-2 border-gray-800"
              textColor="text-black"
              name="Export"
              icon={<PiMicrosoftExcelLogo />}
              hover="hover:bg-gray-100"
            />
          </div>
        )}
      </div>

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
                <option value="10">10</option>
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
          {/* Toggle Button */}
          <button
            onClick={() =>
              setViewMode(viewMode === "table" ? "graph" : "table")
            }
            className="border border-gray-300 px-3 py-2 w-[6rem] rounded shadow-sm flex items-center gap-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            {viewMode === "table" ? (
              <>
                <MdBarChart className="text-lg" />
                Graph
              </>
            ) : (
              <>
                <MdTableChart className="text-lg" />
                Table
              </>
            )}
          </button>
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

      {/* Table */}
      <div className="overflow-auto bg-white rounded shadow-md border border-gray-200">
        {viewMode === "table" ? (
          <table className="w-full text-sm text-gray-800 border-collapse">
            <thead className="bg-[var(--base-color)] text-xs font-semibold">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.label}
                    className="px-4 py-3 border border-gray-300 text-left cursor-pointer select-none"
                    onClick={() =>
                      header.key !== "sn" &&
                      handleSort(header.key as keyof PurchaseItem)
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
                  <td className="px-4 py-2 border border-gray-300">
                    {item.purchaseId}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 min-w-[14rem]">
                    {item.itemName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.date}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 min-w-[10rem]">
                    {item.purchaseBy}
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
          <div className="p-4">
            {/* Replace with your chart library like recharts or chart.js */}
            <h3 className="text-lg font-semibold mb-4">Graph View</h3>
            <p className="text-gray-600">Show Graph</p>
          </div>
        )}
      </div>

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
  );
};

export default PurchaseReport;
