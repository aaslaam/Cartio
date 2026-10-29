import React, { useContext, useEffect, useState } from "react";

import { ShopContext } from "../context/shopcontext";
import Title from "../components/title";
import ProductItem from "./productitem";

const BestSeller = () => {
  {
    /*  bestseller products */
  }

  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  // looped products from admin panel
  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8 ">
        <Title text1={"Best"} text2={"Seller"} />
        {/* Subtext below */}
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ab
          tempore in praesentium quibusdam incidunt reprehenderit.
        </p>
      </div>
      {/* rendering bestseller products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
        {/*  bestseller end */}
      </div>
    </div>
  );
};

export default BestSeller;
