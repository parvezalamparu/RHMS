import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/general/Button";
import { FaPlus } from "react-icons/fa6";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { Navigate } from "react-router-dom";

interface Role {
  id: number;
  name: string;
}

const generateRandomRoles = (count: number): Role[] => {
  const roles = ["Admin", "Manager", "Staff", "Pharmacist", "Accountant"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${roles[i % roles.length]} ${i + 1}`,
  }));
};


const RoleList = () => {
    const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>(generateRandomRoles(38));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState("");

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentRoles = filteredRoles.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentRoles.length;

  const handleAddRole = () => {
    if (newRole.trim()) {
      const newRoleObj: Role = {
        id: roles.length + 1,
        name: newRole.trim(),
      };
      setRoles([newRoleObj, ...roles]);
      setNewRole("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="pl-2 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 bg-[var(--base-color)] p-2">
        <h1 className="text-2xl font-bold text-[#035d67] uppercase">Role List</h1>
        <Button
          bgcolor="bg-white"
          border="border-3 border-[var(--dark-color)]"
          textColor="text-black"
          name="Add Role"
          icon={<FaPlus />}
          hover="hover:bg-gray-200"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
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
          placeholder="Search role..."
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
              <th className="px-4 py-2 border-r border-gray-300">Role Name</th>
              <th className="px-4 py-2">Assign Permission</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role, index) => (
              <tr key={role.id} className="border-t border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-1 border-r border-gray-200">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-1 border-r border-gray-200">{role.name}</td>
                <td className="px-4 py-1.5">
                  <Button
                    icon={<MdAssignmentAdd  className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border-2 border-gray-600"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() => navigate("/role/assign-permission")}
                    
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredRoles.length} entries
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

      {/* Add Role Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#035d67]">
            Add New Role
          </h2>
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            onBlur={() => {
              if (newRole.trim().length > 0) {
                toast.success("Created Successfully");
              }
            }}
            placeholder="Enter role name"
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
                onClick={handleAddRole}
                icon={<BiSave />}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RoleList;
