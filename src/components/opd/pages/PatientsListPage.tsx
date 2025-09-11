import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../store/general/Button";
import { MdInfoOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

interface Patient {
  uhid: string;
  name: string;
  due: number;
  guardian: string;
  gender: string;
  age: number;
  mobile: string;
  address: string;
  state: string;
}

// mock data
const generatePatients = (count: number): Patient[] => {
  const names = ["Rahul Das", "Anita Sharma", "Suresh Kumar", "Priya Roy", "Arjun Sen"];
  const guardians = ["Ramesh", "Sunita", "Kiran", "Manoj", "Deepa"];
  const addresses = [
    "Howrah",
    "Kolkata",
    "Uluberia",
    "Durgapur",
    "Siliguri",
  ];
  const genders = ["Male", "Female"];

  return Array.from({ length: count }, (_, i) => ({
    uhid: (425600 + i).toString(),
    name: names[Math.floor(Math.random() * names.length)],
    due: Math.random() > 0.6 ? Math.floor(Math.random() * 500) + 50 : 0,
    guardian: guardians[Math.floor(Math.random() * guardians.length)],
    gender: genders[Math.floor(Math.random() * genders.length)],
    age: Math.floor(Math.random() * 50) + 18,
    mobile: (6000000000 + Math.floor(Math.random() * 999999999)).toString(),
    address: addresses[Math.floor(Math.random() * addresses.length)],
    state: "West Bengal(W.B)"
    
  }));
};

const PatientListPage = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>(generatePatients(100));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Patient; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: keyof Patient) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedPatients = [...patients].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key]?.toString().toLowerCase() ?? "";
    const bVal = b[key]?.toString().toLowerCase() ?? "";
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredPatients = sortedPatients.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.uhid.toLowerCase().includes(term) ||
      p.name.toLowerCase().includes(term) ||
      p.guardian.toLowerCase().includes(term) ||
      p.mobile.toLowerCase().includes(term) ||
      p.address.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentPatients = filteredPatients.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentPatients.length;

  return (
    <div className="pl-2 bg-gray-50">
      <div className="flex justify-between items-center mb-2 bg-[var(--base-color)] px-4 max-h-14">
        <h1 className="text-2xl font-bold mb-6 text-[#035d67] uppercase pt-5">
          Patients
        </h1>
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
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>

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
              {["uhid", "name", "due", "guardian", "gender", "age", "mobile", "address"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-r border-gray-300 cursor-pointer select-none"
                  onClick={() => handleSort(key as keyof Patient)}
                >
                  {key === "uhid"
                    ? "UHID No."
                    : key === "name"
                    ? "Patient Name"
                    : key === "due"
                    ? "Due Amount"
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
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((p, index) => (
              <tr
                key={p.uhid}
                className={`border-t border-gray-300 ${
                  p.due > 0 ? "bg-red-50" : "bg-green-50"
                }`}
              >
                <td className="px-4 py-2 border-r border-gray-200">{startIdx + index + 1}</td>
                <td className="px-4 py-2 border-r border-gray-200">{p.uhid}</td>
                <td className="px-4 py-2 border-r border-gray-200">{p.name}</td>
                <td className="px-4 py-2 border-r border-gray-200">{p.due > 0 ? (
                      <span className="px-2 py-1 text-sm font-bold  text-red-700">
                        {p.due.toFixed(2)}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-sm font-bold text-green-700">
                        No Due
                      </span>
                    )}</td>
                <td className="px-4 py-2 border-r border-gray-200">{p.guardian}</td>
                <td className="px-4 py-2 border-r border-gray-200">{p.gender}</td>
                <td className="px-4 py-2 border-r border-gray-200">{p.age}</td>
                <td className="px-4 py-2 border-r border-gray-200">{p.mobile}</td>
                <td className="px-4 py-2 border-r border-gray-200">{p.address} <br /> {p.state}</td>
                <td className="px-4 py-1.5 flex gap-1.5 max-w-15">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor=""
                    border="border-2"
                    textColor="text-yellow-700"
                    hover="hover:text-yellow-500"
                    title="Edit Patient"
                    onClick={() => navigate(`/patients/view/${p.uhid}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredPatients.length} entries
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

export default PatientListPage;
