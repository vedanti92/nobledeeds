const User = require("../models/users");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");
const axios = require("axios");

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080";

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
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt for username:", username);

    if (!username || !password) {
      return res.json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "Incorrect password or username." });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password." });
    }

    const token = createSecretToken(user._id);

    // Simplified cookie settings for development
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user: user.username,
      email: user.email,
      token: token, // Send token in response body as well
    });
  } catch (error) {
    console.error("Login error:", error);
  }
};
