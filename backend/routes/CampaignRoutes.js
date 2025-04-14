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

router.get("/home", getAllCampaigns);
router.get("/search", searchCampaigns);
router.post("/addCampaign", isLoggedIn, upload.single("image"), createCampaign);
router.put("/editCampaign/:id", isLoggedIn, upload.single("image"), editCampaign);
router.put("/donate/:id", isLoggedIn, donateToCampaign);
router.route("/:id").get(showCampaign).delete(isLoggedIn, deleteCampaign);
router.get("/user/campaigns", isLoggedIn, getUserCampaigns);

module.exports = router;
