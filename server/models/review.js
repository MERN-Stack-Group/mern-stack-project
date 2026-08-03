const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    student: {
      type: mongoose.Schema.ObjectId,
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
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Review", reviewSchema);