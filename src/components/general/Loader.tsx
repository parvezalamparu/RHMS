const Loader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-200">
      <div className="backdrop-blur-md bg-white/30 p-8 rounded-2xl shadow-lg border border-white/30">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
          <h1 className="text-xl font-semibold text-white drop-shadow">
            Loading ...
          </h1>
          <p className="text-white text-sm opacity-80">Please wait while we prepare your workspace.</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
