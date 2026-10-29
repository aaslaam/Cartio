// add cart
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity = 1 } = req.body;

    if (!itemId) {
      return res.json({ success: false, message: "itemId is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({
        success: false,
        message: "User not found. Login again",
      });
    }
    let cartData = userData.cartData || {};

    cartData[itemId] = (cartData[itemId] || 0) + quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    if (!itemId) {
      return res.json({ success: false, message: "itemId is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({
        success: false,
        message: "User not found. Login again",
      });
    }
    let cartData = userData.cartData || {};

    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// find user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({
        success: false,
        message: "User not found. Login again",
      });
    }
    let cartData = userData.cartData || {};

    // one-time cleanup of bad key from the old frontend
    if (cartData["undefined"] !== undefined) {
      delete cartData["undefined"];
      await userModel.findByIdAndUpdate(userId, { cartData });
    }

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
