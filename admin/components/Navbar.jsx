import React from "react";
import { assets } from "../assets/assets";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-ceter px-[4%] py-2 justify-between">
      <img src={assets.logo} className="w-[max(10%,80px)]" alt="logo" />
      <button
        onClick={() => {
          setToken("");
        }}
        className="bg-gray-600 text-white px-5 py-2 rounded-full sm:px-7 sm:py-2 text-xs small:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
