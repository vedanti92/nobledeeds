require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const campaignRoutes = require("./routes/CampaignRoutes");

const app = express();

const url = process.env.MONGO_URL;
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: ["https://nobledeeds.onrender.com", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"]
};

app.use(cors(corsOptions));

// Set cookie options for all routes
app.use((req, res, next) => {
  res.cookie = res.cookie.bind(res);
  res.cookie = (name, value, options = {}) => {
    const defaultOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    };
    return res.cookie(name, value, { ...defaultOptions, ...options });
  };
  next();
});

// Routes - Auth routes should come before campaign routes
app.use("/", authRoute);
app.use("/", campaignRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
