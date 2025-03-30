const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
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
router.post("/addCampaign", upload.single("image"), createCampaign);
router.put("/editCampaign/:id", editCampaign);
router.put("/donate/:id", donateToCampaign);
router.route("/:id").get(showCampaign).delete(deleteCampaign);
router.get("/user/campaigns", getUserCampaigns);

module.exports = router;
