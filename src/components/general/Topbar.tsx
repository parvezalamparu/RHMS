import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DigitalClock from "../store/general/DigitalClock";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { User, LogOut, KeyRound } from "lucide-react";
import Badge from "./Badge";
import { FaRegBell } from "react-icons/fa";

const Topbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

      {/* Right: Profile Picture Only */}
      <div className="relative flex items-center gap-6" ref={dropdownRef}>
        <div className="relative flex justify-center items-center bg-gray-300 rounded h-[2rem] w-[2rem] cursor-pointer">
          <FaRegBell className="text-xl text-purple-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </div>

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
  );
};

export default Topbar;
