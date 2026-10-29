import express from "express";

import {
  placeOrders,
  userOrders,
  allOrders,
  orderStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();
// admin
orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, orderStatus);

// user
orderRouter.post("/place", authUser, placeOrders);
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
