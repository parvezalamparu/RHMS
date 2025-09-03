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

interface StoreDepartment {
  id: number;
  name: string;
  status: boolean;
}

const generateRandomDepartments = (count: number): StoreDepartment[] => {
  const names = ["Sales", "Logistics", "Procurement", "Maintenance", "Quality Control"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${names[i % names.length]} Dept ${i + 1}`,
    status: Math.random() > 0.5,
  }));
};

const StoreDepartmentPage = () => {
  const [departments, setDepartments] = useState<StoreDepartment[]>(generateRandomDepartments(42));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");
  const [editDepartment, setEditDepartment] = useState<StoreDepartment | null>(null);

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentDepartments = filteredDepartments.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentDepartments.length;

  const handleStatusToggle = (id: number) => {
    setDepartments((prev) =>
      prev.map((dept) =>
        dept.id === id ? { ...dept, status: !dept.status } : dept
      )
    );
  };

  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      const newItem: StoreDepartment = {
        id: departments.length + 1,
        name: newDepartment.trim(),
        status: true,
      };
      setDepartments([newItem, ...departments]);
      setNewDepartment("");
      setIsAddModalOpen(false);
    }
  };

  const handleEditClick = (dept: StoreDepartment) => {
    setEditDepartment(dept);
    setIsEditModalOpen(true);
  };

  const handleUpdateDepartment = () => {
    if (editDepartment && editDepartment.name.trim()) {
      setDepartments((prev) =>
        prev.map((dept) => (dept.id === editDepartment.id ? editDepartment : dept))
      );
      setEditDepartment(null);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="pl-2 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-[var(--base-color)] p-2">
        <h1 className="text-2xl font-bold text-[#035d67] uppercase">Store Departments</h1>
        <Button
          bgcolor="bg-white"
          border="border-3 border-[var(--dark-color)]"
          textColor="text-black"
          name="Add Department"
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
          placeholder="Search department..."
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
              <th className="px-4 py-2 border-r border-gray-300">Department Name</th>
              <th className="px-4 py-2 border-r border-gray-300">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentDepartments.map((dept, index) => (
              <tr
                key={dept.id}
                className={`border-t border-gray-300 transition duration-200 ${
                  dept.status ? "hover:bg-gray-50" : "bg-red-50 text-gray-400"
                }`}
              >
                <td className="px-4 border-r border-gray-200">
                  {startIdx + index + 1}
                </td>
                <td className="px-4 border-r border-gray-200">{dept.name}</td>
                <td className="px-4 border-r border-gray-200">
                  <ToggleSwitch
                    checked={dept.status}
                    onChange={() => handleStatusToggle(dept.id)}
                  />
                </td>
                <td className="px-4">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor="bg-yellow-200"
                    border="border-2 border-yellow-600"
                    textColor="text-yellow-900"
                    hover="hover:bg-yellow-100"
                    onClick={() => handleEditClick(dept)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredDepartments.length} entries
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

      {/* Add Department Modal */}
      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#035d67]">Add New Department</h2>
          <input
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder="Enter department name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="flex justify-end mt-4">
            <div className="mr-4">
              <Button
                bgcolor="bg-red-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-red-300"
                name="Close"
                onClick={() => setIsAddModalOpen(false)}
                icon={<IoIosCloseCircleOutline />}
              />
            </div>
            <Button
              bgcolor="bg-green-400"
              border="border-3 border-[--var(--base-color)]"
              textColor="text-black"
              hover="hover:bg-green-300"
              name="Save"
              onClick={handleAddDepartment}
              icon={<BiSave />}
            />
          </div>
        </Box>
      </Modal>

      {/* Edit Department Modal */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#035d67]">Edit Department</h2>
          <input
            type="text"
            value={editDepartment?.name || ""}
            onChange={(e) =>
              setEditDepartment((prev) => (prev ? { ...prev, name: e.target.value } : null))
            }
            placeholder="Enter department name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="flex justify-end mt-4">
            <div className="mr-4">
              <Button
                bgcolor="bg-red-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-red-300"
                name="Close"
                onClick={() => setIsEditModalOpen(false)}
                icon={<IoIosCloseCircleOutline />}
              />
            </div>
            <Button
              bgcolor="bg-green-400"
              border="border-3 border-[--var(--base-color)]"
              textColor="text-black"
              hover="hover:bg-green-300"
              name="Update"
              onClick={handleUpdateDepartment}
              icon={<BiSave />}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default StoreDepartmentPage;
