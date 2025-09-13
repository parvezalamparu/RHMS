import { useMemo, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../general/Button";
import { useNavigate } from "react-router-dom";
import { MdMale, MdFemale } from "react-icons/md";
import { RiStethoscopeFill } from "react-icons/ri";
import { FcViewDetails } from "react-icons/fc";
import { FaFilter } from "react-icons/fa";

interface OPD {
  id: string;
  token: string;
  billId: string;
  patient: string;
  gender: "Male" | "Female";
  age: number;
  uhid: string;
  mobile: string;
  appointment: string;
  visit: string;
  doctor: string;
  due: number;
}

type SortDirection = "asc" | "desc" | null;

const generateOPD = (count: number): OPD[] => {
  const names = [
    "Abdur Rahim",
    "Mahdi Aziz",
    "Parvez Alam",
    "Sk Siddika",
    "Retu",
  ];
  const visits = ["General Medicine", "Dermatology", "Urology", "ENT"];
  const doctors = [
    "Dr. Mahdi Aziz",
    "Dr. Saheb Rahaman",
    "Dr. Rohit Panja",
    "Dr. Retu",
  ];

  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length];
    const gender = Math.random() > 0.5 ? "Male" : "Female";
    const dd = String(10 + ((i * 3) % 20)).padStart(2, "0");
    const hh = String(5 + (i % 7)).padStart(2, "0");
    const mm = String(30 + (i % 25)).padStart(2, "0");
    const ampm = i % 2 === 0 ? "PM" : "AM";
    return {
      id: String(145251 + i),
      token: String(29 - (i % 30)),
      billId: String(185426 - i),
      patient: name,
      gender,
      age: 20 + (i % 50),
      uhid: String(424494 - i),
      mobile: String(9000000000 + Math.floor(Math.random() * 90000000)),
      appointment: `${dd}-09-2025 ${hh}:${mm} ${ampm}`,
      visit: visits[i % visits.length],
      doctor: doctors[i % doctors.length],
      due: Math.random() > 0.7 ? Number((Math.random() * 500).toFixed(2)) : 0,
    };
  });
};

const parseAppointmentToTimestamp = (s: string): number => {
  try {
    const parts = s.trim().split(" ");
    if (parts.length >= 2) {
      const datePart = parts[0];
      const timePart = parts[1];
      const ampm = parts[2] ?? "";
      const [ddS, mmS, yyyyS] = datePart.split("-");
      const [hhS, minS] = timePart.split(":");
      let hh = parseInt(hhS || "0", 10);
      const min = parseInt(minS || "0", 10);
      const dd = parseInt(ddS || "1", 10);
      const mm = parseInt(mmS || "1", 10);
      const yyyy = parseInt(yyyyS || "1970", 10);
      const ap = ampm.toUpperCase();
      if (ap === "PM" && hh < 12) hh += 12;
      if (ap === "AM" && hh === 12) hh = 0;
      return new Date(yyyy, mm - 1, dd, hh, min).getTime();
    }
  } catch (e) {
    // fallback
  }
  return 0;
};

