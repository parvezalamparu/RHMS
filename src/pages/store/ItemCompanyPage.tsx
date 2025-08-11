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
import toast from "react-hot-toast";

interface ItemCompany {
  id: number;
  name: string;
  status: boolean;
}

const generateRandomCompanies = (count: number): ItemCompany[] => {
  const companies = ["Nestle", "Unilever", "Procter & Gamble", "Kraft", "PepsiCo"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${companies[i % companies.length]} ${i + 1}`,
    status: Math.random() > 0.5,
  }));
};

const ItemCompanyPage = () => {
  const [companies, setCompanies] = useState<ItemCompany[]>(generateRandomCompanies(34));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Add modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState("");

  // Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCompany, setEditCompany] = useState<ItemCompany | null>(null);
  const [editCompanyName, setEditCompanyName] = useState("");

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentCompanies.length;

  const handleStatusToggle = (id: number) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, status: !company.status } : company
      )
    );
  };

  const handleAddCompany = () => {
    if (newCompany.trim()) {
      const newItem: ItemCompany = {
        id: companies.length + 1,
        name: newCompany.trim(),
        status: true,
      };
      setCompanies([newItem, ...companies]);
      setNewCompany("");
      setIsAddModalOpen(false);
    }
  };

  const handleEdit = (id: number) => {
    const selected = companies.find((c) => c.id === id);
    if (selected) {
      setEditCompany(selected);
      setEditCompanyName(selected.name);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = () => {
    if (editCompany && editCompanyName.trim()) {
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === editCompany.id ? { ...c, name: editCompanyName.trim() } : c
        )
      );
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="pl-2 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-[var(--base-color)] p-2">
        <h1 className="text-2xl font-bold text-[#035d67] uppercase">
          Item Companies
        </h1>
        <Button
          bgcolor="bg-white"
          border="border-3 border-[var(--dark-color)]"
          textColor="text-black"
          name="Add Company"
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
          placeholder="Search company..."
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
              <th className="px-4 py-3 border-r border-gray-300">Item Company</th>
              <th className="px-4 py-3 border-r border-gray-300">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.map((company, index) => (
              <tr
                key={company.id}
                className={`border-t border-gray-300 transition duration-200 ${
                  company.status ? "hover:bg-gray-50" : "bg-red-50 text-gray-400"
                }`}
              >
                <td className="px-4 py-2 border-r border-gray-200">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">
                  {company.name}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">
                  <ToggleSwitch
                    checked={company.status}
                    onChange={() => handleStatusToggle(company.id)}
                  />
                </td>
                <td className="px-4 py-2">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border-2 border-gray-600"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() => handleEdit(company.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredCompanies.length} entries
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
          <h2 className="text-xl font-semibold mb-4 text-center text-[#035d67]">
            Add New Item Company
          </h2>
          <input
            type="text"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
             onBlur={() => {
              if (newCompany.trim().length > 0) {
                toast.success("Created Successfully");
              }
            }}
            placeholder="Enter company name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="flex justify-end space-x-4 mt-8">
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
              onClick={handleAddCompany}
              icon={<BiSave />}
            />
          </div>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#035d67]">
            Edit Item Company
          </h2>
          <input
            type="text"
            value={editCompanyName}
            onChange={(e) => setEditCompanyName(e.target.value)}
             onBlur={() => {
              if (editCompanyName.trim().length > 0) {
                toast.success("Created Successfully");
              }
            }}
            placeholder="Edit company name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="flex justify-end space-x-4 mt-8">
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
              onClick={handleSaveEdit}
              icon={<BiSave />}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ItemCompanyPage;
