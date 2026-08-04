const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMyProfile,
  getUserProfileById,
  updateUserProfile,
  updateProfileImage,
  getUsersByRole,
} = require("../controllers/userController");
const upload = require("../middleware/upload");

// Middleware that verifies JWT signatures and hydrates req.user
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

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

module.exports = router;
