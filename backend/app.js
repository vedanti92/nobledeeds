const Campaign = require("./models/campaigns");
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const url = process.env.MONGO_URL;
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

app.get("/home", async (req, res) => {
  const { category } = req.query;
  let campaigns;
  if (category && category !== "all") {
    campaigns = await Campaign.find({ category });
  } else {
    campaigns = await Campaign.find({});
  }
  res.json(campaigns);
});

app.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const campaigns = await Campaign.find({
      title: { $regex: query, $options: 'i' }
    });
    console.log("Backend search results:", campaigns); // Debug log
    res.json(campaigns);
  } catch (error) {
    console.error("Backend error:", error); // Debug log
    res.status(500).json({ error: "Search failed" });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  let campaign = await Campaign.findById(id);
  res.json(campaign);
});

app.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const campaigns = await Campaign.find({
      title: { $regex: query, $options: 'i' }
    });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  mongoose.connect(url);
  console.log("DB connected");
});
