import LoginForm from "../../components/general/LoginForm";
import { useCustomTitle } from "../../hooks/useCustomTitle";

const LoginPage = () => {
  useCustomTitle('Rainbow | Login');
  return (
    <div className="flex h-screen items-center justify-center bg-[url('/src/assets/login-bg.jpg')] bg-cover bg-center backdrop-blur-[2px] opacity-100 px-4">
      <div className="flex h-[500px] w-[800px] rounded-2xl overflow-hidden shadow-2xl  bg-white/20 border-6 border-[#035d67]">
        
        {/* Left branding section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-[#035d67]/10 p-10 backdrop-blur-[4px]">
          <h1 className="text-white text-4xl font-bold">Rainbow Hospital</h1>
        </div>

        {/* Right form section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 rounded-md bg-white/10 backdrop-blur-[4px]">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-900 uppercase animate-pulse">
              Welcome
            </h2>
            <LoginForm />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;
