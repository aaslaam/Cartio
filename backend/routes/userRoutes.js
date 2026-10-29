import express from "express";

import {
  userSignUp,
  userLogin,
  adminLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.post("/admin", adminLogin);

export default userRouter;
