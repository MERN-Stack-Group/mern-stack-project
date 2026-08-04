const dotenv = require("dotenv");

// Load env variables FIRST — before any other module reads process.env
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// --- 1. ROUTE IMPORTS ---
const opportunityRoutes = require("./routes/opportunityRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const mentorshipRoutes = require("./routes/mentorshipRoutes");
const mentorshipRequestRoutes = require("./routes/mentorshipRequestRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

app.use("/api/opportunities", opportunityRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/mentorships", mentorshipRoutes);
app.use("/api/mentorship-requests", mentorshipRequestRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
