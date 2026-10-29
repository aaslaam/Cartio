import jwt from "jsonwebtoken";
// admin auth func
const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, msg: "Not Authorized" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode.role !== "admin") {
      return res.json({ success: false, msg: "Not Authorized" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

export default adminAuth;
