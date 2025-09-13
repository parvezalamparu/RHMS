import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../general/Button";
import { FaRegEdit } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { FaFilter } from "react-icons/fa";

interface Appointment {
  id: number;
  bookingTime: string;
  bookingBy: string;
  patientName: string;
  patientType: "New" | "Old";
  uhid?: string;
  age?: number;
  mobile: string;
  doctor: string;
  appointmentDate: string;
  status: "Registered" | "Pending";
}

// mock data
const generateAppointments = (count: number): Appointment[] => {
  const names = [
    "Sk Abul Kalam",
    "Chengiz Khan",
    "Selima Begam",
    "Pakija Begum",
    "Prabir Maity",
    "Moniara Khatun",
    "Rehana Begum",
    "Sk Moidul",
  ];
  const bookingBy = [
    "Mrs. SUNAM HALDAR",
    "Mrs. ROJINA KHATUN",
    "Mrs. BIDISHA MANNA",
    "Mr. AHADUL HAQUE MOLLAH",
  ];
  const doctors = ["Dr. Debasis Giri", "Dr. R. Sen"];
  const patientTypes: ("New" | "Old")[] = ["New", "Old"];

  return Array.from({ length: count }, (_, i) => ({
    id: 199000 + i,
    bookingTime: `28-08-2025 ${10 + (i % 12)}:${10 + i} AM`,
    bookingBy: bookingBy[i % bookingBy.length],
    patientName: names[i % names.length],
    patientType: patientTypes[i % patientTypes.length],
    uhid: i % 2 === 0 ? (400000 + i).toString() : undefined,
    age: i % 2 === 0 ? 30 + (i % 20) : undefined,
    mobile: (7000000000 + Math.floor(Math.random() * 99999999)).toString(),
    doctor: doctors[i % doctors.length],
    appointmentDate: `11-09-2025 09:30 AM`,
    status: i % 2 === 0 ? "Registered" : "Pending",
  }));
};

const AppointmentListPage = () => {
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);

  const [appointments] = useState<Appointment[]>(generateAppointments(40));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Appointment;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof Appointment) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key]?.toString().toLowerCase() ?? "";
    const bVal = b[key]?.toString().toLowerCase() ?? "";
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleFilter = (data: any) => {
    console.log("Filter Data:", data);
  };

  const filteredAppointments = sortedAppointments.filter((a) => {
    const term = searchTerm.toLowerCase();
    return (
      a.patientName.toLowerCase().includes(term) ||
      a.bookingBy.toLowerCase().includes(term) ||
      a.doctor.toLowerCase().includes(term) ||
      a.mobile.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentAppointments = filteredAppointments.slice(
    startIdx,
    startIdx + itemsPerPage
  );
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentAppointments.length;

  return (
    <div className="pl-2 bg-gray-50">
      <div className="flex justify-between items-center mb-2 bg-[var(--base-color)] px-4 max-h-14">
        <h1 className="text-2xl font-bold mb-6 text-[#035d67] uppercase pt-5">
          Appointments List
        </h1>
        <div className="flex gap-2">
          <Button
            bgcolor="bg-white"
            border="border-2 border-gray-800"
            textColor="text-black"
            icon={<FaFilter  />}
            title="Filter Data"
            hover="hover:bg-gray-100"
            onClick={() => setShowFilter((prev) => !prev)}

          />
          <Button
            bgcolor="bg-white"
            border="border-2"
            textColor="text-black"
            hover="hover:text-gray-600"
            name="New Enquiry"
            onClick={() => navigate("/opd/add-enquiry")}
          />
          <Button
            bgcolor="bg-white"
            border="border-2"
            textColor="text-black"
            hover="hover:text-gray-700"
            name="New OPD Register"
            onClick={() => navigate("/opd/register")}
          />
        </div>
      </div>
      {showFilter && <div className="bg-yellow-200 h-14 mb-2"></div>}

      {/* Filter and Search */}
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

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow mb-8">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-[var(--base-color)] text-gray-700 border-b border-gray-300">
            <tr>
              <th className="px-4 py-2 border-r border-gray-300">SN</th>
              {[
                "id",
                "bookingTime",
                "bookingBy",
                "patientName",
                "doctor",
                "appointmentDate",
                "action",
              ].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 border-r border-gray-300 cursor-pointer select-none"
                  onClick={() => handleSort(key as keyof Appointment)}
                >
                  {key === "id"
                    ? "Enq No"
                    : key === "bookingTime"
                    ? "Booking Time"
                    : key === "bookingBy"
                    ? "Booking By"
                    : key === "patientName"
                    ? "Patient"
                    : key === "appointmentDate"
                    ? "App. Date & Time"
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
              <th className="px-4 py-2">Reschedule</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.map((a, index) => (
              <tr
                key={a.id}
                className={`border-t border-gray-300 ${
                  a.status === "Registered" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <td className="px-4 py-2 border-r border-gray-200">
                  {startIdx + index + 1}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">{a.id}</td>
                <td className="px-4 py-2 border-r border-gray-200">
                  {a.bookingTime}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">
                  {a.bookingBy}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">
                  {a.patientName}{" "}
                  <span
                    className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${
                      a.patientType === "New"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white "
                        : "bg-gradient-to-r from-green-500 to-yellow-500 text-white"
                    }`}
                  >
                    {a.patientType} Patient
                  </span>
                  <br />
                  {a.uhid && (
                    <span className="text-sm text-gray-800 flex gap-1 pt-1">
                      <VscDebugBreakpointLog /> UHID: {a.uhid},{" "}
                      <CiCalendarDate /> Age: {a.age}, <FaPhoneAlt /> {a.mobile}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">
                  {a.doctor}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">
                  {a.appointmentDate}
                </td>
                <td className="px-4 py-2 border-r border-gray-200 font-bold text-red-600">
                  {a.status === "Pending" ? (
                    <Button
                      icon={<FaRegEdit className="text-lg" />}
                      bgcolor="bg-white"
                      name="Register"
                      border="border-2"
                      textColor="text-yellow-700"
                      hover="hover:text-yellow-500"
                      onClick={
                        () => navigate(`/opd/register/${a.id}`, { state: a }) 
                      }
                    />
                  ) : (
                    <span className="text-green-700 font-bold">Registered</span>
                  )}
                </td>
                <td className="px-4 py-1.5 flex gap-1.5 max-w-15">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor="bg-white"
                    name="Reschedule"
                    border="border-2"
                    textColor="text-blue-700"
                    hover="hover:text-blue-500"
                    onClick={() => navigate(`/appointments/view/${a.id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Info */}
        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of{" "}
            {filteredAppointments.length} entries
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

export default AppointmentListPage;
