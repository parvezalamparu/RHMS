import { useLocation, Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaFileInvoice,
  FaListAlt,
  FaChartBar,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { BiSolidDashboard } from "react-icons/bi";
import { GiAutoRepair } from "react-icons/gi";
import { PiKeyReturnFill } from "react-icons/pi";
import { GoIssueClosed } from "react-icons/go";
import { useState } from "react";
import { FaWpforms } from "react-icons/fa";

const StoreSidebar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleSubMenu = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-50 group">
      <div
        className="bg-gray-800 h-full transition-all duration-300 ease-in-out group-hover:w-64 w-16 overflow-auto scrollbar-none "
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="p-4">
          <h1 className="text-white text-xl font-bold whitespace-nowrap hidden group-hover:block">
            Rainbow Store
          </h1>
          <div className="text-white text-2xl block group-hover:hidden text-center">
            ☰
          </div>
        </div>

        <ul className="mt-4 space-y-1">
          {/* Dashboard */}
          <li>
            <Link
              to="/store/dashboard"
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

          {/* Items (no navigation, just toggle) */}
          <li>
            <button
              onClick={() => toggleSubMenu("Items")}
              className={`flex w-full text-white items-center px-4 py-3 space-x-4 rounded-md ${
                openMenu === "Items"
                  ? "bg-gray-700 text-yellow-300"
                  : "hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <FaBoxOpen />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Items
              </span>
              <span className="hidden group-hover:inline ml-auto">
                {openMenu === "Items" ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </span>
            </button>

            {/* Submenu */}
            <ul
              className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out
              ${
                openMenu === "Items"
                  ? "max-h-[20rem] opacity-100 overflow-visible pointer-events-auto"
                  : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
              }`}
            >
              <li>
                <Link
                  to="/store/all-items"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/store/all-items")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  All Items
                </Link>
              </li>
              <li>
                <Link
                  to="/store/item-category"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/item-category")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Item-Category
                </Link>
              </li>
              <li>
                <Link
                  to="/store/item-unit"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/inventory/categories")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Item Unit/Sub-Unit
                </Link>
              </li>
              <li>
                <Link
                  to="/store/item-type"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/inventory/categories")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Item Type
                </Link>
              </li>

              <li>
                <Link
                  to="/store/item-company"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/inventory/categories")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Item Company
                </Link>
              </li>

              <li>
                <Link
                  to="/store/item-store"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/inventory/categories")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Item Store
                </Link>
              </li>

              <li>
                <Link
                  to="/store/store-department"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/inventory/categories")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Store Department
                </Link>
              </li>
            </ul>
          </li>

          {/* Other menu items */}

          <li>
            <Link
              to="/store/requisition"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/requisition")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <FaFileInvoice />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Requisition
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/store/purchase-list"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/purchase-list")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <BiSolidPurchaseTag />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Purchase List
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/store/purchase-orders"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/purchase-orders")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <FaListAlt />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Purchase Orders
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/store/item-issue"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/store/item-issue")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <GoIssueClosed />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Item Issue
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/store/return"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/return")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <PiKeyReturnFill />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Return Processing
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/store/repair-items"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/repair-items")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <GiAutoRepair />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Repair Items
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/store/vendor"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/vendor")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <IoPersonSharp />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Vendors
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
            <Link
              to="store/invoice"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/invoice")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl">
                <FaFileInvoice />
              </span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Invoices
              </span>
            </Link>
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

            {/* Reports Submenu */}
            <ul
              className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out 
                ${
                openMenu === "Reports"
                  ? "max-h-[24rem] opacity-100 overflow-visible pointer-events-auto"
                  : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
              }`}
            >
              {/* Normal Admin links */}
              <li>
                <Link
                  to="/store/general-stock-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/store/general-stock-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  General Stock Report
                </Link>
              </li>
              <li>
                <Link
                  to="/store/Department-stock-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/store/Department-stock-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Department Stock Report
                </Link>
              </li>
              <li>
                <Link
                  to="/store/requisition-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/store/requisition-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Requisition Report
                </Link>
              </li>
              <li>
                <Link
                  to="/store/purchase-order-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/store/purchase-order-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Purchase Order Report
                </Link>
              </li>
              <li>
                <Link
                  to="/store/purchase-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/store/purchase-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Purchase Report
                </Link>
              </li>
              <li>
                <Link
                  to="/store/item-issue-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/store/item-issue-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Item Issue Report
                </Link>
              </li>
              <li>
                <Link
                  to="/store/item-stock-report"
                  className={`block px-2 py-2 rounded-md text-sm ${
                    isActive("/store/item-stock-report")
                      ? "bg-gray-700 text-yellow-300"
                      : "text-white hover:bg-gray-700 hover:text-yellow-300"
                  }`}
                >
                  Item Stock Report
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StoreSidebar;
