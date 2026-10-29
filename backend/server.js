import "dotenv/config";
import express from "express";
import cors from "cors";

import { ConnectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/CartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
ConnectDB();
connectCloudinary();

// middleware

app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
