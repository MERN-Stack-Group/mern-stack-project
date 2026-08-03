const MentorshipRequest = require("../models/mentorshipRequest");
const Mentorship = require("../models/mentorship");

//Student action
// @desc    Send a mentorship request to a specific program
// @route   POST /api/mentorship-requests
// @access  Private
const createRequest = async (req, res) => {
  try {
    const { mentorshipId, message } = req.body;
    const requesterId = req.user._id;

    const mentorshipProgram = await Mentorship.findById(mentorshipId);

    if (!mentorshipProgram) {
      return res.status(404).json({ message: "Program not found" });
    }

    if (!["posted", "enrollment"].includes(mentorshipProgram.stage)) {
      return res.status(400).json({
        message: `Cannot apply. This program is currently ${mentorshipProgram.stage}`,
      });
    }

    if (mentorshipProgram.alumni.toString() === requesterId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot request to join your own program" });
    }

    if (mentorshipProgram.students.includes(requesterId)) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this program" });
    }

    const requestExists = await MentorshipRequest.findOne({
      requester: requesterId,
      mentorship: mentorshipId,
      status: "pending",
    });

    if (requestExists) {
      return res.status(400).json({
        message: "You already have a pending request for this program",
      });
    }

    const mentorshipRequest = await MentorshipRequest.create({
      requester: requesterId,
      mentorship: mentorshipId,
      message: message,
    });

    res.status(201).json(mentorshipRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Alumni action
// @desc    Accept a mentorship request
// @route   PUT /api/mentorship-requests/:id/accept
// @access  Private
const acceptRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const alumniId = req.user._id;

    const mentorshipRequest = await MentorshipRequest.findById(requestId);
    if (!mentorshipRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    const mentorshipProgram = await Mentorship.findById(
      mentorshipRequest.mentorship,
    );
    if (!mentorshipProgram) {
      return res
        .status(404)
        .json({ message: "Mentorship program no longer exists" });
    }

    if (mentorshipProgram.alumni.toString() !== alumniId.toString()) {
      return res.status(403).json({
        message: "Not authorized to manage requests for this program",
      });
    }

    if (mentorshipRequest.status !== "pending") {
      return res.status(400).json({
        message: `Cannot accept. This request is already ${mentorshipRequest.status}`,
      });
    }

    mentorshipRequest.status = "accepted";
    await mentorshipRequest.save();

    mentorshipProgram.students.push(mentorshipRequest.requester);
    await mentorshipProgram.save();

    res.json({
      message: "Student successfully accepted into the program",
      request: mentorshipRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pending requests for programs currently in enrollment
// @route   GET /api/mentorship-requests/pending
// @access  Private (Alumni only)
const getPendingRequests = async (req, res) => {
  try {
    const alumniId = req.user._id;

    // programs currently accepting students ('enrollment' stage)
    const activePrograms = await Mentorship.find({
      alumni: alumniId,
      stage: "enrollment",
    }).select("_id");

    // Extract the IDs
    const programIds = activePrograms.map((program) => program._id);

    // pending requests for those specific programs
    const pendingRequests = await MentorshipRequest.find({
      mentorship: { $in: programIds },
      status: "pending", // Hardcoded to only fetch actionable requests
    })
      .populate("requester", "name email profileImage degree")
      .populate("mentorship", "durationInWeeks");

    res.json(pendingRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reject a mentorship request
// @route   PUT /api/mentorship-requests/:id/reject
// @access  Private (Alumni only)
const rejectRequest = async (req, res) => {
    try {
        const requestId = req.params.id; 
        const alumniId = req.user._id; 

        const mentorshipRequest = await MentorshipRequest.findById(requestId);
        if (!mentorshipRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Find the associated program to verify ownership
        const mentorshipProgram = await Mentorship.findById(mentorshipRequest.mentorship);
        if (!mentorshipProgram) {
            return res.status(404).json({ message: 'Mentorship program no longer exists' });
        }

        // Check if the logged-in user is the alumni who created the program
        if (mentorshipProgram.alumni.toString() !== alumniId.toString()) {
            return res.status(403).json({ message: 'Not authorized to manage requests for this program' });
        }

        // Ensure we only reject pending requests
        if (mentorshipRequest.status !== 'pending') {
            return res.status(400).json({ 
                message: `Cannot reject. This request is already ${mentorshipRequest.status}` 
            });
        }

        // 5. Update and save the request
        mentorshipRequest.status = 'rejected';
        await mentorshipRequest.save(); 

        res.json({ 
            message: 'Student request has been rejected',
            request: mentorshipRequest 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    createRequest, 
    acceptRequest,
    getPendingRequests,
    rejectRequest 
};
