const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
      required: true, // E.g., "MAS Holdings", "Brandix", or "Personal Project"
    },
    opportunityType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "freelance", "contract"],
      required: true,
    },
    location: {
      type: String,
      enum: ["on site", "remote", "hybrid"],
      required: true,
    },
    applicationEmail: {
      type: String,
      trim: true,
      lowercase: true,
      required: [
        true,
        "Please provide an email for students to send their CVs",
      ],
    },
    tags: {
      type: [String],
      validate: {
        validator: function (array) {
          return array && array.length > 0;
        },
        message: "You must provide at least one tag",
      },
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Opportunity", opportunitySchema);
