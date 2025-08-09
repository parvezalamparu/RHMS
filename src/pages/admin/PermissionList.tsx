import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/store/general/Button";
import { FaPlus } from "react-icons/fa6";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

interface Permission {
  id: number;
  name: string;
}

const generateRandomPermissions = (count: number): Permission[] => {
  const permissions = [
    "View Dashboard",
    "Edit Users",
    "Delete Records",
    "Manage Inventory",
    "Approve Requests",
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${permissions[i % permissions.length]} ${i + 1}`,
  }));
};

const PermissionList = () => {
  const [permissions, setPermissions] = useState<Permission[]>(
    generateRandomPermissions(22)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPermission, setNewPermission] = useState("");

  const filteredPermissions = permissions.filter((permission) =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentPermissions = filteredPermissions.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentPermissions.length;

  const handleAddPermission = () => {
    if (newPermission.trim()) {
      const newPermissionObj: Permission = {
        id: permissions.length + 1,
        name: newPermission.trim(),
      };
      setPermissions([newPermissionObj, ...permissions]);
      setNewPermission("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="pl-2 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-[var(--base-color)] p-2">
        <h1 className="text-2xl font-bold text-[#035d67] uppercase">Permission List</h1>
        
      </div>

      {/* Filters */}
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
          placeholder="Search permission..."
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
              <th className="px-4 py-3">Permission Name</th>
            </tr>
          </thead>
          <tbody>
            {currentPermissions.map((permission, index) => (
              <tr key={permission.id} className="border-t border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-4 border-r border-gray-200">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2">{permission.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredPermissions.length} entries
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

      {/* Add Permission Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#035d67]">
            Add New Permission
          </h2>
          <input
            type="text"
            value={newPermission}
            onChange={(e) => setNewPermission(e.target.value)}
            onBlur={() => {
              if (newPermission.trim().length > 0) {
                toast.success("Created Successfully");
              }
            }}
            placeholder="Enter permission name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="flex justify-end mt-6">
            <div className="mx-4">
              <Button
                bgcolor="bg-red-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-red-300"
                name="Close"
                onClick={() => setIsModalOpen(false)}
                icon={<IoIosCloseCircleOutline />}
              />
            </div>
            <div>
              <Button
                bgcolor="bg-green-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-green-300"
                name="Save"
                onClick={handleAddPermission}
                icon={<BiSave />}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PermissionList;
