import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { AiFillHome, AiFillCalendar } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { NavLink } from "react-router-dom";
import DropDownProfile from "./DropDownProfil";
import instance from "../config/axios";
import { PropagateLoader } from "react-spinners";

const theme = "dark";
const SideBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [showDropDownProfil, setDropShownProfil] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDropDownShown = () => {
    setDropShownProfil(!showDropDownProfil);
  };

  const handleSignOut = async () => {
    try {
      const res = await instance.get("/auth/signOut");
    } catch (err) {
      console.log(err);
    }
  };

  const closeDropDownProfile = () => setDropShownProfil(false);
  return (
    <div
      className={`${theme === "dark" ? "bg-black/5" : "bg-gray-300"}  ${theme === "dark" ? "text-white" : "text-black"}  min-w-[200px] max-w-[200px] sm:flex hidden  border-gray-800 rounded-xl bg-[#1B1B1B]  flex-col justify-between border py-12  `}
    >
      <div className="relative">
        <div
          className="flex relative items-center gap-4 hover:opacity-80 cursor-pointer justify-center"
          onClick={handleDropDownShown}
        >
          <img
            src="https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?pid=ImgDet&rs=1"
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <h
            className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-black"}  tracking-wide flex flex-col`}
          >
            {currentUser?.firstName} <span>{currentUser?.lastName}</span>
          </h>
        </div>
        {showDropDownProfil && (
          <DropDownProfile
            handleSignOut={handleSignOut}
            handleDropDownShown={handleDropDownShown}
            showDropDownProfil={showDropDownProfil}
            closeDropDownProfile={closeDropDownProfile}
          />
        )}
      </div>
      <div className="flex- flex-col space-y-2 ">
        <NavLink
          to=""
          className="flex hover:opacity-75  gap-3 items-center px-4  p-2"
        >
          <AiFillHome className=" w-5 h-5" />
          <h className=" text-xm font-[400] tracking-wide">All Tasks</h>
        </NavLink>
        <NavLink
          to="/importants"
          className="flex hover:opacity-75  gap-3 items-center px-4  p-2"
        >
          <BsListTask className=" w-5 h-5" />
          <h className=" text-xm font-[400] tracking-wide">Importants</h>
        </NavLink>
        <NavLink
          to="/completed"
          className="flex hover:opacity-75  gap-3 items-center px-4  p-2"
        >
          <MdDone className=" w-5 h-5" />
          <h className=" text-xm font-[400] tracking-wide">Completed</h>
        </NavLink>
        <NavLink
          to="/do-it-now"
          className="flex hover:opacity-75  gap-3 items-center  px-4  p-2"
        >
          <AiFillCalendar className=" w-5 h-5" />
          <h className=" text-xm font-[400] tracking-wide">Do It Now</h>
        </NavLink>
      </div>
      <button
        onClick={handleSignOut}
        className="flex items-center p-2 hover:opacity-75 gap-2 justify-center"
      >
        <GoSignOut className=" w-5 h-5" />
        <h className=" text-xm font-semibold tracking-wide">
          {!loading ? (
            "Sign Out"
          ) : (
            <div className="p-3">
              <PropagateLoader color="white" size={5} />
            </div>
          )}
        </h>
      </button>
    </div>
  );
};

export default SideBar;
