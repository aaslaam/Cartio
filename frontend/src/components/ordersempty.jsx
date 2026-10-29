import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

// empty order state

const OrdersEmpty = () => {
  const { Navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col items-center text-center py-16 sm:py-24">
      {/* open box illustration */}
      <svg
        width="240"
        height="200"
        viewBox="0 0 240 200"
        fill="none"
        stroke="#111"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {/* shadow */}
        <ellipse
          cx="120"
          cy="176"
          rx="58"
          ry="8"
          fill="#ebeae5"
          stroke="none"
        />

        {/* sparkles */}
        <path d="M50 34v10M45 39h10" strokeWidth="1.6" />
        <path d="M192 46v12M186 52h12" strokeWidth="1.6" />
        <circle cx="158" cy="24" r="2.5" fill="#111" stroke="none" />

        {/* open flaps */}
        <path d="M70 78L120 56L110 34L60 56Z" fill="#fff" />
        <path d="M120 56L170 78L180 56L130 34Z" fill="#fff" />

        {/* box faces */}
        <path d="M70 78L120 56L170 78L120 100Z" fill="#f0efec" />
        <path d="M70 78L120 100V160L70 138Z" fill="#fff" />
        <path d="M120 100L170 78V138L120 160Z" fill="#e4e2dc" />

        {/* label ticks */}
        <path d="M90 112v9M98 115v9" strokeWidth="1.8" />
      </svg>

      <h2 className="mt-6 text-2xl sm:text-3xl font-semibold text-gray-900">
        No orders yet
      </h2>
      <p className="mt-3 max-w-sm text-gray-500">
        When you place an order, you can track it, return items and reorder from
        here.
      </p>

      <div className="mt-8 flex items-center gap-6">
        <button
          onClick={() => Navigate("/collection")}
          className="bg-black text-white text-sm font-medium px-8 py-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
        >
          Start shopping
        </button>
        <button
          onClick={() => Navigate("/collection")}
          className="text-sm font-medium text-gray-900 cursor-pointer hover:underline underline-offset-4"
        >
          Browse categories
        </button>
      </div>
    </div>
  );
};

export default OrdersEmpty;
