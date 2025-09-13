import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/general/Button";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import ToggleSwitch from "../../components/store/general/ToggleSwitchProps";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ItemStore {
  id: number;
  name: string;
  status: boolean;
}

const generateRandomStores = (count: number): ItemStore[] => {
  const names = ["Main Warehouse", "Branch Store", "Depot", "Backup", "Service Bay"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${names[i % names.length]} ${i + 1}`,
    status: Math.random() > 0.5,
  }));
};

const ItemStorePage = () => {
  const [stores, setStores] = useState<ItemStore[]>(generateRandomStores(34));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStore, setNewStore] = useState("");

  // Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStore, setEditStore] = useState<ItemStore | null>(null);

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentStores = filteredStores.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentStores.length;

  const handleStatusToggle = (id: number) => {
    setStores((prev) =>
      prev.map((store) =>
        store.id === id ? { ...store, status: !store.status } : store
      )
    );
  };

  const handleAddStore = () => {
    if (newStore.trim()) {
      const newItem: ItemStore = {
        id: stores.length + 1,
        name: newStore.trim(),
        status: true,
      };
      setStores([newItem, ...stores]);
      setNewStore("");
      setIsAddModalOpen(false);
    }
  };

  const handleEditClick = (store: ItemStore) => {
    setEditStore(store);
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    if (editStore && editStore.name.trim()) {
      setStores((prev) =>
        prev.map((store) =>
          store.id === editStore.id ? { ...store, name: editStore.name } : store
        )
      );
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="pl-2 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-[var(--base-color)] p-2">
        <h1 className="text-2xl font-bold text-[#035d67] uppercase">Item Stores</h1>
        <Button
          bgcolor="bg-white"
          border="border-3 border-[var(--dark-color)]"
          textColor="text-black"
          name="Add Store"
          icon={<FaPlus />}
          hover="hover:bg-gray-200"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      {/* Filters */}
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
          placeholder="Search store..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow mb-8">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-[var(--base-color)] text-gray-700 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2 border-r border-gray-300">SL</th>
              <th className="px-4 py-2 border-r border-gray-300">Item Store</th>
              <th className="px-4 py-2 border-r border-gray-300">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStores.map((store, index) => (
              <tr
                key={store.id}
                className={`border-t border-gray-300 transition duration-200 ${
                  store.status ? "hover:bg-gray-50" : "bg-red-50 text-gray-400"
                }`}
              >
                <td className="px-4 border-r border-gray-200">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 border-r border-gray-200">{store.name}</td>
                <td className="px-4 border-r border-gray-200">
                  <ToggleSwitch
                    checked={store.status}
                    onChange={() => handleStatusToggle(store.id)}
                  />
                </td>
                <td className="px-4">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor="bg-yellow-200"
                    border="border-2 border-yellow-600"
                    textColor="text-yellow-900"
                    hover="hover:bg-yellow-100"
                    onClick={() => handleEditClick(store)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredStores.length} entries
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

      {/* Add Modal */}
      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#035d67]">Add New Store</h2>
          <input
            type="text"
            value={newStore}
            onChange={(e) => setNewStore(e.target.value)}
            placeholder="Enter store name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="flex justify-end gap-4 mt-8">
            <Button
              bgcolor="bg-red-400"
              border="border-3 border-[--var(--base-color)]"
              textColor="text-black"
              hover="hover:bg-red-300"
              name="Close"
              onClick={() => setIsAddModalOpen(false)}
              icon={<IoIosCloseCircleOutline />}
            />
            <Button
              bgcolor="bg-green-400"
              border="border-3 border-[--var(--base-color)]"
              textColor="text-black"
              hover="hover:bg-green-300"
              name="Save"
              onClick={handleAddStore}
              icon={<BiSave />}
            />
          </div>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#035d67]">Edit Store</h2>
          <input
            type="text"
            value={editStore?.name || ""}
            onChange={(e) =>
              setEditStore((prev) => (prev ? { ...prev, name: e.target.value } : prev))
            }
            placeholder="Edit store name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="flex justify-end gap-4 mt-8">
            <Button
              bgcolor="bg-red-400"
              border="border-3 border-[--var(--base-color)]"
              textColor="text-black"
              hover="hover:bg-red-300"
              name="Close"
              onClick={() => setIsEditModalOpen(false)}
              icon={<IoIosCloseCircleOutline />}
            />
            <Button
              bgcolor="bg-green-400"
              border="border-3 border-[--var(--base-color)]"
              textColor="text-black"
              hover="hover:bg-green-300"
              name="Update"
              onClick={handleEditSave}
              icon={<BiSave />}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ItemStorePage;
