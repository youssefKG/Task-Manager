import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { AuthContext } from "../context/authContext";
import instance from "../config/axios";

const Profil = () => {
  // responsble if the user want to chnage the password
  const [changePassword, setChangePassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [profilData, setProfilData] = useState({
    firstName: "youssef",
    lastName: "Taoussi",
    email: "youssefTaoussi@gmail.com",
  });
  const { currentUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setProfilData({ ...profilData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setChangePassword(!changePassword);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!changePassword) {
        const { firstName, lastName, email } = profilData;
        setProfilData({ firstName, lastName, email });
      }
      const res = await instance.patch("/user/update/profil", profilData);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setProfilData(currentUser);
  }, []);
  return (
    <div className=" flex w-full gap-6 flex-col  text-white  items-center justify-center pb-24  border-gray-800 rounded-xl bg-[#1B1B1B] border p-6">
      <div className="flex gap-4 items-center ">
        <img
          src="https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?pid=ImgDet&rs=1"
          alt=""
          className="w-24 h-24 rounded-full"
        />
        <div className="flex flex-col gap-2  text-center text-gray-200 font-semibold text-xl">
          <h className=" tracking-wide">
            {`${currentUser.firstName} ${currentUser.lastName}`}{" "}
          </h>
          <h1 className="text-[16px] text-gray-300 ">{currentUser.email}</h1>
        </div>
      </div>
      <form
        onSubmit={handleUpdate}
        className="mt-6  gap-4 flex flex-col w-full sm:w-fit  "
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full ">
          <div className=" flex flex-col gap-2 w-full">
            <label htmlFor="first name"> First Name : </label>
            <input
              className=" bg-transparent indent-1 w rounded-lg  border-[1px] font-medium text-gray-300 tracking-wide p-2 "
              type="text"
              name="firstName"
              value={profilData.firstName}
              onChange={handleInputChange}
              maxLength={30}
              required
            />
          </div>
          <div className="flex gap-2 flex-col  w-full">
            <label htmlFor="first name"> Last Name : </label>
            <input
              className=" bg-transparent indent-1  rounded-lg  border-[1px] font-medium text-gray-300 tracking-wide p-2 "
              type="text"
              name="lastName"
              value={profilData.lastName}
              onChange={handleInputChange}
              required
              maxLength={30}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email"> Email : </label>
          <input
            className=" bg-transparent  w  rounded-lg  border-[1px] font-medium text-gray-300 tracking-wide p-2 "
            type="email"
            name="email"
            value={profilData.email}
            onChange={handleInputChange}
            required
            maxLength={40}
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="bg-slate-600 hover:opacity-95 p-2 font-medium tracking-wide rounded-lg px-4 my-2"
        >
          {!changePassword ? "Change Passwod" : "Cancel"}
        </button>

        {changePassword && (
          <div className="flex flex-col gap-2">
            <input
              className=" bg-transparent  placeholder:text-xs w  rounded-lg  border-[1px] font-medium text-gray-300 tracking-wide p-2 "
              type="password"
              name="oldPassword"
              onChange={handleInputChange}
              required
              placeholder="Old Password"
            />
            <input
              className=" bg-transparent placeholder:text-xs  rounded-lg  border-[1px] font-medium text-gray-300 tracking-wide p-2 "
              type="password"
              name="newPassword"
              onChange={handleInputChange}
              required
              placeholder="New Password"
            />
            {passwordError && (
              <p className="text-xs text-red-700 "> {passwordError}</p>
            )}
            <input
              className=" bg-transparent items-center placeholder:text-xs   w  rounded-lg  border-[1px] font-medium text-gray-300 tracking-wide p-2 "
              type="password"
              name="confirmPassword"
              onChange={handleInputChange}
              required
              placeholder="Confirm New Password"
            />
          </div>
        )}

        <button className="p-3 hover:90 bg-gray-700 rounded-lg  tracking-wider font-semibold">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profil;

