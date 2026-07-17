import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div
      className=" flex
  bg-gray-100
  dark:bg-gray-900
  min-h-screen
  text-black
  dark:text-white"
    >
      <Sidebar />
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
