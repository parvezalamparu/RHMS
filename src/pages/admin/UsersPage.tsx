import { useState, useEffect } from "react";
import ToggleSwitch from "../../components/store/general/ToggleSwitchProps";
import Button from "../../components/store/general/Button";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";


export interface User {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  active: boolean;
}

const generateMockUsers = (): User[] => {
  const roles = ["Admin", "Manager", "Staff"];
  const users: User[] = [];

  for (let i = 1; i <= 27; i++) {
    users.push({
      id: i,
      employeeId: `RHDS-${1000 + i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      mobile: `98765${String(10000 + i).slice(1)}`,
      role: roles[i % roles.length],
      active: i % 3 !== 0, 
    });
  }

  return users;
};

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>(generateMockUsers());
  const [usersPerPage, setUsersPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key: keyof User) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key]?.toString().toLowerCase() ?? "";
    const bVal = b[key]?.toString().toLowerCase() ?? "";
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);

  const toggleActivation = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const startNumber = startIndex + 1;
  const endNumber = startIndex + paginatedUsers.length;

  return (
    <div className="flex flex-col min-h-screen pl-2">
      <div className="flex justify-between items-center mb-4 bg-[var(--base-color)] max-h-12 p-2">
        <h2 className="text-2xl font-bold text-[#035d67] uppercase">Users</h2>
        <Button
          bgcolor="bg-white"
          border="border-2 border-gray-800"
          textColor="text-black"
          name="Add User"
          icon={<FaPlus className="text-lg" />}
          hover="hover:bg-gray-100"
          onClick={() => navigate("/admin/users/add-user")}
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
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(parseInt(e.target.value));
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
          placeholder="Search by Name or ID..."
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
              <th className="px-4 py-3 border border-gray-300 text-left">SL No.</th>
              {["employeeId", "name", "email", "mobile", "role"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 border border-gray-300 text-left cursor-pointer select-none"
                  onClick={() => handleSort(key as keyof User)}
                >
                  {key === "employeeId"
                    ? "Employee ID"
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
              <th className="px-4 py-3 border border-gray-300 text-left">Active</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-red-400 text-lg">
                  No users found
                </td>
              </tr>
            )}
            {paginatedUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`transition duration-150 border border-gray-300 ${
                  user.active ? "hover:bg-gray-50" : "bg-red-50 text-gray-400"
                }`}
              >
                <td className="px-4 py-2 border border-gray-300">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">{user.employeeId}</td>
                <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                <td className="px-4 py-2 border border-gray-300">{user.mobile}</td>
                <td className="px-4 py-2 border border-gray-300">{user.role}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <ToggleSwitch
                    checked={user.active}
                    onChange={() => toggleActivation(user.id)}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 flex gap-2">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border border-gray-500"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() => alert("Open EditUserModal")}
                  />
                  <Button
                    icon={<MdInfoOutline className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border border-gray-500"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() => navigate(`/admin/users/${user.id}`, { state: user })}
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
              Showing {startNumber} to {endNumber} of {users.length} entries
            </p>
          )}
          {searchTerm && (
            <p>
              Showing {startNumber} to {endNumber} of {filteredUsers.length} items
              (Filtered from {users.length} total users)
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
    </div>
  );
};

export default Users;
