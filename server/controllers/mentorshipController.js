const Mentorship = require("../models/mentorship");

// @desc    Create a new mentorship program
// @route   POST /api/mentorships
// @access  Private (Alumni only)
const createMentorship = async (req, res) => {
  try {
    const { title, description, durationInWeeks } = req.body;

    if (!title || !description || !durationInWeeks) {
      return res
        .status(400)
        .json({ message: "Please provide title, description, and duration" });
    }

    const mentorship = await Mentorship.create({
      alumni: req.user._id,
      title,
      description,
      durationInWeeks,
      stage: "enrollment",
    });

    res.status(201).json(mentorship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a mentorship program (Only if in 'enrollment' stage)
// @route   DELETE /api/mentorships/:id
// @access  Private (Alumni only)
const deleteMentorship = async (req, res) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id);

    if (!mentorship) {
      return res.status(404).json({ message: "Mentorship not found" });
    }

    // Verify Ownership
    if (mentorship.alumni.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this program" });
    }

    // STAGE CHECK: Prevent deletion if already active or completed
    if (mentorship.stage !== "enrollment") {
      return res.status(400).json({
        message: `Cannot delete program. It is currently in the '${mentorship.stage}' stage.`,
      });
    }

    await mentorship.deleteOne();
    res.json({ message: "Mentorship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Progress or update the mentorship stage
// @route   PUT /api/mentorships/:id/stage
// @access  Private (Alumni only)
const progressStage = async (req, res) => {
  try {
    const { stage } = req.body; // Expecting "active" or "completed" from frontend
    const validStages = ["enrollment", "active", "completed"];

    if (!validStages.includes(stage)) {
      return res.status(400).json({ message: "Invalid stage provided" });
    }

    const mentorship = await Mentorship.findById(req.params.id);

    if (!mentorship) {
      return res.status(404).json({ message: "Mentorship not found" });
    }

    if (mentorship.alumni.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update stage. .save() triggers the dates logic in your model.
    mentorship.stage = stage;
    await mentorship.save();

    res.json({ message: `Program progressed to ${stage}`, mentorship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove a specific student from the mentorship
// @route   DELETE /api/mentorships/:id/students/:studentId
// @access  Private (Alumni only)
const removeStudent = async (req, res) => {
  try {
    const { id, studentId } = req.params;

    const mentorship = await Mentorship.findById(id);

    if (!mentorship) {
      return res.status(404).json({ message: "Mentorship not found" });
    }

    if (mentorship.alumni.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Check if student is actually in the array
    if (!mentorship.students.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student is not enrolled in this program" });
    }

    // Use Mongoose's .pull() array method to remove the ID
    mentorship.students.pull(studentId);
    await mentorship.save();

    res.json({ message: "Student removed from the program successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get mentorships by stage
// @route   GET /api/mentroships/:stage
// @access  Private
const getMentorshipsByStage = async (req, res) => {
  try {
    const { stage } = req.query;

    let mentorships;

    if (stage) {
      mentorships = await Mentorship.find({
        stage: stage,
      }).populate("alumni", "name email role faculty");
    } else {
      mentorships = await Mentorship.find().populate(
        "alumni",
        "name email role faculty",
      );
    }

    res.json(mentorships);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get any mentorship by ID
// @route   GET /api/mentorships/:mentorshipId
// @access  Private
const getMentorshipById = async (req, res) => {
  try {
    const mentorship = await Mentorship.findById(req.params.id).populate(
      "alumni",
      "name email profileImage faculty degree"
    );

    if (!mentorship) {
      return res.status(404).json({
        message: "Mentorship not found",
      });
    }

    res.json(mentorship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get mentorships by alumni
// @route   GET /api/mentorships/alumni/my-programs
// @access  Private
const getAlumniMentorships = async (req, res) => {
  try {
    const mentorships = await Mentorship.find({
      alumni: req.user._id,
    })
      .populate("alumni", "name email role faculty")
      .populate("students", "name profileImage faculty degree");

    res.json(mentorships);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get mentorships for a specific user (alumni or student)
// @route   GET /api/mentorships/user/:userId
// @access  Private
const getUserMentorships = async (req, res) => {
  try {
    const userId = req.params.userId;
    const mentorships = await Mentorship.find({
      $or: [{ alumni: userId }, { students: userId }],
    })
      .populate("alumni", "name email profileImage faculty role")
      .populate("students", "name profileImage faculty degree role");

    res.json(mentorships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMentorship,
  deleteMentorship,
  progressStage,
  removeStudent,
  getMentorshipsByStage,
  getMentorshipById,
  getAlumniMentorships,
  getUserMentorships,
};
