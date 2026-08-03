const User = require("../models/user");
const UniversityStudent = require("../models/universityStudent"); //used to check official records of the university
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, alumniProfile } = req.body;

    let faculty = req.body.faculty;
    let degree = req.body.degree;
    let studentProfile = req.body.studentProfile;

    // Check if user already exists in the app
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // UNIVERSITY VERIFICATION LOGIC
    if (role && role.includes("student")) {
      // Search the official university database using the provided email
      const uniRecord = await UniversityStudent.findOne({ email });

      if (!uniRecord) {
        return res.status(403).json({
          message:
            "University email not found in official records. Registration denied.",
        });
      }

      // Override the details with the trusted university data
      faculty = uniRecord.faculty;
      degree = uniRecord.degree;
      studentProfile = {
        StudentId: uniRecord.studentId,
        year: uniRecord.currentYear,
      };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user (using the potentially overridden data)
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

    // Generate JWT
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
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Find user by email
    const user = await User.findOne({ email });

    // Check user and compare hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's profile
// @route   GET /api/users/profile
// @access  Private (Requires token)
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
    const userId = req.params.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
        //Find the user by the ID embedded in the JWT token
        const user = await User.findById(req.user._id);

        if (user) {
            // Update fields ONLY if they were provided in the request
            user.name = req.body.name || user.name;
            user.profileImage = req.body.profileImage || user.profileImage;
            user.about = req.body.about || user.about;
            user.tags = req.body.tags || user.tags;

            // Handle nested objects safely
            if (req.body.alumniProfile) {
                user.alumniProfile = {
                    ...user.alumniProfile, 
                    ...req.body.alumniProfile 
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
                alumniProfile: updatedUser.alumniProfile
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getMyProfile, getUserProfileById };
