const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const {
  registerUser,
  loginUser,
  getMyProfile,
  getUserProfileById,
  updateUserProfile,
  updateProfileImage,
  getUsersByRole,
  getAlumniApprovals,
  approveAlumni,
  rejectAlumni,
  getAllUsersAdmin,
  deleteUserAdmin,
  suspendAlumni,
} = require("../controllers/userController");
const upload = require("../middleware/upload");

// Middleware that verifies JWT signatures and hydrates req.user
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: {
    message: "Too many login attempts, please try again after 15 minutes",
  },
});

router.post("/login", loginLimiter, loginUser);

// Personal profile routes (identity derived securely from JWT via 'protect' middleware)
router.get("/profile", protect, getMyProfile);
router.put("/profile", protect, updateUserProfile);

// Profile image upload (must be declared BEFORE /:userId to avoid param capture)
router.put(
  "/profile/image",
  protect,
  upload.single("profileImage"),
  updateProfileImage,
);

// Public profile retrieval (identity explicitly passed as a URL parameter)
router.get("/profile/:userId", protect, getUserProfileById);

router.get("/", protect, getUsersByRole);

// Admin Routes (Unprotected for local demo auth)
router.get("/admin/alumni", getAlumniApprovals);
router.put("/admin/approve/:id", approveAlumni);
router.put("/admin/reject/:id", rejectAlumni);

router.get("/admin/users", getAllUsersAdmin);
router.put("/admin/suspend/:id", suspendAlumni);
router.delete("/admin/delete/:id", deleteUserAdmin);

module.exports = router;
