const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  goalAmount: {
    type: Number,
    required: true,
  },

  raisedAmount: {
    type: Number,
    default: 0,
  },

  category: {
    type: String,
    enum: [
      "all",
      "disaster-relief",
      "food-assistance",
      "education",
      "animals",
      "children",
      "senior-care",
      "women",
      "specially-abled",
      "medical-aid",
      "environment",
      "others",
    ],
    required: true,
  },
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
