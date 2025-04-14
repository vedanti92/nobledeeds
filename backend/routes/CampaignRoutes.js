const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const { isLoggedIn } = require("../middlewares/AuthMiddleware");
const {
  getAllCampaigns,
  searchCampaigns,
  createCampaign,
  editCampaign,
  donateToCampaign,
  showCampaign,
  deleteCampaign,
  getUserCampaigns,
} = require("../controllers/CampaignController");

// Static routes first
router.get("/home", getAllCampaigns);
router.get("/search", searchCampaigns);
router.get("/user/campaigns", isLoggedIn, getUserCampaigns);

// Campaign creation and editing
router.post("/addCampaign", isLoggedIn, upload.single("image"), createCampaign);
router.put("/editCampaign/:id", isLoggedIn, upload.single("image"), editCampaign);

// Campaign donation
router.put("/donate/:id", isLoggedIn, donateToCampaign);

// Dynamic route for campaign ID should be last
router.route("/:id").get(showCampaign).delete(isLoggedIn, deleteCampaign);

module.exports = router;
