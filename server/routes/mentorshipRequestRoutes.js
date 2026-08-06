const express = require("express");
const router = express.Router();
const {
  createRequest,
  acceptRequest,
  getPendingRequests,
  rejectRequest,
  getMyRequests
} = require("../controllers/mentorshipRequestController");
const { protect } = require("../middleware/authMiddleware");

// Static Routes
router.post("/", protect, createRequest);
router.get("/pending", protect, getPendingRequests);
router.get("/my-requests", protect, getMyRequests);

// Dynamic Routes
router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);

module.exports = router;
