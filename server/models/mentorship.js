const mongoose = require("mongoose");

const dateStruct = {
  month: {
    type: String,
    enum: [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ],
  },
  year: {
    type: Number,
    required: true,
    min: 2026, //the program lauched in 2026 so the oldest year is 2026
  },
};

const reviewStruct = {
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
};

const mentorshipSchema = new mongoose.Schema({
  alumni: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  stage: {
    type: String,
    required: true,
    enum: ["posted", "enrollment", "active", "completed"],
  },
  startDate: {
    dateStruct,
    required: true,
  },
  endDate: {
    dateStruct,
    required: true,
  },
  reviews: {
    type: [reviewStruct],
  },
});

module.exports = mongoose.model("Mentorship", mentorshipSchema);
