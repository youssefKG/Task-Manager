import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import BackDrops from "../components/BackDrop";

const Layout = () => {
  return (
    <div className=" bg-[#111111] flex relative overflow-hidden h-screen gap-3 md:p-6">
      <SideBar />
      <Outlet />
      <BackDrops />
    </div>
  );
};

export default Layout;
