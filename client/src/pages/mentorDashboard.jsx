import { useState } from "react";
import IncomingRequests from "../components/IncomingRequests";
import MentorshipCard from "../components/MentorshipCard";
import ProgressTracker from "../components/ProgressTracker";
import { MentorshipModel } from "../components/MentorshipModel";
import TagCard from "../components/TagCard";

function MentorDashboard() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Maya Lin",
      program: "Computer Science",
      topic: "React Development",
      message:
        "I need guidance on building scalable React applications and preparing for internships.",
      date: "2 hours ago",
    },
    {
      id: 2,
      name: "Alex Perera",
      program: "Software Engineering",
      topic: "Career Guidance",
      message:
        "Looking for advice on CV preparation and interview techniques.",
      date: "Yesterday",
    },
  ]);

  const [mentorships, setMentorships] = useState([
    {
      id: 101,
      mentee: "Daniel Silva",
      program: "Computer Science",
      topic: "React Development",
      mentor: "Sarah Jenkins",
      status: "Active",
    },
    {
      id: 102,
      mentee: "Emma Wilson",
      program: "Information Technology",
      topic: "UI/UX Design",
      mentor: "Sarah Jenkins",
      status: "Accepted",
    },
    {
      id: 103,
      mentee: "Kevin Fernando",
      program: "Software Engineering",
      topic: "Career Guidance",
      mentor: "Sarah Jenkins",
      status: "Completed",
    },
  ]);

  const handleAccept = (request) => {
    const newMentorship = {
      id: Date.now(),
      mentee: request.name,
      mentor: "Sarah Jenkins",
      topic: request.topic,
      program: request.program,
      status: "Accepted",
    };

    setMentorships([...mentorships, newMentorship]);

    setRequests(
      requests.filter((item) => item.id !== request.id)
    );
  };

  const handleReject = (id) => {
    setRequests(
      requests.filter((item) => item.id !== id)
    );
  };

  const updateStatus = (id, status) => {
    setMentorships(
      mentorships.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );
  };

 return (
  <div className="dashboard-container">

    <div className="dashboard-header">

      <h1>Mentorship Dashboard</h1>

      <p>
        Track mentorship requests and manage your active mentorships.
      </p>

    </div>


    {/* Incoming Requests */}
    <section className="dashboard-section">

      <div className="section-title">

        <h2>Incoming Requests</h2>

        <span>{requests.length}</span>

      </div>

      {requests.length === 0 ? (
        <div className="empty-box">
          No pending mentorship requests.
        </div>
      ) : (
        requests.map((request) => (
          <IncomingRequests
            key={request.id}
            request={request}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ))
      )}

    </section>


    {/* Active Mentorships */}
    <section className="dashboard-section">

      <div className="section-title">

        <h2>Your Active Mentorships</h2>

        <span>{mentorships.length}</span>

      </div>

      <ProgressTracker />

      {mentorships.map((mentorship) => (
  <MentorshipCard
    key={mentorship.id}
    programName={mentorship.program}
    duration="2026 - Present"
    status={mentorship.status}
    menteeName={mentorship.mentee}
    menteeRole={mentorship.program}
    introduction={`Mentorship topic: ${mentorship.topic}. Mentor: ${mentorship.mentor}`}
  />
))}

    </section>


    {/* Add these below Active Mentorships */}

    <section className="dashboard-section">

      <MentorshipModel viewType="completed" />

    </section>


    <section className="dashboard-section">

      <TagCard
        topic="Mentor Skills"
        skills={[
          "React",
          "Java",
          "Python",
          "MongoDB",
          "System Design"
        ]}
      />

    </section>


  </div>
);
}

export default MentorDashboard;