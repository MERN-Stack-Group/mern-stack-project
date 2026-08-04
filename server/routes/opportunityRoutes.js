const express = require("express");
const router = express.Router();
const {
  createOpportunity,
  getActiveOpportunities,
  getDeletedOpportunities,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");
const { protect } = require("../middleware/authMiddleware");

// Static Routes
router
  .route("/")
  .get(protect, getActiveOpportunities)
  .post(protect, createOpportunity);

router.get("/deleted", protect, getDeletedOpportunities);

// Dynamic Routes
router
  .route("/:id")
  .put(protect, updateOpportunity)
  .delete(protect, deleteOpportunity);

module.exports = router;
