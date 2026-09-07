const dotenv = require("dotenv");

// Load env variables FIRST — before any other module reads process.env
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const rateLimit = require("express-rate-limit");

// --- ROUTE IMPORTS ---
const opportunityRoutes = require("./routes/opportunityRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const mentorshipRoutes = require("./routes/mentorshipRoutes");
const mentorshipRequestRoutes = require("./routes/mentorshipRequestRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// --- RATE LIMITING SETUP ---
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //Time window: 15 minutes
  max: 1000, //Limit each IP to 100 requests per windowMs
  message: {
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// This protects the endpoints from brute-force and DoS attacks
app.use("/api", globalLimiter);

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
