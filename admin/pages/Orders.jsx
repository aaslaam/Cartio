import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { assets } from "../assets/assets";
import { currency, backendUrl } from ".././src/App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    console.log("token:", token, "url:", backendUrl);
    if (!token) return;
    try {
      const response = await axios.get(backendUrl + "/api/order/list", {
        headers: { token },
      });
      console.log("response:", response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(
        "error:",
        error.response?.status,
        error.response?.data || error.message,
      );
      toast.error(error.message);
    }
  };
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } },
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.msg || response.data.message);
      }
    } catch (error) {
      console.log(
        "error:",
        error.response?.status,
        error.response?.data || error.message,
      );
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 my-3 md:my-4 text-xs sm:text-sm text-gray-700 md:p-8"
          >
            <img className="w-12" src={assets.parcel_icon} alt="parcel_icon" />

            <div>
              <div>
                {order.items.map((item, i) => (
                  <p className="py-0.5" key={i}>
                    {item.name} x {item.quantity} {item.size}
                    {i !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address?.firstName + " " + order.address?.lastName}
              </p>
              <div>
                <p>{order.address?.street + ","}</p>
                <p>
                  {order.address?.city}, {order.address?.state},{" "}
                  {order.address?.country}, {order.address?.zipcode}
                </p>
              </div>
              <p>{order.address?.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items?.length}
              </p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              defaultValue={order.status}
              className="p-2 font-semibold border border-gray-300 bg-white"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
