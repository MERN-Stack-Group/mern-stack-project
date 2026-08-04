const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    mentorship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentorship",
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }, 
);

// Prevent a student from leaving multiple reviews for the exact same program
reviewSchema.index({ mentorship: 1, reviewer: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
