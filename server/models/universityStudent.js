const mongoose = require("mongoose");

const universityStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  studentId: { type: String, required: true },
  faculty: { type: String, required: true },
  degree: { type: String, required: true },
  currentYear: { type: Number, required: true },
});

module.exports = mongoose.model("UniversityStudent", universityStudentSchema);
