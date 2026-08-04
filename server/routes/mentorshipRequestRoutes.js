const express = require("express");
const router = express.Router();
const {
  createRequest,
  acceptRequest,
  getPendingRequests,
  rejectRequest,
  
} = require("../controllers/mentorshipRequestController");
const { protect } = require("../middleware/authMiddleware");

// Static Routes
router.post("/", protect, createRequest);
router.get("/pending", protect, getPendingRequests);

// Dynamic Routes
router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);

module.exports = router;
