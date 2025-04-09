const Campaign = require("../models/campaigns");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports.getAllCampaigns = async (req, res) => {
  try {
    const { category } = req.query;
    let campaigns =
      category && category !== "all"
        ? await Campaign.find({ category })
        : await Campaign.find({});
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.searchCampaigns = async (req, res) => {
  try {
    const { query } = req.query;
    const campaigns = await Campaign.find({
      title: { $regex: query, $options: "i" },
    });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.createCampaign = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decoded.id;

    const newCampaign = new Campaign({
      ...req.body,
      userId,
      image: req.file.path,
    });
    await newCampaign.save();
    res.json(newCampaign);
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.editCampaign = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decoded.id;

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    if (campaign.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to edit this campaign" });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.donateToCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const { raisedAmount } = req.body;

    if (!raisedAmount || isNaN(raisedAmount) || raisedAmount <= 0) {
      return res.status(400).json({ message: "Invalid donation amount" });
    }

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Check if donation would exceed goal amount
    if (campaign.raisedAmount + raisedAmount > campaign.goalAmount) {
      return res
        .status(400)
        .json({ message: "Donation would exceed campaign goal" });
    }

    // Update the campaign with the new amount
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { $inc: { raisedAmount: raisedAmount } },
      { new: true }
    );

    res.json({
      message: "Donation successful",
      campaign: updatedCampaign,
    });
  } catch (error) {
    console.error("Error processing donation:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.showCampaign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "userId",
      "username"
    );

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.json({
      ...campaign.toObject(),
      username: campaign.userId?.username || "Unknown",
    });
  } catch (error) {
    console.error("Error fetching campaign:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteCampaign = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decoded.id;

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    if (campaign.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to delete this campaign",
      });
    }

    await Campaign.findByIdAndDelete(req.params.id);
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getUserCampaigns = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decoded.id;

    const campaigns = await Campaign.find({ userId: userId });
    res.json(campaigns);
  } catch (error) {
    console.error("Error fetching user campaigns:", error);
    res.status(500).json({ message: "Server error" });
  }
};
