import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/store/general/Button";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { BsFiletypePdf } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { MdTableChart, MdBarChart } from "react-icons/md";


interface PurchaseOrderItem {
  id: number;
  purchaseorderId: string;
  itemName: string;
  date: string;
  qty: number;
}

const PurchaseOrderReport = () => {
  const [viewMode, setViewMode] = useState("table");

  const [items] = useState<PurchaseOrderItem[]>(
    Array.from({ length: 20 }, (_, i) => {
      const qty = Math.floor(Math.random() * 100) + 1;
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        id: i + 1,
        purchaseorderId: `PO-${1000 + i}`,
        itemName: `Item ${i + 1}`,
        date: date.toISOString().split("T")[0],
        qty,
      };
    })
  );

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PurchaseOrderItem;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof PurchaseOrderItem) => {
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
      item.purchaseorderId.toLowerCase().includes(searchTerm.toLowerCase())
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

  const totalQty = filteredItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="flex flex-col pl-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-[var(--base-color)] max-h-12 p-2">
        <h2 className="text-2xl font-bold text-[#035d67] uppercase">
          Purchase Order Report
        </h2>
        {viewMode === "table" && (
<div className="flex gap-2">
        {/* filter button */}
        <Button
          bgcolor="bg-white"
          border="border border-gray-300"
          textColor="text-black"
          icon={<CiFilter className="text-lg" />}
          hover="hover:bg-gray-100"
          title="Filter"
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

      {/* Table */}
      <div className="overflow-auto bg-white rounded shadow-md border border-gray-200">
        {viewMode === "table" ? (
          // table
        <table className="w-full text-sm text-gray-800 border-collapse">
          <thead className="bg-[var(--base-color)] text-xs font-semibold">
            <tr>
              {["SN", "PurchaseOrder ID", "Item Name", "Date", "Qty"].map(
                (header, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 border border-gray-300 text-left cursor-pointer select-none"
                    onClick={() =>
                      handleSort(
                        ["id", "purchaseorderId", "itemName", "date", "qty"][
                          idx
                        ] as keyof PurchaseOrderItem
                      )
                    }
                  >
                    {header}{" "}
                    <span>
                      {sortConfig?.key ===
                      (["id", "purchaseorderId", "itemName", "date", "qty"][
                        idx
                      ] as keyof PurchaseOrderItem)
                        ? sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"
                        : "⇅"}
                    </span>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 && (
              <tr>
                <td
                  colSpan={5}
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
                  {item.purchaseorderId}
                </td>
                <td className="px-4 py-2 border border-gray-300 min-w-[18rem]">
                  {item.itemName}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.date}
                </td>
                <td className="px-4 py-2 border border-gray-300">{item.qty}</td>
              </tr>
            ))}

            {/* Total row */}
            {filteredItems.length > 0 && (
              <tr className="bg-gray-100 font-bold text-blue-500">
                <td
                  colSpan={4}
                  className="px-4 py-2 border border-gray-300 text-center"
                >
                  Grand Total
                </td>
                <td className="px-4 py-2 border border-gray-300">{totalQty}</td>
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

export default PurchaseOrderReport;
