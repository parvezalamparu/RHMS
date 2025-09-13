import LoginForm from "../../components/general/LoginForm";
import { useCustomTitle } from "../../hooks/useCustomTitle";
import { LiaWhatsapp } from "react-icons/lia";

const LoginPage = () => {
  useCustomTitle("Rainbow | Login");
  return (
    <div className="flex h-screen items-center justify-center bg-[url('/src/assets/login-bg.jpg')] bg-cover bg-center backdrop-blur-[2px] opacity-100 px-4">
      <div className="flex h-[500px] w-[800px] rounded-2xl overflow-hidden shadow-2xl  bg-white/20 border-6 border-[#035d67]">
        {/* Left image section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-r from-pink-500 via-yellow-500 to-red-500 p-6 pr-1 backdrop-blur-[4px]">
          {/* <img
            src="/src/assets/hospital.jpg"
            alt="Rainbow Hospital"
            className="w-full h-full object-cover rounded-lg"
          /> */}
          <h1 className="text-2xl font-bold text-[#035d67]">Rainbow Hospital</h1>
        </div>

        {/* Right form section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 rounded-md bg-white/10 backdrop-blur-[4px]">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-900 uppercase animate-pulse">
              Welcome
            </h2>
            <LoginForm />
            <div className="flex flex-col p-2 items-center mt-2 text-sm font-semibold bg-gray-200 rounded-2xl">
              <p className="text-[#035d67] mb-1">Need Support? Message Us on WhatsApp</p>
              <p className="flex items-center gap-2 text-violet-900">
                <LiaWhatsapp className="text-green-600 text-lg" />
                +91 8670047172 or +91 700196990
              </p>
              {/* <p className="flex items-center gap-2 text-violet-900 pb-4">
                <LiaWhatsapp className="text-green-800 text-lg" />
                +91 700196990
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
