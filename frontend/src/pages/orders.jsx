import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopcontext";
import Title from "../components/title";
import OrdersEmpty from "../components/ordersempty";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { currency, backendUrl, Token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    if (!Token) {
      // no token anywhere = logged out, stop loading. Else wait for token restore.
      if (!localStorage.getItem("token")) setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token: Token } },
      );

      if (response.data.success) {
        const allItems = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allItems.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [Token]);

  return (
    <div className="border-t pt-16 ">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {loading ? null : orderData.length === 0 ? (
          <OrdersEmpty />
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 "
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={item.images?.[0]}
                  alt={item.name}
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-700">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrders}
                  className="cursor-pointer border px-4 py-2 text-sm rounded-sm font-medium"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
