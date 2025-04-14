const User = require("../models/users");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");
const axios = require("axios");

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://nobledeeds-backend.onrender.com";

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.json({
        message:
          "User with same email or username already exists. Please use a different one.",
      });
    }
    const user = await User.create({ email, username, password });
    const token = createSecretToken(user._id);
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    };

    res.cookie("token", token, cookieOptions);
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ success: false, message: "All fields are required!" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "Incorrect username or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = createSecretToken(user._id);
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    };

    res.cookie("token", token, cookieOptions);

    res.json({
      success: true,
      message: "User logged in successfully",
      user: user.username
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
