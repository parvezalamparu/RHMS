import { useLocation, Link } from "react-router-dom";
import { FaChartBar, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdWifiProtectedSetup } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { FaWarehouse } from "react-icons/fa";
import { useState } from "react";
import { GiHumanPyramid } from "react-icons/gi";
import { MdOutlineMan } from "react-icons/md";
import { TbEmergencyBed } from "react-icons/tb";
import { RiHotelBedLine } from "react-icons/ri";
import { FaBedPulse } from "react-icons/fa6";
import { FaWpforms } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { MdReportGmailerrorred } from "react-icons/md";
import { LuUtilityPole } from "react-icons/lu";
import { MdFileCopy } from "react-icons/md";
import { FaStethoscope } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";

const MainSidebar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const toggleSubSubMenu = (subMenuName: string) => {
    setOpenSubMenu((prev) => (prev === subMenuName ? null : subMenuName));
    // setOpenSubMenu(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-50 group">
      <div
        className="bg-gray-800 h-full transition-all duration-300 ease-in-out group-hover:w-64 w-16 overflow-scroll"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="p-4">
          <h1 className="text-white text-xl font-bold whitespace-nowrap hidden group-hover:block">
            Rainbow HIMS
          </h1>
          <div className="text-white text-2xl block group-hover:hidden text-center">
            ☰
          </div>
        </div>

        <ul className="mt-4 space-y-1">
          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/dashboard")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <BiSolidDashboard />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Dashboard
              </span>
            </Link>
          </li>

          {/*Admin*/}
          <li>
            <button
              onClick={() => toggleSubMenu("Admin")}
              className={`flex w-full text-white items-center px-4 py-3 space-x-4 rounded-md ${
                openMenu === "Admin"
                  ? "bg-gray-700 text-yellow-300"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <RiAdminFill />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Admin
              </span>
              <span className="hidden group-hover:inline ml-auto">
                {openMenu === "Admin" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </button>

            {/* Admin Submenu */}
            <ul
              className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out
              ${
                openMenu === "Admin"
                  ? "max-h-[24rem] opacity-100 overflow-visible pointer-events-auto"
                  : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
              }`}
            >
              {/* Normal Admin links */}
              <li>
                <Link
                  to="/admin/doctors"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/doctors")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Doctors
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/departments"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/admin/deparments")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Departments
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/notices"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/admin/notices")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Notices
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/marketed-by"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/admin/marketed-by")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Marketed By
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/admin/users")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Users
                </Link>
              </li>

              {/* Permission nested submenu */}
              <li>
                <button
                  onClick={() => toggleSubSubMenu("Role & Permissions")}
                  className="flex items-center justify-between w-full px-2 py-2 text-sm text-white rounded-md hover:bg-gray-700"
                >
                  <span>Role & Permissions</span>
                  {openSubMenu === "Role & Permissions" ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </button>

                {/* Nested submenu */}
                <ul
                  className={`ml-4 mt-1 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
                    openSubMenu === "Role & Permissions"
                      ? "max-h-40"
                      : "max-h-0"
                  }`}
                >
                  <li>
                    <Link
                      to="/admin/roles"
                      className={`block px-2 py-2 rounded-md text-sm ${
                        isActive("/admin/roles")
                          ? "bg-gray-700 text-yellow-300"
                          : "text-white hover:bg-gray-700 hover:text-yellow-300"
                      }`}
                    >
                      Roles
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/permissions"
                      className={`block px-2 py-2 rounded-md text-sm ${
                        isActive("/admin/permisssions")
                          ? "bg-gray-700 text-yellow-300"
                          : "text-white hover:bg-gray-700 hover:text-yellow-300"
                      }`}
                    >
                      Permissions
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          {/* Finance and Accounts */}
          <li>
            <Link
              to="/finance-accounts"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/finance-accounts")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <MdFileCopy />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Finance & Accounts
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/hrms"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/hrms")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <GiHumanPyramid />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                HRMS
              </span>
            </Link>
          </li>

          {/* Other menu items */}

          <li>
            <Link
              to="/doctor-and-provider"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("//doctor-and-provider")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <FaStethoscope />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Doctor & Provider
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/patients"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/patients")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <MdOutlineMan />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Patients
              </span>
            </Link>
          </li>

          <li>
            <button
              onClick={() => toggleSubMenu("OPD")}
              className={`flex w-full text-white items-center px-4 py-3 space-x-4 rounded-md ${
                openMenu === "OPD"
                  ? "bg-gray-700 text-yellow-300"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <MdLocalHospital />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                OPD
              </span>
              <span className="hidden group-hover:inline ml-auto">
                {openMenu === "OPD" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </button>

            <ul
              className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out
              ${
                openMenu === "OPD"
                  ? "max-h-[24rem] opacity-100 overflow-visible pointer-events-auto"
                  : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
              }`}
            >
              <li>
                <Link
                  to="/opd/appointments"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/opd")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  OPD
                </Link>
              </li>
              <li>
                <Link
                  to="/opd/appointment"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/opd/appointment")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Appointment
                </Link>
              </li>

              <li>
                <Link
                  to="/opd/schedule-setup"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/opd/schedule-setup")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Schedule Setup
                </Link>
              </li>

              <li>
                <Link
                  to="/opd/doctor-schedule"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/opd/doctor-schedule")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Doctor Schedule
                </Link>
              </li>
            </ul>
          </li>

          {/*ipd daycare */}

          <li>
            <button
              onClick={() => toggleSubMenu("IPD")}
              className={`flex w-full text-white items-center px-4 py-3 space-x-4 rounded-md ${
                openMenu === "IPD"
                  ? "bg-gray-700 text-yellow-300"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <RiAdminFill />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                IPD/Day Care
              </span>
              <span className="hidden group-hover:inline ml-auto">
                {openMenu === "IPD" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </button>

            {/* ipd Submenu */}
            <ul
              className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out
              ${
                openMenu === "IPD"
                  ? "max-h-[24rem] opacity-100 overflow-visible pointer-events-auto"
                  : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
              }`}
            >
              {/* Normal ipd links */}
              <li>
                <Link
                  to="/ipd/admission-registration"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/admission-registration")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Admission Registration
                </Link>
              </li>
              <li>
                <Link
                  to="/ipd/nursery"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/nursery")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Nursery
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/emergency"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/emergency")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <TbEmergencyBed />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Emergency
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/dialysis"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/dialysis")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <FaBedPulse />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Dialysis
              </span>
            </Link>
          </li>

          {/*Rate Query*/}
          <li>
            <button
              onClick={() => toggleSubMenu("Rate Query")}
              className={`flex w-full text-white items-center px-4 py-3 space-x-4 rounded-md ${
                openMenu === "Rate Query"
                  ? "bg-gray-700 text-yellow-300"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <BsCurrencyRupee />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Rate Query
              </span>
              <span className="hidden group-hover:inline ml-auto">
                {openMenu === "Rate Query" ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </span>
            </button>

            {/* Rate Query Submenu */}
            <ul
              className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out
              ${
                openMenu === "Rate Query"
                  ? "max-h-[24rem] opacity-100 overflow-visible pointer-events-auto"
                  : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
              }`}
            >
              {/* Normal Rate Queary links */}
              <li>
                <Link
                  to="/rate-query/opd-rate"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/rate-query/opd-rate")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  OPD Rate
                </Link>
              </li>

              <li>
                <Link
                  to="/rate-query/ipd-rate"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/rate-query/ipd-rate")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  IPD Rate
                </Link>
              </li>
              <li>
                <Link
                  to="/rate-query/inv-rate"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("//rate-query/inv-rate")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Investigation Rate
                </Link>
              </li>
            </ul>
          </li>

          {/* store */}
          <li>
            <Link
              to="/store/dashboard"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/store")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <FaWarehouse />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Store
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/all-forms"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/all-forms")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <FaWpforms />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                All Forms
              </span>
            </Link>
          </li>

          <li>
            <button
              onClick={() => toggleSubMenu("Investigation")}
              className={`flex w-full text-white items-center px-4 py-3 space-x-4 rounded-md ${
                openMenu === "Investigation"
                  ? "bg-gray-700 text-yellow-300"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <MdReportGmailerrorred />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Investigation
              </span>
              <span className="hidden group-hover:inline ml-auto">
                {openMenu === "Investigation" ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </span>
            </button>

            <ul
              className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out
              ${
                openMenu === "Investigation"
                  ? "max-h-[24rem] opacity-100 overflow-visible pointer-events-auto"
                  : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
              }`}
            >
              <li>
                <Link
                  to="/investigation/bill"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/investigation/bill")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Investigation Bill
                </Link>
              </li>
              <li>
                <Link
                  to="/investigation/pathology"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/investigation/pathology")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Pathology
                </Link>
              </li>
              <li>
                <Link
                  to="/investigation/non-pathology"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/investigation/non-pathology")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Non-Pathology
                </Link>
              </li>
              <li>
                <Link
                  to="/investigation/radiology"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/investigation/radiology")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Radiology
                </Link>
              </li>
              <li>
                <Link
                  to="/investigation/rate-queary"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/investigation/rate-queary")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Rate Queary
                </Link>
              </li>
              <li>
                <Link
                  to="/investigation/report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/investigation/report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Ready Report
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <button
              onClick={() => toggleSubMenu("Setup")}
              className={`flex w-full text-white items-center px-4 py-3 space-x-4 rounded-md ${
                openMenu === "Setup"
                  ? "bg-gray-700 text-yellow-300"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <MdWifiProtectedSetup />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Setup
              </span>
              <span className="hidden group-hover:inline ml-auto">
                {openMenu === "Setup" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </button>

            <ul
              className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out
              ${
                openMenu === "Setup"
                  ? "max-h-[24rem] opacity-100 overflow-visible pointer-events-auto"
                  : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
              }`}
            >
              <li>
                <Link
                  to="/setup/general-settings"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/setup/general-settings")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  General Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/setup/charges"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/setup/charges")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Charges
                </Link>
              </li>
              <li>
                <Link
                  to="/setup/sample-for-a-test"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/setup/sample-for-a-test")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Sample for a Test
                </Link>
              </li>
              <li>
                <Link
                  to="/setup/tpa-management"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/setup/tpa-management")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  TPA Management
                </Link>
              </li>
              <li>
                <Link
                  to="/setup/vial"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/setup/vial")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Vial
                </Link>
              </li>
              <li>
                <Link
                  to="/setup/bed"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/setup/bed")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Bed
                </Link>
              </li>
              <li>
                <Link
                  to="/setup/diagonoses"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/setup/diagonoses")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Diagonoses
                </Link>
              </li>
              <li>
                <Link
                  to="/setup/package"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/setup/package")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Package
                </Link>
              </li>
              <li>
                <Link
                  to="/setup/header"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/setup/header")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  All Header
                </Link>
              </li>
            </ul>
          </li>

          {/*Utility*/}
          <li>
            <button
              onClick={() => toggleSubMenu("Utility")}
              className={`flex w-full text-white items-center px-4 py-3 space-x-4 rounded-md ${
                openMenu === "Utility"
                  ? "bg-gray-700 text-yellow-300"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <LuUtilityPole />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Utility
              </span>
              <span className="hidden group-hover:inline ml-auto">
                {openMenu === "Utility" ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </span>
            </button>

            {/* Utility Submenu */}
            <ul
              className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out
              ${
                openMenu === "Utility"
                  ? "max-h-[24rem] opacity-100 overflow-visible pointer-events-auto"
                  : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
              }`}
            >
              {/* Normal Utility links */}
              <li>
                <Link
                  to="/utility/change-password"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/utility/change-password")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Change Password
                </Link>
              </li>

              <li>
                <Link
                  to="/utility/sms-scheduler"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/utility/sms-scheduler")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  SMS Scheduler
                </Link>
              </li>
              <li>
                <Link
                  to="/utility/telephone-directory"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/utility/telephone-directory")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Telephone Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/utility/landline"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/utility/landline")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Landline
                </Link>
              </li>
              <li>
                <Link
                  to="/utility/reception-notes"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/utility/reception-notes")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Reception Notes
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <button
              onClick={() => toggleSubMenu("Reports")}
              className={`flex w-full text-white items-center px-4 py-3 space-x-4 rounded-md ${
                openMenu === "Reports"
                  ? "bg-gray-700 text-yellow-300"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <FaChartBar />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Reports
              </span>
              <span className="hidden group-hover:inline ml-auto">
                {openMenu === "Reports" ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </span>
            </button>

            <ul
              className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out
              ${
                openMenu === "Reports"
                  ? "max-h-[30rem] opacity-100 overflow-visible pointer-events-auto"
                  : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
              }`}
            >
              <li>
                <Link
                  to="/reports/collection"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/collection")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/doctor-payout"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/doctor-payout")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Doctor Payout
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/collection"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/collection")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/billing-details"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/billing-details")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Billing Details
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/opd-patient-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/opd-patient-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  OPD Patient Report
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/emg-patient-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/emg-patient-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Emg Patient Report
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/ipd-daycare-patient-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/ipd-daycare-patient-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  IPD/Daycare Patient Report
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/dialysis-patient-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/dialysis-patient-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Dialysis Patient Report
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/billing-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/billing-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Billing Report
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/birth-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/birth-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Birth Report
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/discharge-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/discharge-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Discharge Report
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/edite-bill-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/reports/edite-bill-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Edited Bill Report
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/bed"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/bed")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <RiHotelBedLine />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Bed
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainSidebar;
