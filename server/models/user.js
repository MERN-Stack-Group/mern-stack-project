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
      trim: true,
    },

    tags: {
      type: [String],
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

    role: [
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
        sparse:true,
        trim: true,
      },
      year: {
        type: Number,
      },
    },

    //only populated for alumni user type
    alumniProfile: {
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
