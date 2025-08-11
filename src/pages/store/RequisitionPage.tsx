import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/store/general/Button";
import { FaRegEye, FaPlus } from "react-icons/fa6";


interface Requisition {
  id: string;
  generatedBy: string;
  department: string;
  date: string;
}

const generateRandomRequisitions = (count: number): Requisition[] => {
  const departments = ["HR", "Finance", "Logistics", "Maintenance", "IT"];
  const names = ["John Doe", "Jane Smith", "Robert Brown", "Alice Johnson", "Steve Adams"];

  return Array.from({ length: count }, (_, i) => ({
    id: `REQ-${(i + 1).toString().padStart(3, "0")}`,
    generatedBy: names[Math.floor(Math.random() * names.length)],
    department: departments[Math.floor(Math.random() * departments.length)],
    date: new Date(2025, 6, Math.floor(Math.random() * 30) + 1).toISOString().split("T")[0],
  }));
};

const RequisitionPage = () => {
  const navigate = useNavigate();
  const [requisitions, setRequisitions] = useState<Requisition[]>(generateRandomRequisitions(100));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Requisition; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: keyof Requisition) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedRequisitions = [...requisitions].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key]?.toString().toLowerCase() ?? "";
    const bVal = b[key]?.toString().toLowerCase() ?? "";
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredRequisitions = sortedRequisitions.filter((req) => {
    const term = searchTerm.toLowerCase();
    return (
      req.id.toLowerCase().includes(term) ||
      req.generatedBy.toLowerCase().includes(term) ||
      req.department.toLowerCase().includes(term) ||
      req.date.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredRequisitions.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentRequisitions = filteredRequisitions.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentRequisitions.length;

  const handleEdit = (id: string) => {
    const req = requisitions.find((r) => r.id === id);
    if (req) {
      alert(`Edit Requisition:\n\n${JSON.stringify(req, null, 2)}`);
    }
  };

  return (
    <div className="pl-2 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6 bg-[var(--base-color)] px-4 max-h-14">
        <h1 className="text-2xl font-bold mb-6 text-[#035d67] uppercase pt-5">Requisitions</h1>
        <Button
          bgcolor="bg-white"
          border="border-3 border-[var(--dark-color)]"
          textColor="text-black"
          name="Add Requisition"
          icon={<FaPlus />}
          hover="hover:bg-gray-200"
          onClick={() => navigate("/store/requisition/add-requisition-form" )}
        />
      </div>

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
              {["id", "generatedBy", "department", "date"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 border-r border-gray-300 cursor-pointer select-none"
                  onClick={() => handleSort(key as keyof Requisition)}
                >
                  {key === "id"
                    ? "Requisition No."
                    : key === "generatedBy"
                    ? "Generated By"
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
            {currentRequisitions.map((req, index) => (
              <tr
                key={req.id}
                className="border-t border-gray-300 hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-2 border-r border-gray-200">{startIdx + index + 1}</td>
                <td className="px-4 py-2 border-r border-gray-200">{req.id}</td>
                <td className="px-4 py-2 border-r border-gray-200">{req.generatedBy}</td>
                <td className="px-4 py-2 border-r border-gray-200">{req.department}</td>
                <td className="px-4 py-2 border-r border-gray-200">{req.date}</td>
                <td className="px-4 py-2">
                  <Button
                    icon={<FaRegEye className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border-2 border-gray-600"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() => handleEdit(req.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredRequisitions.length} entries
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
    </div>
  );
};

export default RequisitionPage;
