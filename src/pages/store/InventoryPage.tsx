import { useState, useEffect } from "react";
import AddItemModal from "../../components/store/forms/AddItemModal";
import EditItemModal from "../../components/store/forms/EditItemModal";
import ToggleSwitch from "../../components/store/general/ToggleSwitchProps";
import Button from "../../components/store/general/Button";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { MdInfoOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export interface Item {
  id: number;
  itemName: string;
  itemCode: string;
  itemType: string;
  itemCategory: string;
  itemSubCategory?: string;
  lowLevel: number;
  highLevel: number;
  company?: string;
  stored?: string;
  hsn?: string;
  itemUnit: string;
  subUnitQty: number;
  subItemUnit: string;
  rackNo: string;
  shelfNo?: string;
  image?: File | null;
  activated: boolean;
  currentStock?: number;
}

export interface NewItemData
  extends Omit<Item, "id" | "activated" | "currentStock"> {}

const InventoryPage = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState<Item[]>(
    Array.from({ length: 92 }, (_, i) => ({
      id: i + 1,
      itemName: `Item ${i + 1}`,
      itemCode: `CODE${1000 + i}`,
      itemType: "Consumable",
      itemCategory: "Stationery",
      itemSubCategory: "Pens",
      lowLevel: 5,
      highLevel: 50,
      company: "BrandX",
      stored: "Warehouse A",
      hsn: `HSN-${i + 1}`,
      itemUnit: "PCS",
      subUnitQty: 1,
      subItemUnit: "PCS",
      rackNo: `R${i + 1}`,
      shelfNo: `S${i + 1}`,
      image: null,
      activated: true,
      currentStock: 20,
    }))
  );

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Item;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hsn?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key: keyof Item) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key]?.toString().toLowerCase() ?? "";
    const bVal = b[key]?.toString().toLowerCase() ?? "";
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

  const toggleActivation = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, activated: !item.activated } : item
      )
    );
  };

  const handleSaveEdit = (updated: Item) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditItem(null);
  };

  const handleAddItem = (data: NewItemData) => {
    const newId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem: Item = {
      id: newId,
      ...data,
      activated: true,
      currentStock: 0,
    };
    setItems((prev) => [...prev, newItem]);
    setCurrentPage(1);
    setSearchTerm("");
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen pl-2">
      <div className="flex justify-between items-center mb-4 bg-[var(--base-color)] max-h-12 p-2">
        <h2 className="text-2xl font-bold text-[#035d67] uppercase">Items</h2>
        <Button
          bgcolor="bg-white"
          border="border-2 border-gray-800"
          textColor="text-black"
          name="Add Item"
          icon={<FaPlus className="text-lg" />}
          hover="hover:bg-gray-100"
          onClick={() => setShowAddModal(true)}
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
          className="border px-3 py-2 rounded text-sm w-56 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-auto bg-white rounded shadow-md border border-gray-200">
        <table className="w-full text-sm text-gray-800 border-collapse">
          <thead className="bg-[var(--base-color)] text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border border-gray-300 text-left">SN</th>
              {[
                "itemName",
                "itemCategory",
                "itemUnit",
                "subItemUnit",
                "hsn",
                "available",
              ].map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 border border-gray-300 text-left cursor-pointer select-none"
                  onClick={() => handleSort(key as keyof Item)}
                >
                  {key === "hsn"
                    ? "HSN/SAC"
                    : key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                  <span>
                    {sortConfig?.key === key
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : "⇅"}
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 border border-gray-300 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-4 text-red-400 text-lg"
                >
                  No items found
                </td>
              </tr>
            )}
            {paginatedItems.map((item, index) => (
              <tr
                key={item.id}
                className={`transition duration-150 border border-gray-300 ${
                  item.activated
                    ? "hover:bg-gray-50"
                    : "bg-red-50 text-gray-400"
                }`}
              >
                <td className="px-4 py-2 border border-gray-300">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.itemName}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.itemCategory}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.itemUnit}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.subItemUnit}
                </td>
                <td className="px-4 py-2 border border-gray-300">{item.hsn}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <ToggleSwitch
                    checked={item.activated}
                    onChange={() => toggleActivation(item.id)}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 flex gap-2">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border border-gray-500"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() => setEditItem(item)}
                    title="Edit Item"
                  />
                  <Button
                    icon={<MdInfoOutline className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border border-gray-500"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() =>
                      navigate(`/store/all-items/${item.id}`, { state: item })
                    }
                    title="View Item"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      <AddItemModal
        open={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleAddItem={handleAddItem}
      />

      {editItem && (
        <EditItemModal
          editItem={editItem}
          setEditItem={setEditItem}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default InventoryPage;
