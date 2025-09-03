
import Topbar from "../components/general/Topbar";
import StoreSidebar from "./StoreSidebar"; 
import { Outlet } from "react-router-dom";

const StoreLayout = () => {
  return (
    <div className="flex">
      <StoreSidebar />
      <div className="mt-16 pl-12 w-full max-h-[calc(100vh-4rem)] bg-gray-100 overflow-y-auto">
        <Topbar />
        <main className="px-4 pt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StoreLayout;
