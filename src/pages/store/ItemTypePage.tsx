import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/store/general/Button";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import ToggleSwitch from "../../components/store/general/ToggleSwitchProps";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ItemType {
  id: number;
  name: string;
  status: boolean;
}

const generateRandomTypes = (count: number): ItemType[] => {
  const types = ["Consumable", "Durable", "Perishable", "Non-Stock", "Service"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${types[i % types.length]} ${i + 1}`,
    status: Math.random() > 0.5,
  }));
};

const ItemTypePage = () => {
  const [types, setTypes] = useState<ItemType[]>(generateRandomTypes(38));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [newType, setNewType] = useState("");
  const [editType, setEditType] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredTypes = types.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentTypes = filteredTypes.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentTypes.length;

  const handleStatusToggle = (id: number) => {
    setTypes((prev) =>
      prev.map((type) =>
        type.id === id ? { ...type, status: !type.status } : type
      )
    );
  };

  const handleAddType = () => {
    if (newType.trim()) {
      const newItem: ItemType = {
        id: types.length + 1,
        name: newType.trim(),
        status: true,
      };
      setTypes([newItem, ...types]);
      setNewType("");
      setIsAddModalOpen(false);
    }
  };

  const handleEditType = () => {
    if (editingId !== null && editType.trim()) {
      setTypes((prev) =>
        prev.map((type) =>
          type.id === editingId ? { ...type, name: editType.trim() } : type
        )
      );
      setEditType("");
      setEditingId(null);
      setIsEditModalOpen(false);
    }
  };

  const openEditModal = (type: ItemType) => {
    setEditType(type.name);
    setEditingId(type.id);
    setIsEditModalOpen(true);
  };

  return (
    <div className="pl-2 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-[var(--base-color)] p-2">
        <h1 className="text-2xl font-bold text-[#035d67] uppercase">
          Item Types
        </h1>
        <Button
          bgcolor="bg-white"
          border="border-3 border-[var(--dark-color)]"
          textColor="text-black"
          name="Add Type"
          icon={<FaPlus />}
          hover="hover:bg-gray-200"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center space-x-2">
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
        </div>

        <input
          type="search"
          className="border border-gray-300 px-3 py-2 rounded text-sm w-56 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          placeholder="Search type..."
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
              <th className="px-4 py-3 border-r border-gray-300">SL</th>
              <th className="px-4 py-3 border-r border-gray-300">Item Type</th>
              <th className="px-4 py-3 border-r border-gray-300">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTypes.map((type, index) => (
              <tr
                key={type.id}
                className={`border-t border-gray-300 transition duration-200 ${
                  type.status ? "hover:bg-gray-50" : "bg-red-50 text-gray-400"
                }`}
              >
                <td className="px-4 py-2 border-r border-gray-200">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">{type.name}</td>
                <td className="px-4 py-2 border-r border-gray-200">
                  <ToggleSwitch
                    checked={type.status}
                    onChange={() => handleStatusToggle(type.id)}
                  />
                </td>
                <td className="px-4 py-2">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border-2 border-gray-600"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() => openEditModal(type)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredTypes.length} entries
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
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        aria-labelledby="add-type-modal"
      >
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
            Add New Item Type
          </h2>
          <input
            type="text"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            placeholder="Enter type name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="flex justify-end gap-3 mt-8">
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
              onClick={handleAddType}
              icon={<BiSave />}
            />
          </div>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        aria-labelledby="edit-type-modal"
      >
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
            Edit Item Type
          </h2>
          <input
            type="text"
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
            placeholder="Enter type name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="flex justify-end gap-3 mt-8">
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
              name="Save"
              onClick={handleEditType}
              icon={<BiSave />}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ItemTypePage;
