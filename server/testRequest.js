const mongoose = require("mongoose");
const MentorshipRequest = require("./models/mentorshipRequest");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const request = await MentorshipRequest.create({
      requester: new mongoose.Types.ObjectId("6a70bcf1fe56189d97ee410f"),
      mentorship: new mongoose.Types.ObjectId("6a71ae4395bc0b42183fbc27"),
      status: "pending",
      message:
        "I am interested in joining this cybersecurity mentorship program and would like to improve my knowledge of networking, security concepts, and ethical hacking.",
    });

    console.log(request);
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
