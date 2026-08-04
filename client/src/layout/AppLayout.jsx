import { Outlet } from "react-router-dom";
import TopNavbar from "./Navbar"; 

const AppLayout = () => {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-[#12141c] h-screen text-black dark:text-white overflow-hidden">
      <TopNavbar />
      <main className="flex-1 w-full flex overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
