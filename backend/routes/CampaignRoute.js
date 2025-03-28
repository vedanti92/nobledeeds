const express = require("express");
const router = express.Router();
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
router.post("addCampaign", createCampaign);
router.put("editCampaign/:id", editCampaign);
router.put("/donate/:id", donateToCampaign);
router.get("/:id", showCampaign);
router.delete("/:id", deleteCampaign);
router.get("/user/campaigns", getUserCampaigns);

module.exports = router;
