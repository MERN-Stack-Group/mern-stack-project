import React from "react";
import { MentorshipCard } from "./MentorshipCard";

export const MentorshipModel = ({ viewType = "completed" }) => {
  // Array 1: Active Mentorships
  const activeMentorships = [
    {
      id: "a1",
      programName: "Enterprise Architecture Mentorship",
      duration: "Jan 2026 - Present",
      status: "Active",
      menteeName: "Alex Johnson",
      menteeRole: "Junior Systems Analyst at MAS Holdings",
      introduction:
        "Focusing on transitioning from basic IT support to systems architecture, with an emphasis on scalable database design and operational workflows.",
    },
  ];

  // Array 2: Completed Mentorships
  const completedMentorships = [
    {
      id: "c1",
      programName: "Software Engineering Fundamentals",
      duration: "Jun 2025 - Dec 2025",
      status: "Completed",
      menteeName: "Samantha Lee",
      menteeRole: "CS Student at University of Colombo",
      introduction:
        "Guided the mentee through advanced data structures, OOP concepts in Java, and preparing them for technical internships.",
    },
    {
      id: "c2",
      programName: "Agile Project Management",
      duration: "Jan 2025 - May 2025",
      status: "Completed",
      menteeName: "David Perera",
      menteeRole: "Scrum Master Intern",
      introduction:
        "Covered sprint planning, backlog grooming, and effective communication strategies for bridging the gap between developers and stakeholders.",
    },
  ];

  // Determine which data and title to use based on the viewType prop
  const dataToRender =
    viewType === "active" ? activeMentorships : completedMentorships;
  const sectionTitle =
    viewType === "active" ? "Active Mentorships" : "Mentorship History";

  return (
    <div className="flex flex-col gap-4 w-full md:w-4/6 ml-0 md:ml-10 mt-5">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{sectionTitle}</h2>

      {/* Dynamically map through the selected array */}
      {dataToRender.map((mentorship) => (
        <MentorshipCard
          key={mentorship.id}
          programName={mentorship.programName}
          duration={mentorship.duration}
          status={mentorship.status}
          menteeName={mentorship.menteeName}
          menteeRole={mentorship.menteeRole}
          introduction={mentorship.introduction}
        />
      ))}

      {/* Fallback if the selected array is empty */}
      {dataToRender.length === 0 && (
        <p className="text-sm text-gray-500 italic">
          No mentorships found for this category.
        </p>
      )}
    </div>
  );
};
