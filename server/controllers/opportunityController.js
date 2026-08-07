const Opportunity = require("../models/opportunity");

//helper
const filterUnapprovedAlumni = (items) => {
  return items.filter(item => {
    if (item.status === 'deleted') return true;
    const user = item.postedBy;
    if (user && user.role && user.role.includes('alumni')) {
      if (!user.alumniProfile || !user.alumniProfile.approved) {
        return false;
      }
    }
    return true;
  });
};

// @desc    Create a new opportunity
// @route   POST /api/opportunities
// @access  Private
const createOpportunity = async (req, res) => {
  try {
    const {
      title,
      description,
      companyName,
      opportunityType,
      location,
      applicationEmail,
      tags,
    } = req.body;

    if (
      !title ||
      !description ||
      !companyName ||
      !opportunityType ||
      !location ||
      !applicationEmail
    ) {
      return res
        .status(400)
        .json({ message: "Please add all required fields" });
    }

    const opportunity = await Opportunity.create({
      title,
      description,
      companyName,
      opportunityType,
      location,
      applicationEmail,
      tags,
      postedBy: req.user._id,
    });

    res.status(201).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all ACTIVE opportunities
// @route   GET /api/opportunities
// @access  Private/Public (Depending on your frontend needs, here it's Private)
const getActiveOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ status: "active" })
      .sort({ createdAt: -1 })
      .populate("postedBy", "name email role faculty alumniProfile");

    res.json(filterUnapprovedAlumni(opportunities));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get DELETED opportunities for the logged-in user
// @route   GET /api/opportunities/deleted
// @access  Private
const getDeletedOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({
      status: "deleted",
      postedBy: req.user._id,
    })
      .sort({ updatedAt: -1 })
      .populate("postedBy", "name");

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an opportunity
// @route   PUT /api/opportunities/:id
// @access  Private
const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Check ownership
    if (opportunity.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this opportunity" });
    }

    // Update the document.
    // { new: true } returns the updated document instead of the old one.
    // { runValidators: true } ensures the updated data still matches schema rules.
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.json(updatedOpportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Soft delete an opportunity
// @route   DELETE /api/opportunities/:id
// @access  Private
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Check ownership
    if (opportunity.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this opportunity" });
    }

    opportunity.status = "deleted";
    await opportunity.save();

    res.json({
      message: "Opportunity moved to deleted bin",
      id: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get an opportunity by ID
// @route   GET /api/opportunities/:id
// @access  Private
const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate(
      "postedBy",
      "name email profileImage faculty degree role alumniProfile"
    );

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    if (opportunity.status !== 'deleted') {
      const user = opportunity.postedBy;
      if (user && user.role && user.role.includes('alumni') && (!user.alumniProfile || !user.alumniProfile.approved)) {
        return res.status(404).json({ message: "Opportunity not found" });
      }
    }

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOpportunity,
  getActiveOpportunities,
  getDeletedOpportunities,
  updateOpportunity,
  deleteOpportunity,
  getOpportunityById,
};
