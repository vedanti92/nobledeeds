const Campaign = require("../models/campaigns");
const jwt = require("jsonwebtoken");

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

    const newCampaign = new Campaign({ ...req.body, userId });
    await newCampaign.save();
    res.json(newCampaign);
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.editCampaign = async (req, res) => {
  try {
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

    const campaign = await Campaign.findById(id);
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });

    if (raisedAmount > campaign.goalAmount) {
      return res.status(400).json({ message: "Donation exceeds goal amount" });
    }

    campaign.raisedAmount = raisedAmount;
    await campaign.save();
    res.json({ message: "Donation updated", campaign });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.showCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    res.json(campaign);
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
