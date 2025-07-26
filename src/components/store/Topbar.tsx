import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DigitalClock from "./general/DigitalClock";
import logo from "../../assets/logo.jpg";
import Button from "./general/Button";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";

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
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Rainbow Logo" className="h-12 w-40"/>
      </div>

      {/* Center: Clock */}
      <DigitalClock />

      {/* Right: Profile Picture Only */}
      <div className="relative" ref={dropdownRef}>
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
          <div className="absolute right-0 m-5 w-60 bg-white border-3 border-gray-600 rounded-lg shadow-md z-50 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://i.pravatar.cc/36"
                alt="Profile"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">Parvez</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <div className="flex space-x-5">
              <Button
                name="Profile"
                bgcolor="bg-white"
                hover="hover:bg-gray-300"
                border="border-3 border-[var(--dark-color)]"
                textColor="text-black"
                icon={<CgProfile className="text-xl" />}
              />

              <Button
                name="Logout"
                bgcolor="bg-red-500"
                border="border-3 border-[var(--dark-color)]"
                textColor="text-white"
                icon={<HiOutlineLogout />}
                hover="hover:bg-red-400"
                onClick={() => {
                navigate("/");}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
