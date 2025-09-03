import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface DiscardItem {
  id: string;
  itemName: string;
  batchNo: string;
  returnedDept: string;
  returnedBy: string;
  qty: number;
  discardedBy: string;
  discardReason: string;
}

const generateRandomDiscardItems = (count: number): DiscardItem[] => {
  const items = ["Gloves", "Syringe", "Mask", "Bandage", "Sanitizer"];
  const departments = ["ICU", "Emergency", "Ward", "Pharmacy", "Lab"];
  const names = ["John Doe", "Jane Smith", "Robert Brown", "Alice Johnson", "Steve Adams"];
  const reasons = ["Expired", "Damaged", "Contaminated", "Recalled", "Broken Seal"];

  return Array.from({ length: count }, (_, i) => ({
    id: `DIS-${(i + 1).toString().padStart(3, "0")}`,
    itemName: items[Math.floor(Math.random() * items.length)],
    batchNo: `BATCH-${Math.floor(Math.random() * 9000) + 1000}`,
    returnedDept: departments[Math.floor(Math.random() * departments.length)],
    returnedBy: names[Math.floor(Math.random() * names.length)],
    qty: Math.floor(Math.random() * 50) + 1,
    discardedBy: names[Math.floor(Math.random() * names.length)],
    discardReason: reasons[Math.floor(Math.random() * reasons.length)],
  }));
};

const DiscardItemsPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<DiscardItem[]>(generateRandomDiscardItems(3));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof DiscardItem; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: keyof DiscardItem) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key]?.toString().toLowerCase() ?? "";
    const bVal = b[key]?.toString().toLowerCase() ?? "";
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredItems = sortedItems.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.id.toLowerCase().includes(term) ||
      item.itemName.toLowerCase().includes(term) ||
      item.batchNo.toLowerCase().includes(term) ||
      item.returnedDept.toLowerCase().includes(term) ||
      item.returnedBy.toLowerCase().includes(term) ||
      item.discardedBy.toLowerCase().includes(term) ||
      item.discardReason.toLowerCase().includes(term) ||
      item.qty.toString().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentItems.length;

  return (
    <div className="pl-2 bg-gray-50">
      <div className="flex justify-between items-center mb-6 bg-[var(--base-color)] px-4 max-h-14">
        <h1 className="text-2xl font-bold mb-6 text-[#035d67] uppercase pt-5">Discarded Items</h1>
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-sm text-gray-700">Show</label>
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
        </div>

        <input
          type="search"
          className="border border-gray-300 px-3 py-2 rounded text-sm w-56 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded shadow mb-8">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-[var(--base-color)] text-gray-700 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2 border-r border-gray-300">SL</th>
              {["itemName", "batchNo", "returnedDept", "returnedBy", "qty", "discardedBy", "discardReason"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-r border-gray-300 cursor-pointer select-none"
                  onClick={() => handleSort(key as keyof DiscardItem)}
                >
                  {key === "itemName"
                    ? "Item Name"
                    : key === "batchNo"
                    ? "Batch No"
                    : key === "returnedDept"
                    ? "Returned Dept"
                    : key === "returnedBy"
                    ? "Returned By"
                    : key === "qty"
                    ? "Qty"
                    : key === "discardedBy"
                    ? "Discarded By"
                    : "Discard Reason"}
                  {" "}
                  <span>
                    {sortConfig?.key === key
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
            {currentItems.map((item, index) => (
              <tr
                key={item.id}
                className="border-t border-gray-300 hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-2 border-r border-gray-200">{startIdx + index + 1}</td>
                <td className="px-4 py-2 border-r border-gray-200">{item.itemName}</td>
                <td className="px-4 py-2 border-r border-gray-200">{item.batchNo}</td>
                <td className="px-4 py-2 border-r border-gray-200">{item.returnedDept}</td>
                <td className="px-4 py-2 border-r border-gray-200">{item.returnedBy}</td>
                <td className="px-4 py-2 border-r border-gray-200">{item.qty}</td>
                <td className="px-4 py-2 border-r border-gray-200">{item.discardedBy}</td>
                <td className="px-4 py-2 border-r border-gray-200">{item.discardReason}</td>
                
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredItems.length} entries
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
      </div>
    </div>
  );
};

export default DiscardItemsPage;
