import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Simulate auth success
      navigate("/dashboard");
      setTimeout(() => {
        toast.success("Login successful!");
      }, 200);
    } else {
      toast.error("Please enter both email and password");
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center border-2 border-blue-400 rounded-2xl px-3 py-2 bg-white">
        <FaEnvelope className="text-gray-500 text-lg mr-2" />
        <input
          type="email"
          className="w-full outline-none"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center border-2 border-blue-400 rounded-2xl px-3 py-2 bg-white mt-4">
        <FaLock className="text-gray-500 text-lg mr-2" />
        <input
          type={showPassword ? "text" : "password"}
          className="w-full outline-none"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="button" onClick={togglePassword}>
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm">
          <input type="radio" />
          <span>Remember me</span>
        </label>
        <a href="#" className="text-sm text-blue-900 hover:underline">
          Forgot Password?
        </a>
      </div>

      <div className="flex justify-center">
        {/* <button
          type="submit"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-10 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Log In
          </span>
        </button> */}

        <button
          type="submit"
          className="relative glow-border text-gray-800 uppercase bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none dark:focus:ring-green-800 font-medium rounded-lg text-xl px-8 py-2 text-center me-2 mb-2 cursor-pointer"
        >
          Log In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
