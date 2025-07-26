import Topbar from "../components/store/Topbar";
import Sidebar from "./Sidebar";
import type { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Topbar />
      <Sidebar />
      <main className="mt-16 pl-12 w-full h-[calc(100vh-4rem)] bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </>
  );
};

export default MainLayout;
