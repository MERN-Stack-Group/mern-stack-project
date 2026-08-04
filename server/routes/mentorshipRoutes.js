const express = require("express");
const router = express.Router();
const {
  createMentorship,
  deleteMentorship,
  progressStage,
  removeStudent,
} = require("../controllers/mentorshipController");
const { protect } = require("../middleware/authMiddleware");

// Static Routes
router.post("/", protect, createMentorship);

// Dynamic Routes
router.delete("/:id", protect, deleteMentorship);
router.put("/:id/stage", protect, progressStage);
router.delete("/:id/students/:studentId", protect, removeStudent);

module.exports = router;
