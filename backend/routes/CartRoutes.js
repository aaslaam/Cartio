// cart routes

import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartController.js";
import authuser from "../middleware/auth.js";

const cartRouter = express.Router();
cartRouter.post("/add", authuser, addToCart);
cartRouter.post("/update", authuser, updateCart);
cartRouter.post("/get", authuser, getUserCart);

export default cartRouter;