const OPDListPage = () => {
  const [opdList] = useState<OPD[]>(generateOPD(80));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof OPD | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  // Filter by search term across many fields
  const filtered = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    if (!t) return opdList;
    return opdList.filter((o) =>
      [
        o.id,
        o.token,
        o.billId,
        o.patient,
        o.uhid,
        o.mobile,
        o.visit,
        o.doctor,
        o.appointment,
      ]
        .join(" ")
        .toLowerCase()
        .includes(t)
    );
  }, [opdList, searchTerm]);

  const handleFilter = (data: any) => {
    console.log("Filter Data:", data);
  };

  // Sorting
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const aRaw = a[sortKey];
      const bRaw = b[sortKey];

      // handle appointment (date string)
      if (sortKey === "appointment") {
        const aVal = parseAppointmentToTimestamp(String(aRaw));
        const bVal = parseAppointmentToTimestamp(String(bRaw));
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }

      // numeric fields
      if (typeof aRaw === "number" && typeof bRaw === "number") {
        return sortDir === "asc" ? aRaw - bRaw : bRaw - aRaw;
      }

      // if strings that look numeric (like id, billId) try numeric compare
      const aNum = Number(String(aRaw).replace(/\D/g, ""));
      const bNum = Number(String(bRaw).replace(/\D/g, ""));
      if (!isNaN(aNum) && !isNaN(bNum) && String(aRaw).length <= 12) {
        return sortDir === "asc" ? aNum - bNum : bNum - aNum;
      }

      // fallback string compare (case-insensitive)
      const aStr = String(aRaw ?? "").toLowerCase();
      const bStr = String(bRaw ?? "").toLowerCase();
      return sortDir === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / itemsPerPage));
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentPageItems = sorted.slice(startIdx, startIdx + itemsPerPage);

  // sort toggle handler
  const handleSort = (key: keyof OPD) => {
    if (sortKey === key) {
      // toggle
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(1);
  };

  const headerCell = (label: string, key?: keyof OPD) => {
    const isSortable = Boolean(key);
    const active = key && sortKey === key;
    const arrow = !isSortable
      ? null
      : active
      ? sortDir === "asc"
        ? "▲"
        : "▼"
      : "⇅";
    return (
      <th
        className={`px-4 py-2 border ${
          isSortable ? "cursor-pointer select-none" : ""
        }`}
        onClick={() => key && handleSort(key)}
        title={isSortable ? "Click to sort" : undefined}
      >
        <div className="flex items-center gap-2">
          <span>{label}</span>
          {isSortable && <span className="text-xs">{arrow}</span>}
        </div>
      </th>
    );
  };

  return (
    <div className="pl-2 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 flex-wrap gap-4 bg-[var(--base-color)] p-2">
        <h1 className="text-2xl font-bold uppercase text-[#035d67]">
          OPD List
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
            border="border-2 border-gray-800"
            textColor="text-black"
            name="NEW OPD REGISTER"
            hover="hover:bg-gray-100"
            onClick={() => navigate("/opd/register")}
          />
        </div>
      </div>
      {showFilter && <div className="bg-green-200 h-14 mb-2"></div>}

      {/* Controls */}
      <div className="flex justify-between mb-2 flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-sm text-gray-700">
            Show
          </label>
          <select
            id="pageSize"
            className="border border-gray-300 cursor-pointer rounded px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>

        <input
          type="search"
          className="border border-gray-300 px-3 py-2 rounded text-sm w-64 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          placeholder="Search by patient, uhid, mobile, token, bill..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow mb-6 border-collapse">
        <table className="min-w-full text-sm text-left table-auto">
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="bg-[var(--base-color)]">
              <tr>
                {headerCell("SN")}
                {headerCell("OPD ID", "id")}
                {headerCell("Token", "token")}
                {headerCell("Bill ID", "billId")}
                <th className="px-4 py-2 border w-60">Patient</th>
                {headerCell("UHID", "uhid")}
                {headerCell("Mobile", "mobile")}
                <th className="px-4 py-2 border w-52">Appointment Date</th>
                <th className="px-4 py-2 border w-48">Visit Details</th>
                {headerCell("Due", "due")}
                <th className="px-4 py-2 border w-20">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.length === 0 && (
                <tr>
                  <td colSpan={11} className="text-center py-6 text-gray-500">
                    No records found
                  </td>
                </tr>
              )}

              {currentPageItems.map((opd, idx) => (
                <tr
                  key={`${opd.id}-${opd.token}-${idx}`}
                  className={`border ${
                    opd.due > 0 ? "bg-red-50" : "bg-green-50"
                  } hover:opacity-95 transition`}
                >
                  <td className="px-2 py-2 border w-8 text-center">
                    {startIdx + idx + 1}
                  </td>
                  <td className="px-2 py-2 border w-24">{opd.id}</td>
                  <td className="px-2 py-2 border w-20">{opd.token}</td>
                  <td className="px-2 py-2 border w-28">{opd.billId}</td>

                  {/* Patient expanded */}
                  <td className="px-4 py-2 border w-56">
                    <div className="text-md font-semibold text-blue-900 truncate">
                      {opd.patient}
                    </div>
                    <div className="text-gray-800 flex items-center gap-1">
                      {opd.gender === "Male" ? (
                        <MdMale className="text-blue-500 text-sm" />
                      ) : (
                        <MdFemale className="text-pink-500 text-sm" />
                      )}
                      <span>
                        {opd.gender} • {opd.age}Y
                      </span>
                    </div>
                  </td>

                  <td className="px-2 py-2 border w-28">{opd.uhid}</td>
                  <td className="px-2 py-2 border w-32">{opd.mobile}</td>
                  <td className="px-2 py-2 border w-52">{opd.appointment}</td>

                  {/* Visit details expanded */}
                  <td className="px-4 py-2 border w-48">
                    <div className="text-sm truncate">{opd.visit}</div>
                    <div className="text-sm text-gray-800 flex gap-2"><RiStethoscopeFill className="text-blue-700 text-sm"/>{opd.doctor}</div>
                  </td>

                  <td className="px-2 py-2 border w-20 font-semibold text-center">
                    {opd.due > 0 ? (
                      <span className="px-2 py-1 text-sm font-bold  text-red-700">
                        {opd.due.toFixed(2)}
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-sm font-bold text-green-700">
                        No Due
                      </span>
                    )}
                  </td>

                  <td className="px-2 py-2 border w-20 text-center">
                    <Button
                      icon={<FcViewDetails className="text-lg" />}
                      bgcolor=""
                      border="border-2"
                      textColor="text-blue-900"
                      hover="hover:text-blue-700"
                      title="View Patient Details"
                      onClick={() => navigate(`/opd/view/${opd.id}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </table>

        {/* Footer / Pagination */}
        <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startIdx + 1} to {startIdx + currentPageItems.length} of{" "}
            {sorted.length} entries
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

export default OPDListPage;
