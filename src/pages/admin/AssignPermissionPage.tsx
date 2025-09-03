import React, { useState } from "react";
import ToggleSwitch from "../../components/store/general/ToggleSwitchProps";

interface Permission {
  id: number;
  name: string;
  enabled: boolean;
}

const AssignPermissionPage: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 1, name: "ADM FORM", enabled: false },
    { id: 2, name: "ALL BILL", enabled: false },
    { id: 3, name: "ALL RECEIPT", enabled: false },
    { id: 4, name: "ALL REFUND", enabled: false },
    { id: 5, name: "APPOINTMENT", enabled: true },
    { id: 6, name: "BED", enabled: false },
    { id: 7, name: "BED DETAILS", enabled: false },
    { id: 8, name: "BED STATUS", enabled: false },
    { id: 9, name: "BILL REPORTS", enabled: true },
    { id: 10, name: "BILLING REPORT", enabled: true },
    { id: 11, name: "BIRTH REPORT", enabled: true },
    { id: 12, name: "CHARGES", enabled: true },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const toggleActivation = (id: number) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, enabled: !p.enabled } : p
      )
    );
  };

  const filteredPermissions = permissions.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen pl-2">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-4 bg-[var(--base-color)] max-h-12 p-2">
        <h2 className="text-2xl font-bold text-[#035d67] uppercase">
          ASSIGN PERMISSION TO : ADMIN
        </h2>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-end mb-4">
        <input
          type="search"
          className="border px-3 py-2 rounded text-sm w-56 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          placeholder="Search Permissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white rounded shadow-md border border-gray-200">
        <table className="w-full text-sm text-gray-800 border-collapse">
          <thead className="bg-[var(--base-color)] text-xs font-semibold text-gray-800">
            <tr>
              <th className="px-4 py-3 border border-gray-300 text-left">Sl.</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Permission</th>
              <th className="px-4 py-3 border border-gray-300 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPermissions.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-red-400 text-lg">
                  No permissions found
                </td>
              </tr>
            )}
            {filteredPermissions.map((permission) => (
              <tr
                key={permission.id}
                className={`transition duration-150 border border-gray-300 ${
                  permission.enabled
                    ? "hover:bg-gray-50"
                    : "bg-red-50 text-gray-400"
                }`}
              >
                <td className="px-4 py-1 border border-gray-300">
                  {permission.id}
                </td>
                <td className="px-4 py-1 border border-gray-300">
                  {permission.name}
                </td>
                <td className="px-4 py-1 border border-gray-300">
                  <ToggleSwitch
                    checked={permission.enabled}
                    onChange={() => toggleActivation(permission.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignPermissionPage;
