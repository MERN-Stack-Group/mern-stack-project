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
    
    // Sub-document for active student metrics. Null/empty for alumni-only accounts.
    studentProfile: {
      StudentId: {
        type: String,
        unique: true,
        // Sparse index allows multiple alumni to have an undefined StudentId 
        // without violating the unique constraint.
        sparse: true,
        trim: true,
      },
      year: {
        type: Number,
      },
    },

    // Sub-document for post-graduate networking. Null/empty for student-only accounts.
    alumniProfile: {
      NIC: {
        type: String,
        unique: true,
        // Sparse is critical here. It permits student accounts to exist 
        // without an NIC while still enforcing uniqueness among actual alumni.
        sparse: true, 
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