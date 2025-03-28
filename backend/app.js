const Campaign = require("./models/campaigns");
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

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(cookieParser());

app.use("/", authRoute);
app.use("/", campaignRoutes);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));
