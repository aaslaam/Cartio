import React, { useContext, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { ShopContext } from "../context/ShopContext";
import Tittle from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { currency, CartItems, CartCount, products, UpdateQuantity, Navigate } =
    useContext(ShopContext);

  const [CartData, SetCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const TempData = [];
      for (const itemId in CartItems) {
        if (CartItems[itemId] > 0) {
          TempData.push({
            _id: itemId,
            quantity: CartItems[itemId],
          });
        }
      }
      SetCartData(TempData);
    }
  }, [CartItems, products]);

  // "You might like": bestselling products shown as plain products (no label).
  // Skips items already in cart. If fewer than 4 bestsellers, fills with other products.
  const suggestions = useMemo(() => {
    const available = products.filter((p) => !(CartItems[p._id] > 0));
    const best = available.filter((p) => p.bestseller);
    const rest = available.filter((p) => !p.bestseller);
    return [...best, ...rest].slice(0, 4);
  }, [products, CartItems]);

  const count = CartCount();
  const isEmpty = CartData.length === 0;

  return (
    <div className="border-t pt-14">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl">
          <Tittle text1="YOUR" text2="CART" />
        </div>
        <p className="text-sm text-gray-500">
          {count} {count === 1 ? "item" : "items"}
        </p>
      </div>

      {/* empty state */}
      {isEmpty && products.length > 0 && (
        <div className="bg-[#f5f4f1] px-6 py-14 flex flex-col items-center text-center">
          <div className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 7h12l1 14H5L6 7z" />
              <path d="M9 7V6a3 3 0 0 1 6 0v1" />
            </svg>
          </div>

          <h2 className="mt-6 text-2xl sm:text-3xl font-medium text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-3 max-w-sm text-gray-500">
            Looks like you haven't added anything yet. Explore the collection
            and find something you love.
          </p>

          <button
            onClick={() => Navigate("/collection")}
            className="mt-6 bg-black text-white text-sm tracking-wide px-10 py-4 flex items-center gap-6 cursor-pointer"
          >
            CONTINUE SHOPPING
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() =>
                Navigate("/collection", { state: { filter: "new-arrivals" } })
              }
              className="border border-gray-300 bg-white rounded-full px-5 py-2 text-sm text-gray-800 hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
            >
              New Arrivals
            </button>
            <button
              onClick={() =>
                Navigate("/collection", { state: { filter: "bestsellers" } })
              }
              className="border border-gray-300 bg-white rounded-full px-5 py-2 text-sm text-gray-800 hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
            >
              Bestsellers
            </button>
          </div>
        </div>
      )}

      {/* items + summary */}
      {!isEmpty && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          <div className="flex flex-col">
            {CartData.map((item) => {
              const productData = products.find(
                (product) => product._id === item._id,
              );

              if (!productData) return null;

              return (
                <div
                  key={item._id}
                  className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      className="w-16 sm:w-20"
                      src={productData.images?.[0]}
                      alt={productData.name}
                    />
                    <div>
                      <p className="text-xs sm:text-lg font-medium">
                        {productData.name}
                      </p>
                      <p className="mt-1">
                        {currency}
                        {productData.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        UpdateQuantity(item._id, item.quantity - 1)
                      }
                      className="w-7 h-7 border border-gray-400 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <p className="w-6 text-center">{item.quantity}</p>
                    <button
                      onClick={() =>
                        UpdateQuantity(item._id, item.quantity + 1)
                      }
                      className="w-7 h-7 border border-gray-400 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <img
                    onClick={() => UpdateQuantity(item._id, 0)}
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    src="/src/assets/bin_icon.png"
                    alt="remove"
                  />
                </div>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-6 p-6 bg-[#f5f4f1]">
            <CartTotal />
            <button
              onClick={() => Navigate("/place-order")}
              className="w-full bg-black cursor-pointer text-white px-8 py-3 mt-6 text-sm"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}

      {/* you might like */}
      {suggestions.length > 0 && (
        <div className="mt-16">
          <div className="text-2xl mb-6">
            <Tittle text1="YOU MIGHT" text2="LIKE" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {suggestions.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p._id}`}
                className="block group"
              >
                <div className="bg-[#ebeae5] overflow-hidden">
                  <img
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300"
                    src={p.images?.[0]}
                    alt={p.name}
                  />
                </div>
                <div className="flex items-start justify-between gap-3 mt-3 text-sm">
                  <p className="font-medium text-gray-900">{p.name}</p>
                  <p className="text-gray-500 shrink-0">
                    {currency}
                    {p.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
