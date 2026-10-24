import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// route user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: "User dosen't exists" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, msg: "welocme user" });
    } else {
      res.json({ success: false, msg: "Invalid Credenttials" });
    }

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

// route user signup
const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, msg: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        msg: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPass });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

// route admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.json({ success: true, token });
  }
};

export { userLogin, userSignUp, adminLogin };
