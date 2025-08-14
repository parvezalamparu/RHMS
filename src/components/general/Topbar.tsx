import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DigitalClock from "../store/general/DigitalClock";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { User, LogOut, KeyRound } from "lucide-react";
import Badge from "./Badge";
import { FaRegBell } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PatientSearch from "./PatientSearch";

const Topbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-16 bg-gray-800 text-white shadow z-50 flex justify-between items-center pl-16 pr-6">
        {/* Left: Logo */}
        <Link to="/dashboard">
          <div
            className="flex items-center space-x-3"
            style={{ clipPath: "polygon(0 0, 100% 0%, 93% 100%, 0 100%)" }}
          >
            <img src={logo} alt="Rainbow Logo" className="w-35" />
          </div>
        </Link>

        {/* Center: Clock */}
        <DigitalClock />

        {/* Right: Icons & Profile */}
        <div className="relative flex items-center gap-6" ref={dropdownRef}>
          {/* Search Button */}
          <div
            className="relative flex justify-center items-center bg-gray-300 rounded h-[2rem] w-[2rem] cursor-pointer"
            onClick={() => {
              setIsSearchOpen((prev) => !prev);
              setIsNotificationOpen(false);
            }}
          >
            <IoSearchSharp className="text-xl text-purple-600" />
          </div>

          {/* Notification Button */}
          <div
            className="relative flex justify-center items-center bg-gray-300 rounded h-[2rem] w-[2rem] cursor-pointer"
            onClick={() => {
              setIsNotificationOpen((prev) => !prev);
              setIsSearchOpen(false);
            }}
          >
            <FaRegBell className="text-xl text-purple-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </div>

          {/* Profile Dropdown */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none cursor-pointer"
          >
            <img
              src="https://i.pravatar.cc/36"
              alt="Profile"
              className="w-9 h-9 rounded-full border"
            />
          </button>

          {/* Profile Dropdown Panel */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full w-85 mt-3 h-90 bg-[#90a5d7fd] border-3 border-gray-300 rounded-2xl z-50 p-7">
              <div className="flex justify-center space-x-3 mb-4">
                <img
                  src="https://i.pravatar.cc/36"
                  alt="Profile"
                  className="w-30 h-30 rounded-full border"
                />
              </div>
              <div className="flex justify-center space-x-3">
                <h1 className="text-white text-xl">Parvez Alam</h1>
              </div>
              <div className="flex justify-center space-x-3 mb-4">
                <p className="mt-1">
                  <Badge
                    label="Admin"
                    color="bg-green-100"
                    text="text-[#035d67]"
                  />
                </p>
              </div>

              <div className="flex justify-center items-center gap-2">
                <button
                  className="h-10 flex items-center justify-center gap-2 flex-1 text-sm tracking-tight text-[#035d67] border border-gray-300 rounded-full py-2 bg-gray-200 hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => navigate("")}
                >
                  <User size={16} />
                  View Profile
                </button>
                <button
                  className="h-10 flex items-center justify-center gap-2 flex-1 text-sm tracking-tight text-[#035d67] border border-gray-300 rounded-full py-2 bg-gray-200 hover:bg-gray-100 transition duration-100 cursor-pointer"
                  onClick={() => navigate("")}
                >
                  <KeyRound size={16} />
                  Change Password
                </button>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  className="h-10 flex items-center justify-center gap-2 flex-1 text-sm tracking-tight text-[#035d67] border border-gray-300 rounded-full py-2 px-4 bg-gray-200 hover:bg-gray-100 transition duration-100 max-w-50 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
  {isSearchOpen && (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="absolute top-18 left-1/2 transform -translate-x-1/2  bg-gray-100 shadow-lg rounded-lg p-4 w-[50rem] z-[9999] border-4 border-gray-300"
    >
      <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-[#035d67]">
                Search Patient
              </h2>
              <div className="bg-gray-200 flex justify-center items-center rounded">
                <button
                  className="text-gray-500 hover:text-gray-800 cursor-pointer"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
      
      <PatientSearch />
    </motion.div>
  )}
</AnimatePresence>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isNotificationOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-20 bg-gray-100 shadow-lg rounded-lg p-4 w-80 z-[9999] border-4 border-gray-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-[#035d67]">
                Notice
              </h2>
              <div className="bg-gray-200 flex justify-center items-center rounded">
                <button
                  className="text-gray-500 hover:text-gray-800 cursor-pointer"
                  onClick={() => setIsNotificationOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li>🔔 Good Morning</li>
              <li>🔔 Good Morning</li>
            </ul>
            {/* <div className="flex justify-end mt-5">
              <Button
                onClick={() => setIsNotificationOpen(false)}
                bgcolor="bg-red-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-red-300"
                name="Close"
                icon={<IoIosCloseCircleOutline />}
              />
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Topbar;
