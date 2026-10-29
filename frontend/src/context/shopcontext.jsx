import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [ShowSearch, SetShowSearch] = useState(false);
  const [Search, SetSearch] = useState("");
  const [CartItems, SetCartItems] = useState({});
  const [products, SetProducts] = useState([]);
  const [Token, SetToken] = useState("");

  const Navigate = useNavigate();

  {
    /* add to cart */
  }
  const AddToCart = async (ItemId, quantity = 1) => {
    let CartData = structuredClone(CartItems);
    if (CartData[ItemId]) {
      CartData[ItemId] += quantity;
    } else {
      CartData[ItemId] = quantity;
    }
    SetCartItems(CartData);

    if (Token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId: ItemId, quantity },
          { headers: { token: Token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  {
    /* update quantity or remove item */
  }
  const UpdateQuantity = async (ItemId, quantity) => {
    let CartData = structuredClone(CartItems);
    if (quantity <= 0) {
      delete CartData[ItemId];
    } else {
      CartData[ItemId] = quantity;
    }
    SetCartItems(CartData);

    if (Token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId: ItemId, quantity },
          { headers: { token: Token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  {
    /* load cart from backend */
  }
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        SetCartItems(response.data.cartData || {});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  {
    /* get count cart items */
  }
  const CartCount = () => {
    let count = 0;
    for (const items in CartItems) {
      if (CartItems[items] > 0) {
        count += CartItems[items];
      }
    }
    return count;
  };

  {
    /* get total price of cart items */
  }
  const GetTotal = () => {
    let TotalAmount = 0;
    for (const items in CartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (itemInfo && CartItems[items] > 0) {
        TotalAmount += itemInfo.price * CartItems[items];
      }
    }
    return TotalAmount;
  };

  // product data
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        SetProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    getProductsData();
  }, []);

  // restore token from localStorage
  useEffect(() => {
    if (!Token && localStorage.getItem("token")) {
      SetToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  // load cart when logged in
  useEffect(() => {
    if (Token) {
      getUserCart(Token);
    }
  }, [Token]);

  const value = {
    products,
    currency,
    delivery_fee,
    ShowSearch,
    SetShowSearch,
    Search,
    SetSearch,
    AddToCart,
    UpdateQuantity,
    CartItems,
    SetCartItems,
    CartCount,
    GetTotal,
    Navigate,
    SetProducts,
    backendUrl,
    Token,
    SetToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
