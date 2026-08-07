const express = require("express");
const router = express.Router();
const {
  createOpportunity,
  getActiveOpportunities,
  getDeletedOpportunities,
  updateOpportunity,
  deleteOpportunity,
  getOpportunityById,
} = require("../controllers/opportunityController");
const { protect } = require("../middleware/authMiddleware");

// Static Routes
router
  .route("/")
  .get(protect, getActiveOpportunities)
  .post(protect, createOpportunity);

router.get("/deleted", protect, getDeletedOpportunities);

// Dynamic Routes
router.put("/:id", protect, updateOpportunity);
router.delete("/:id", protect, deleteOpportunity);
router.get("/:id", protect, getOpportunityById);

module.exports = router;
