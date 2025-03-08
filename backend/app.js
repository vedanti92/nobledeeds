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

  const campaigns = await Campaign.find({
    title: { $regex: query, $options: "i" },
  });
  res.json(campaigns);
});

app.post("/addCampaign", async (req, res) => {
  const newCampaign = new Campaign(req.body);
  await newCampaign.save();
  res.json(newCampaign);
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  let campaign = await Campaign.findById(id);
  res.json(campaign);
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  mongoose.connect(url);
  console.log("DB connected");
});
