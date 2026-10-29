import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/shopcontext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { SetShowSearch, CartCount, Token, SetToken, SetCartItems, Navigate } =
    useContext(ShopContext);

  const logout = () => {
    Navigate("/login");
    localStorage.removeItem("token");
    SetToken("");
    SetCartItems({});
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* nav start */}
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>

      {/* nav left side */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" to="/">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/collection">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/about">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/contact">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      {/* nav left end */}

      {/* nav right side */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => SetShowSearch(true)}
          src={assets.search_icon}
          alt="search"
          className="w-5 cursor-pointer"
        />
        {/* profile dropdown start */}
        <div className="group relative">
          <img
            onClick={() => (Token ? null : Navigate("/login"))}
            src={assets.profile_icon}
            alt="profile"
            className="w-5 cursor-pointer"
          />
          {Token && (
            <div className="group-hover:block hidden right-0 absolute dropdown-menu pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg shadow-lg">
                <NavLink
                  to="/orders"
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </NavLink>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        {/* profile dropdown end */}
        <Link to="/cart" className="relative">
          <img
            src={assets.Cart_icon}
            alt="cart"
            className="w-5 min-w-5 cursor-pointer"
          />
          <p className="absolute right-[-5px] bottom-[-5px] bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
            {CartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/* nav right end */}

      {/* hamburger menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
      {/* hamburger menu end */}
      {/* nav end */}
    </div>
  );
};

export default Navbar;
