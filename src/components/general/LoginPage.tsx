import LoginForm from "../general/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex h-[700px] items-center justify-center bg-[url('/src/assets/login-bg.jpg')] bg-cover bg-center backdrop-blur-[2px] opacity-100 px-4">
      <div className="flex h-[500px] w-[800px] rounded-2xl overflow-hidden shadow-2xl bg-white border-6 border-[#035d67]">
        
        {/* Left branding section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-[#035d67] p-10">
          <h1 className="text-white text-4xl font-bold">Rainbow Hospital</h1>
        </div>

        {/* Right form section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 rounded-md">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">
              Welcome!
            </h2>
            <LoginForm />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;
