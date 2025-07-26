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
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleSubMenu = (menuName: string) => {
    setOpenMenu(prev => (prev === menuName ? null : menuName));
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-50 group">
      <div className="bg-gray-800 h-full transition-all duration-300 ease-in-out group-hover:w-64 w-16 overflow-hidden">
        <div className="p-4">
          <h1 className="text-white text-xl font-bold whitespace-nowrap hidden group-hover:block">
            Rainbow Inventory
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
              <span className="text-xl"><BiSolidDashboard /></span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Dashboard
              </span>
            </Link>
          </li>

          {/* Items (no navigation, just toggle) */}
          <li>
            <button
              onClick={() => toggleSubMenu("Items")}
              className={`flex w-full items-center px-4 py-3 space-x-4 rounded-md${
                openMenu === "Items"
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl"><FaBoxOpen /></span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Items
              </span>
              <span className="hidden group-hover:inline">
                {openMenu === "Items" ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </button>

            {/* Submenu */}
              <ul className={`ml-10 mt-1 space-y-1 hidden group-hover:block transition-all duration-500 ease-in-out
              ${openMenu === "Items" ? 'max-h-[20rem] opacity-100':'max-h-0 opacity-0'}`}>
                <li>
                  <Link
                    to="/store/inventory"
                    className={`block px-2 py-2 rounded-md text-sm ${
                      isActive("/inventory")
                        ? "bg-gray-700 text-yellow-300"
                        : "text-white hover:bg-gray-700 hover:text-yellow-300"
                    }`}
                  >
                    All Items
                  </Link>
                </li>
                <li>
                  <Link
                    to="/store/vendor"
                    className={`block px-2 py-2 rounded-md text-sm ${
                      isActive("/vendor")
                        ? "bg-gray-700 text-yellow-300"
                        : "text-white hover:bg-gray-700 hover:text-yellow-300"
                    }`}
                  >
                    Vendors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inventory/categories"
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
                    to="/inventory/categories"
                    className={`block px-2 py-2 rounded-md text-sm ${
                      isActive("/inventory/categories")
                        ? "bg-gray-700 text-yellow-300"
                        : "text-white hover:bg-gray-700 hover:text-yellow-300"
                    }`}
                  >
                    Item Type
                  </Link>
                </li>
              </ul>
          </li>

          {/* Other menu items */}
          <li>
            <Link
              to="/invoices"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/invoices")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl"><FaFileInvoice /></span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Invoices
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/sotre/requisition"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/requisition")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl"><FaFileInvoice /></span>
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
              <span className="text-xl"><BiSolidPurchaseTag /></span>
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
              <span className="text-xl"><FaListAlt /></span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Purchase Orders
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/store/reports"
              className={`flex items-center px-4 py-3 space-x-4 rounded-md transition-colors duration-200 ${
                isActive("/reports")
                  ? "bg-gray-700 text-yellow-300"
                  : "text-white hover:bg-gray-700 hover:text-yellow-300"
              }`}
            >
              <span className="text-xl"><FaChartBar /></span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Reports
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
              <span className="text-xl"><IoPersonSharp /></span>
              <span className="text-sm font-medium hidden group-hover:inline">
                Vendor
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
