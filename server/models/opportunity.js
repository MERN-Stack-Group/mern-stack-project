const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
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

  location: {
    type: String,
    enum: ["on site", "remote", "hybrid"],
    required: true,
  },

  tags: {
    type: [String],
    required: true,
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
