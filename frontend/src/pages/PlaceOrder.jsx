import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { pinToAddress } from "india-pincode-finder";
import Tittle from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [Method, SetMethod] = useState("cod");
  const {
    Navigate,
    backendUrl,
    Token,
    CartItems,
    SetCartItems,
    GetTotal,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    pincode: "",
    city: "",
    state: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onPincodeChange = (event) => {
    const value = event.target.value;

    // only allow digits, max 6
    if (value !== "" && !/^\d{0,6}$/.test(value)) return;

    setFormData((prev) => ({ ...prev, pincode: value }));

    if (value.length === 6) {
      const result = pinToAddress(Number(value));
      if (result) {
        setFormData((prev) => ({
          ...prev,
          city: result.district,
          state: result.state,
        }));
      }
    }
  };

  const onPhoneChange = (event) => {
    const value = event.target.value;

    // only allow digits, max 10
    if (value !== "" && !/^\d{0,10}$/.test(value)) return;

    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in CartItems) {
        if (CartItems[itemId] > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            const itemInfo = structuredClone(product);
            itemInfo.quantity = CartItems[itemId];
            orderItems.push(itemInfo);
          }
        }
      }

      if (orderItems.length === 0) {
        return toast.error("Your cart is empty");
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: GetTotal() + delivery_fee,
      };
      switch (Method) {
        // API calls COD
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token: Token } },
          );
          if (response.data.success) {
            SetCartItems({});
            toast.success(response.data.message);
            Navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 pt-5 sm:pt-14 px-4 sm:px-0 min-h-[80vh] border-t"
    >
      {/* left */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Tittle text1="Delivery" text2="Information" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Email Address"
        />

        <div className="flex items-center border border-gray-300 rounded w-full overflow-hidden">
          <span className="px-3.5 py-1.5 text-gray-500 border-r border-gray-300 bg-gray-50 shrink-0">
            +91
          </span>
          <input
            required
            onChange={onPhoneChange}
            name="phone"
            value={formData.phone}
            type="text"
            inputMode="numeric"
            minLength={10}
            maxLength={10}
            className="py-1.5 px-3.5 w-full min-w-0 outline-none"
            placeholder="Phone"
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
        />

        <input
          required
          onChange={onPincodeChange}
          name="pincode"
          value={formData.pincode}
          type="text"
          inputMode="numeric"
          minLength={6}
          maxLength={6}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Pincode"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>
      </div>
      {/* right */}
      <div className="w-full sm:w-auto mt-8 sm:mt-8">
        <div className="w-full sm:min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          {/* payment methods */}
          <Tittle text1={"PAYMENT"} text2={"METHODS"} />
          <div className="flex flex-col gap-3 mt-3">
            {/* Cash on Delivery */}
            <div
              onClick={() => SetMethod("cod")}
              className={`flex items-center gap-3 border rounded p-2 px-3 cursor-pointer transition-colors duration-200 ${
                Method === "cod"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <span
                className={`flex items-center justify-center min-w-4 h-4 rounded-full border transition-colors duration-200 ${
                  Method === "cod" ? "border-green-500" : "border-gray-400"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full bg-green-500 transition-transform duration-200 ${
                    Method === "cod" ? "scale-100" : "scale-0"
                  }`}
                ></span>
              </span>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <button
            type="submit"
            className=" cursor-pointer w-full sm:w-auto bg-black text-white px-8 py-3 my-8 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
