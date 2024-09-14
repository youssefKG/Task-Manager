import { useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { MdDarkMode } from "react-icons/md";

const DropDownProfile = ({
  handleDropDownShown,
  showDropDownProfil,
  closeDropDownProfile,
  handleSignOut,
}) => {
  const ref = useRef();

  const { theme, toggleTheme } = useContext(GlobalContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const handleRef = (e) => {
      if (
        ref.current &&
        showDropDownProfil &&
        !ref.current.contains(e.target)
      ) {
        closeDropDownProfile();
      }
      console.log("clicked");
    };
    document.addEventListener("mousedown", handleRef);
    return () => {
      document.removeEventListener("mousedown", handleRef);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`bg-white p-4 ${theme === " dark" ? "text-white" : "text-black"} absolute hidden flex-col sm:flex rounded-xl left-8 w-[220px] hover:opacity-95 transition  z-40  gap-2    min-w-2xl dorpDownProfil`}
    >
      <div className="flex gap-2 items-center">
        <img
          src="https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?pid=ImgDet&rs=1"
          alt=""
          className="w-6 h-6 rounded-full"
        />
        <div className="flex flex-col  ">
          <h1 className=" font-medium">{`${currentUser.firstName} ${currentUser.lastName}`}</h1>
          <p className="text-gray truncate text-gray-600 text-xs">
            {" "}
            {currentUser.email}
          </p>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="flex gap-2 items-center hover:opacity-80 cursor-pointer transition"
      >
        <MdDarkMode className="w-5 h-6  text-gray-600" />
        <p className="text-xs tracking-wide text-gray-600 ">theme</p>
      </button>
      <Link
        className="flex gap-2 items-center hover:opacity-80 cursor-pointer transition"
        to="/profil"
      >
        <RiAccountPinCircleFill className="w-5 h-6 text-gray-600" />
        <h className="text-xs tracking-wide text-gray-600 ">Profil</h>
      </Link>
      <button
        onClick={handleSignOut}
        className="flex gap-2 items-center hover:opacity-80 cursor-pointer transition"
      >
        <GoSignOut className="w-5 h-6 text-gray-600" />
        <h
          className="text-xs tracking-wide text-gray-600 "
          onClick={handleSignOut}
        >
          Sign Out
        </h>
      </button>
    </div>
  );
};
export default DropDownProfile;

