const express = require("express");
const router = express.Router();
const {
  createMentorship,
  deleteMentorship,
  progressStage,
  removeStudent,
  getMentorshipsByStage,
  getMentorshipById,
  getAlumniMentorships,
} = require("../controllers/mentorshipController");
const { protect } = require("../middleware/authMiddleware");

// GET /api/mentorships            all mentorships
// GET /api/mentorships?stage=...  filtered by stage
router.get("/", protect, getMentorshipsByStage);

// GET /api/mentorships/alumni/my-programs
router.get("/alumni/my-programs", protect, getAlumniMentorships);

// GET /api/mentorships/:id
router.get("/:id", protect, getMentorshipById);

// POST /api/mentorships
router.post("/", protect, createMentorship);

// PUT /api/mentorships/:id/stage
router.put("/:id/stage", protect, progressStage);

// DELETE /api/mentorships/:id
router.delete("/:id", protect, deleteMentorship);

// DELETE /api/mentorships/:id/students/:studentId
router.delete("/:id/students/:studentId", protect, removeStudent);

module.exports = router;
