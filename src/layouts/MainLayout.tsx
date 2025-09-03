import Topbar from "../components/general/Topbar";
import MainSidebar from "./MainSidebar"; 
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex">
      <MainSidebar />
      <div  className="mt-16 pl-12 w-full h-[calc(100vh-4rem)] bg-gray-100 overflow-y-auto">
        <Topbar />
        <main className="px-4 pt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
