import React, { useContext, useMemo, useState } from "react";

import { ShopContext } from "../context/shopcontext";
import { assets } from "../assets/assets";
import Title from "../components/title";
import ProductItem from "../components/productitem";

const Collection = () => {
  const [showFilter, SetShowFilter] = useState(true);
  const { products, Search, ShowSearch } = useContext(ShopContext);
  const [Category, SetCategory] = useState([]);
  const [SubCategory, SetSubCategory] = useState([]);
  const [SortType, SetSortType] = useState("relevant");
  {
    /* toggle category and subcategory */
  }
  const toggleCategory = (e) => {
    if (Category.includes(e.target.value)) {
      SetCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      SetCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (SubCategory.includes(e.target.value)) {
      SetSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      SetSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  {
    /* filter products */
  }
  const FilterProducts = useMemo(() => {
    let productsCopy = products.slice();
    {
      /* filter by search, category and subcategory */
    }
    if (ShowSearch && Search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(Search.toLowerCase()),
      );
    }
    if (Category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        Category.includes(item.category),
      );
    }
    if (SubCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        SubCategory.includes(item.subCategory),
      );
    }
    return productsCopy;
  }, [products, Category, SubCategory, Search, ShowSearch]);
  {
    /* function sort products */
  }
  const SortProducts = useMemo(() => {
    let productsCopy = FilterProducts.slice();
    switch (SortType) {
      case "low-high":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "high-low":
        return productsCopy.sort((a, b) => b.price - a.price);
      default:
        return productsCopy;
    }
  }, [FilterProducts, SortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter */}
      <div className="min-w-60">
        <p
          onClick={() => SetShowFilter(!showFilter)}
          className="my-2 flex items-center cursor-pointer text-xl gap-2"
        >
          Filters
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown_icon"
          />
        </p>

        {/* category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 font-light text-sm text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Ceramic"}
                onChange={toggleCategory}
              />
              CERAMIC
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Porcelain"}
                onChange={toggleCategory}
              />
              PORCELAIN
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Melamine"}
                onChange={toggleCategory}
              />
              MELAMINE
            </p>
          </div>
        </div>

        {/* subcategory filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 font-light text-sm text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Dinner Plates"}
                onChange={toggleSubCategory}
              />
              DINNER PLATES
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Side Plates"}
                onChange={toggleSubCategory}
              />
              SIDE PLATES
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Serving Bowls"}
                onChange={toggleSubCategory}
              />
              SERVING BOWLS
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="flex-1">
        <div className="flex  items-center justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* sort */}
          <select
            onChange={(e) => {
              SetSortType(e.target.value);
            }}
            className="border border-gray-300 text-sm py-2"
          >
            <option value="relevant">Sort by: Relevent</option>
            <option value="high-low">Sort by: High-Low</option>
            <option value="low-high">Sort by: Low-High</option>
          </select>
        </div>

        {/* all products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {SortProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.images}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
