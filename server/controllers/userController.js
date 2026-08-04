const User = require("../models/user");
const UniversityStudent = require("../models/universityStudent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc    Register a new user (Student or Alumni)
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { email, password, role, alumniProfile } = req.body;

    let name = req.body.name;
    let faculty = req.body.faculty;
    let degree = req.body.degree;
    let studentProfile = req.body.studentProfile;

    // Prevent duplicate registrations
    const userExists = await User.findOne({ email });
    console.log("Checking email:", email);
    console.log("Found user:", userExists);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // STUDENT ROLE VALIDATION
    // Students are verified against official university records
    if (role && role.includes("student")) {
      const uniRecord = await UniversityStudent.findOne({ email });

      if (!uniRecord) {
        return res.status(403).json({
          message:
            "University email not found in official records. Registration denied.",
        });
      }

      // Use official university data instead of user input
      name = uniRecord.name;
      faculty = uniRecord.faculty;
      degree = uniRecord.degree;

      studentProfile = {
        StudentId: uniRecord.studentId,
        year: uniRecord.currentYear,
      };
    }

    // Alumni verification is handled manually.
    // No automated database verification is performed.

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      faculty,
      degree,
      role,
      studentProfile,
      alumniProfile,
    });

    console.log("Saved user:", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      faculty: user.faculty,
      degree: user.degree,
      role: user.role,
      studentProfile: user.studentProfile,
      alumniProfile: user.alumniProfile,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's profile
// @route   GET /api/users/profile
// @access  Private
const getMyProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get any user's profile by ID
// @route   GET /api/users/profile/:userId
// @access  Private
const getUserProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;
    user.profileImage = req.body.profileImage || user.profileImage;
    user.about = req.body.about || user.about;
    user.tags = req.body.tags || user.tags;

    if (req.body.alumniProfile) {
      user.alumniProfile = {
        ...user.alumniProfile,
        ...req.body.alumniProfile,
      };
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      about: updatedUser.about,
      tags: updatedUser.tags,
      alumniProfile: updatedUser.alumniProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.profileImage = req.file.path;

    await user.save();

    res.json({
      message: "Profile image updated",
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMyProfile,
  getUserProfileById,
  updateUserProfile,
  updateProfileImage,
};
