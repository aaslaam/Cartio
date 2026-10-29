import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopcontext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

// searchbar
const SearchBar = () => {
  const { Search, SetSearch, ShowSearch, SetShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  {
    /* makes sure search bar only in collections */
  }
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, ShowSearch]);
  {
    /*  checks if search bar should be visible */
  }

  return ShowSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex justify-center items-center border border-b-gray-200 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search.."
          className="flex-1 outline-none bg-inherit text-sm"
          value={Search}
          onChange={(e) => SetSearch(e.target.value)}
        />
        <img src={assets.search_icon} alt="search_icon" className="w-5" />
      </div>
      <img
        onClick={() => {
          SetShowSearch(false);
        }}
        src={assets.cross_icon}
        alt="cross_icon"
        className="w-5 inline cursor-pointer"
      />
    </div>
  ) : null;
};

export default SearchBar;
