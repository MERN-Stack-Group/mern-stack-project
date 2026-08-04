const mongoose = require("mongoose");

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
      enum: ["enrollment", "active", "completed"],
      default: "enrollment",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
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
  },
  { timestamps: true },
);

// Mongoose Pre-Save Middleware
mentorshipSchema.pre("save", function () {
  if (this.isModified("stage")) {
    if (this.stage === "active" && !this.startDate) {
      this.startDate = Date.now();
    }
    if (this.stage === "completed" && !this.endDate) {
      this.endDate = Date.now();
    }
  }
});

module.exports = mongoose.model("Mentorship", mentorshipSchema);
