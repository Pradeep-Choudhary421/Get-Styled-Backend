const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/UserSchema");

exports.isAuthenticated = async (req, res, next) => {
  try {
    // const { token } = req.cookies;
    let tokn = req.headers["auth-x-token"];
    if (!tokn.split("=")[1]) {
      return res.status(401).json({
        success: false,
        message: "you are not authenticated",
      });
    }
    const decoded = await jwt.verify(
      tokn.split("=")[1],
      process.env.SECRET_KEY
    );
    req.user = await User.findById(decoded._id);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
