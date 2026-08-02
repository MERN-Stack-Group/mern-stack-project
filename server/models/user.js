const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      required: false,
      default: "https://cdn-icons-png.flaticon.com/512/15339/15339256.png",
    },

    about: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      required: true,
      trim: true,
    },

    faculty: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    roles: [
      {
        type: String,
        required: true,
        enum: ["student", "alumni"],
      },
    ],
    //Only populated for student type user
    studentProfile: {
      StudentId: {
        type: String,
        unique: true,
        trim: true,
      },
      year: {
        type: Number,
      },
    },

    //only populated for alumni user type
    alumniProfile: {
      degree: {
        type: String,
        trim: true,
      },
      faculty: {
        type: String,
        trim: true,
      },
      employment: {
        jobTitle: {
          type: String,
          trim: true,
        },
        employer: {
          type: String,
          trim: true,
        },
        location: {
          type: String,
          trim: true,
        },
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
