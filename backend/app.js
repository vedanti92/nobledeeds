const Campaign = require("./models/campaigns");
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

const url = process.env.MONGO_URL;
const port = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

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

app.put("/editCampaign/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/donate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { raisedAmount } = req.body;

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    if (raisedAmount > campaign.goalAmount) {
      return res.status(400).json({ message: "Donation exceeds goal amount" });
    }

    campaign.raisedAmount = raisedAmount;
    await campaign.save();

    res
      .status(200)
      .json({ message: "Donation updated successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  let campaign = await Campaign.findById(id);
  res.json(campaign);
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let campaign = await Campaign.findByIdAndDelete(id);
  res.json(campaign);
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

mongoose
  .connect(url)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));
