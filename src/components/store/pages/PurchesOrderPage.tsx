import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../general/Button";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import AddPurchesOrderModal from "../forms/AddPurchesOrderModal";

interface PurchaseOrder {
  id: string;
  vendor: string;
  generatedBy: string;
  date: string;
}

const generateRandomPOs = (count: number): PurchaseOrder[] => {
  const vendors = ["ABC Suppliers", "XYZ Traders", "Delta Corp", "MegaMart", "QuickSupplies"];
  const names = ["John Doe", "Jane Smith", "Robert Brown", "Alice Johnson", "Steve Adams"];

  return Array.from({ length: count }, (_, i) => ({
    id: `PO-${(i + 1).toString().padStart(3, "0")}`,
    vendor: vendors[Math.floor(Math.random() * vendors.length)],
    generatedBy: names[Math.floor(Math.random() * names.length)],
    date: new Date(2025, 6, Math.floor(Math.random() * 30) + 1).toISOString().split("T")[0],
  }));
};

const PurchaseOrderPage = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(generateRandomPOs(100));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof PurchaseOrder; direction: "asc" | "desc" } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false); // ✅ Modal state

  const handleSort = (key: keyof PurchaseOrder) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedOrders = [...purchaseOrders].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key]?.toString().toLowerCase() ?? "";
    const bVal = b[key]?.toString().toLowerCase() ?? "";
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredOrders = sortedOrders.filter((order) => {
    const term = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(term) ||
      order.vendor.toLowerCase().includes(term) ||
      order.generatedBy.toLowerCase().includes(term) ||
      order.date.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIdx, startIdx + itemsPerPage);

  const handleEdit = (id: string) => {
    const order = purchaseOrders.find((o) => o.id === id);
    if (order) {
      alert(`Edit Order:\n\n${JSON.stringify(order, null, 2)}`);
    }
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentOrders.length;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Purchase Orders</h1>
        <Button
          bgcolor="bg-white"
          border="border-3 border-[var(--dark-color)]"
          textColor="text-black"
          name="Add PO"
          icon={<FaPlus />}
          hover="hover:bg-gray-200"
          onClick={() => setShowAddModal(true)} // ✅ Open modal
        />
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-sm text-gray-700">
            Show
          </label>
          <select
            id="pageSize"
            className="border rounded px-2 py-1 text-sm"
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
          className="border px-3 py-2 rounded text-sm w-56"
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
              <th className="px-4 py-3 border-r border-gray-300">SN</th>
              {["id", "vendor", "generatedBy", "date"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 border-r border-gray-300 cursor-pointer select-none"
                  onClick={() => handleSort(key as keyof PurchaseOrder)}
                >
                  {key === "id"
                    ? "Purchase Order No."
                    : key.charAt(0).toUpperCase() + key.slice(1)}
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
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr
                key={order.id}
                className="border-t border-gray-300 hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-2 border-r border-gray-200">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">{order.id}</td>
                <td className="px-4 py-2 border-r border-gray-200">{order.vendor}</td>
                <td className="px-4 py-2 border-r border-gray-200">{order.generatedBy}</td>
                <td className="px-4 py-2 border-r border-gray-200">{order.date}</td>
                <td className="px-4 py-2">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border-2 border-gray-600"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() => handleEdit(order.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredOrders.length} entries
          </div>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => changePage(page)}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </div>
      </div>

      {/* ✅ Render modal */}
      <AddPurchesOrderModal open={showAddModal} handleClose = {() => setShowAddModal(false)} />
    </div>
  );
};

export default PurchaseOrderPage;
