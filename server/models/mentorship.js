const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, trim: true, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now },
});

const mentorshipSchema = new mongoose.Schema(
  {
    alumni: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    stage: {
      type: String,
      required: true,
      enum: [ "enrollment", "active", "completed"],
      default: "enrollment",
    },
    durationInWeeks: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true },
);

// Mongoose Pre-Save Middleware
mentorshipSchema.pre("save", function (next) {
  if (this.isModified("stage")) {
    // If it changed to active, record the exact moment it started
    if (this.stage === "active" && !this.startDate) {
      this.startDate = Date.now();
    }

    // If it changed to completed, record the exact moment it ended
    if (this.stage === "completed" && !this.endDate) {
      this.endDate = Date.now();
    }
  }

  next();
});

module.exports = mongoose.model("Mentorship", mentorshipSchema);
