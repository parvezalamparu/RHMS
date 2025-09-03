import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/store/general/Button";
import { FaPlus } from "react-icons/fa6";
import { MdInfoOutline } from "react-icons/md";

interface Issue {
  id: string;
  requisitionNo: string;
  issueTo: string;
  generatedBy: string;
  date: string;
}

const generateRandomIssues = (count: number): Issue[] => {
  const requisitions = Array.from({ length: count }, (_, i) => `REQ-${(i + 1).toString().padStart(3, "0")}`);
  const people = ["John Doe", "Jane Smith", "Robert Brown", "Alice Johnson", "Steve Adams"];
  const issueToList = ["HR Dept", "Finance Dept", "Logistics Team", "Maintenance Team", "IT Support"];

  return Array.from({ length: count }, (_, i) => ({
    id: `ISS-${(i + 1).toString().padStart(3, "0")}`,
    requisitionNo: requisitions[Math.floor(Math.random() * requisitions.length)],
    issueTo: issueToList[Math.floor(Math.random() * issueToList.length)],
    generatedBy: people[Math.floor(Math.random() * people.length)],
    date: new Date(2025, 6, Math.floor(Math.random() * 30) + 1).toISOString().split("T")[0],
  }));
};

const ItemIssuePage = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<Issue[]>(generateRandomIssues(100));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Issue; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: keyof Issue) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedIssues = [...issues].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key]?.toString().toLowerCase() ?? "";
    const bVal = b[key]?.toString().toLowerCase() ?? "";
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredIssues = sortedIssues.filter((issue) => {
    const term = searchTerm.toLowerCase();
    return (
      issue.id.toLowerCase().includes(term) ||
      issue.requisitionNo.toLowerCase().includes(term) ||
      issue.issueTo.toLowerCase().includes(term) ||
      issue.generatedBy.toLowerCase().includes(term) ||
      issue.date.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentIssues = filteredIssues.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentIssues.length;

  const handleView = (id: string) => {
    const issue = issues.find((i) => i.id === id);
    if (issue) {
      alert(`View Issue:\n\n${JSON.stringify(issue, null, 2)}`);
    }
  };

  return (
    <div className="pl-2 bg-gray-50">
      <div className="flex justify-between items-center mb-2 bg-[var(--base-color)] px-4 max-h-14">
        <h1 className="text-2xl font-bold mb-5 text-[#035d67] uppercase pt-5">Issues</h1>
        <Button
          bgcolor="bg-white"
          border="border-3 border-[var(--dark-color)]"
          textColor="text-black"
          name="Issue New Item"
          icon={<FaPlus />}
          hover="hover:bg-gray-200"
          onClick={() => navigate("/store/issue/add-issue-form")}
        />
      </div>

      <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
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
              <th className="px-4 py-2 border-r border-gray-300">SN</th>
              {["id", "requisitionNo", "issueTo", "generatedBy", "date"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-r border-gray-300 cursor-pointer select-none"
                  onClick={() => handleSort(key as keyof Issue)}
                >
                  {key === "id"
                    ? "Issue No."
                    : key === "requisitionNo"
                    ? "Requisition No."
                    : key === "issueTo"
                    ? "Issue To"
                    : key === "generatedBy"
                    ? "Generated By"
                    : "Date"}
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
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentIssues.map((issue, index) => (
              <tr
                key={issue.id}
                className="border-t border-gray-300 hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-1 border-r border-gray-200">{startIdx + index + 1}</td>
                <td className="px-4 py-1 border-r border-gray-200">{issue.id}</td>
                <td className="px-4 py-1 border-r border-gray-200">{issue.requisitionNo}</td>
                <td className="px-4 py-1 border-r border-gray-200">{issue.issueTo}</td>
                <td className="px-4 py-1 border-r border-gray-200">{issue.generatedBy}</td>
                <td className="px-4 py-1 border-r border-gray-200">{issue.date}</td>
                <td className="px-4 py-1.5">
                  <Button
                    icon={<MdInfoOutline className="text-lg" />}
                    bgcolor="bg-blue-200"
                    border="border-2 border-blue-600"
                    textColor="text-blue-900"
                    hover="hover:bg-blue-100"
                    onClick={() => navigate(`/store/issue-item/view/${issue.id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredIssues.length} entries
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

export default ItemIssuePage;
