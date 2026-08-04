import React, { useState, useEffect } from "react";
import IncomingRequestsTable from "../components/IncomingRequestsTable";
import MentorshipProgramCard from "../components/MentorshipProgramCard";
import CompletedProgramCard from "../components/CompletedProgramCard";
import CreatePostForm from "../components/CreatePostForm";
import ReviewCard from "../components/ReviewCard"; // <-- Make sure you have this file created
import { useAuth } from "../hooks/AuthContext";
import { getMyMentorships, progressMentorshipStage, deleteMentorship, createMentorship } from "../api/mentorshipApi";

// Helper component for the Opportunities section
const OpportunityCard = ({ opp, onDelete }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow mb-4">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{opp.title}</h3>
        <p className="text-xs text-gray-500 mt-1">Date: {opp.date}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            opp.status === "posted"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "bg-gray-100 text-gray-600 border border-gray-200"
          }`}
        >
          {opp.status}
        </span>
        {opp.status === "posted" && (
          <button
            onClick={() => onDelete(opp.id)}
            className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors"
          >
            Remove Posting
          </button>
        )}
      </div>
    </div>
    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border border-gray-100">
      {opp.description}
    </p>
  </div>
);

function MentorDashboard({
  mainTab = "mentorship",
  mentorSub = "requests",
  oppSub = "active",
}) {
  const { user, token } = useAuth();

  // STATE: Main Navigation
  const [activeMainTab, setActiveMainTab] = useState(mainTab); //mentorship,opportunities
  const [mentorSubTab, setMentorSubTab] = useState(mentorSub); //active,history,requests,reviews
  const [oppSubTab, setOppSubTab] = useState(oppSub); //active,history

  // STATE: Form Toggles
  const [showAddMentorship, setShowAddMentorship] = useState(false);
  const [showAddOpportunity, setShowAddOpportunity] = useState(false);

  //  STATE: Data
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Maya Lin",
      program: "Computer Science",
      topic: "React Development",
      message: "I need guidance on scalable React.",
      date: "2 hours ago",
    },
  ]);

  const [activePrograms, setActivePrograms] = useState([]);

  const [completedPrograms, setCompletedPrograms] = useState([
    {
      id: 201,
      title: "Agile Project Management",
      duration: "Spring 2025 - Fall 2025",
      mentees: [{ name: "David Perera", program: "Software Engineering" }],
      reviews: [
        { author: "David Perera", rating: 5, description: "Fantastic mentor!" },
      ],
    },
  ]);

  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: "Frontend Developer Mentorship Fall 2026",
      status: "posted",
      date: "Aug 01, 2026",
      description:
        "Looking for 2 students passionate about Next.js and Tailwind CSS. Weekly 1-hour code review sessions.",
    },
    {
      id: 2,
      title: "Backend Architecture 101",
      status: "deleted",
      date: "Jan 15, 2026",
      description: "Focus on Node.js and Microservices design patterns.",
    },
  ]);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!token) return;
      try {
        const myPrograms = await getMyMentorships(token);

        const myActive = myPrograms
          .filter((m) => m.stage === "enrollment" || m.stage === "active")
          .map((m) => ({
            id: m._id,
            title: m.title,
            duration: `${m.durationInWeeks} Weeks`,
            status: m.stage === "enrollment" ? "Enrollment" : "Active",
            step: m.stage === "enrollment" ? 0 : 1,
            savedStep: m.stage === "enrollment" ? 0 : 1,
            mentees: (m.students || []).map((s) => ({
              name: s.name || s,
              program: "Student",
              message: "",
            })),
            removedMentees: [],
          }));

        const myCompleted = myPrograms
          .filter((m) => m.stage === "completed")
          .map((m) => ({
            id: m._id,
            title: m.title,
            duration: `${m.durationInWeeks} Weeks`,
            mentees: (m.students || []).map((s) => ({
              name: s.name || s,
              program: "Student",
            })),
            reviews: [], // placeholder until reviews are fetched
          }));

        setActivePrograms(myActive);
        setCompletedPrograms(myCompleted);
      } catch (err) {
        console.error("Failed to fetch mentorships:", err);
      }
    };
    fetchPrograms();
  }, [token]);

  // DERIVED STATE: Extract all reviews from completed programs
  const allReviews = completedPrograms.flatMap(
    (program) =>
      program.reviews?.map((review) => ({
        ...review,
        programTitle: program.title,
        duration: program.duration,
      })) || [],
  );

  // HANDLERS: Creation & Saving
  const handleCreateMentorship = async (data) => {
    if (!token) return;
    try {
      const created = await createMentorship(
        {
          title: data.title,
          description: data.description,
          durationInWeeks: Number(data.durationInWeeks),
        },
        token
      );

      const newProgram = {
        id: created._id,
        title: created.title,
        duration: `${created.durationInWeeks} Weeks`,
        status: "Enrollment",
        step: 0,
        savedStep: 0,
        mentees: [],
        removedMentees: [],
      };
      setActivePrograms([newProgram, ...activePrograms]);
      setShowAddMentorship(false);
    } catch (err) {
      console.error("Failed to create mentorship:", err);
      alert(err.message || "Failed to create program");
    }
  };

  const handleCreateOpportunity = (data) => {
    const newOpp = {
      id: Date.now(),
      title: data.title,
      date: data.duration,
      description: data.description,
      status: "posted",
    };
    setOpportunities([newOpp, ...opportunities]);
    setShowAddOpportunity(false);
  };

  // Save progress (both active and completed)
  const handleSaveProgress = async (programId, newStep) => {
    try {
      const stageName = newStep === 1 ? "active" : newStep === 2 ? "completed" : "enrollment";
      if (token) {
        await progressMentorshipStage(programId, stageName, token);
      }
      const programToSave = activePrograms.find((p) => p.id === programId);
      if (!programToSave) return;
  
      if (newStep === 2) {
        const formattedCompletedProgram = {
          id: programToSave.id,
          title: programToSave.title,
          duration: programToSave.duration,
          mentees: programToSave.mentees,
          reviews: [], 
        };
        setCompletedPrograms([formattedCompletedProgram, ...completedPrograms]);
        setActivePrograms(activePrograms.filter((p) => p.id !== programId));
      } else {
        setActivePrograms((prev) =>
          prev.map((p) => (p.id === programId ? { ...p, savedStep: newStep } : p))
        );
      }
    } catch (err) {
      console.error("Failed to save program:", err);
      alert(err.message || "Failed to save program");
    }
  };

  const handleDeleteProgram = async (programId) => {
    try {
      if (token) {
        await deleteMentorship(programId, token);
      }
      setActivePrograms(activePrograms.filter((p) => p.id !== programId));
    } catch (err) {
      console.error("Failed to delete program:", err);
      alert(err.message || "Failed to delete program");
    }
  };

  const handleDeleteOpportunity = (id) => {
    setOpportunities(
      opportunities.map((opp) =>
        opp.id === id ? { ...opp, status: "deleted" } : opp,
      ),
    );
  };

  // HANDLERS: Requests & Active Program Updates
  const handleAccept = (request) => {
    setActivePrograms((prev) => {
      const idx = prev.findIndex((p) => p.title === request.topic);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx].mentees.push({
          name: request.name,
          program: request.program,
          message: request.message,
        });
        return updated;
      }
      return [
        {
          id: Date.now(),
          title: request.topic,
          duration: "Newly Created",
          status: "Enrollment",
          step: 1,
          mentees: [
            {
              name: request.name,
              program: request.program,
              message: request.message,
            },
          ],
          removedMentees: [],
        },
        ...prev,
      ];
    });
    setRequests(requests.filter((item) => item.id !== request.id));
    setMentorSubTab("active");
  };

  const handleUpdateStep = (programId, increment) => {
    setActivePrograms((prev) =>
      prev.map((p) => {
        if (p.id === programId) {
          const newStep = Math.max(0, Math.min(3, p.step + increment));
          let newStatus = p.status;
          if (newStep === 0) newStatus = "Enrollment";
          if (newStep === 1) newStatus = "Active";
          if (newStep === 2) newStatus = "Completed";
          return { ...p, step: newStep, status: newStatus };
        }
        return p;
      }),
    );
  };

  const handleRemoveStudent = (programId, studentIndex) => {
    setActivePrograms((prev) =>
      prev.map((p) => {
        if (p.id === programId) {
          const studentToRemove = p.mentees[studentIndex];
          return {
            ...p,
            mentees: p.mentees.filter((_, idx) => idx !== studentIndex),
            removedMentees: [...(p.removedMentees || []), studentToRemove],
          };
        }
        return p;
      }),
    );
  };

  const handleUndoRemove = (programId) => {
    setActivePrograms((prev) =>
      prev.map((p) => {
        if (p.id === programId && p.removedMentees?.length > 0) {
          const lastRemoved = p.removedMentees[p.removedMentees.length - 1];
          return {
            ...p,
            mentees: [...p.mentees, lastRemoved],
            removedMentees: p.removedMentees.slice(0, -1),
          };
        }
        return p;
      }),
    );
  };

  // RENDERERS
  const renderMentorshipSection = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 min-h-[500px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 mb-6">
        <div className="flex gap-6 overflow-x-auto">
          {["requests", "active", "history", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMentorSubTab(tab)}
              className={`pb-3 font-semibold text-sm capitalize transition-colors whitespace-nowrap ${
                mentorSubTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab === "requests"
                ? `Requests (${requests.length})`
                : tab === "active"
                  ? "Active Programs"
                  : tab === "reviews"
                    ? "All Reviews"
                    : "History"}
            </button>
          ))}
        </div>
        {/* Add Post Button - Only show on Active tab */}
        {mentorSubTab === "active" && !showAddMentorship && (
          <button
            onClick={() => setShowAddMentorship(true)}
            className="mb-3 sm:mb-0 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
          >
            + Create Program
          </button>
        )}
      </div>

      {mentorSubTab === "active" && showAddMentorship && (
        <CreatePostForm
          type="mentorship"
          onSubmit={handleCreateMentorship}
          onCancel={() => setShowAddMentorship(false)}
        />
      )}

      {mentorSubTab === "requests" && (
        <div className="animate-fadeIn">
          <IncomingRequestsTable
            requests={requests}
            onAccept={handleAccept}
            onReject={(id) => setRequests(requests.filter((r) => r.id !== id))}
          />
        </div>
      )}

      {mentorSubTab === "active" && (

<div className="animate-fadeIn space-y-6">
          {activePrograms.length === 0 && !showAddMentorship ? (
            <p className="text-gray-500 italic">
              No active mentorship programs right now.
            </p>
          ) : (
            activePrograms.map((program) => (
              <MentorshipProgramCard
                key={program.id}
                program={program}
                onNextStep={() => handleUpdateStep(program.id, 1)}
                onPrevStep={() => handleUpdateStep(program.id, -1)}
                onRemoveStudent={(idx) => handleRemoveStudent(program.id, idx)}
                onUndoRemove={() => handleUndoRemove(program.id)}
                onSave={(step) => handleSaveProgress(program.id, step)}
                onDelete={handleDeleteProgram}
              />
            ))
          )}
        </div>
      )}

      {mentorSubTab === "history" && (
        <div className="animate-fadeIn space-y-6">
          {completedPrograms.length === 0 ? (
            <p className="text-gray-500 italic">
              You have no completed mentorship programs yet.
            </p>
          ) : (
            completedPrograms.map((program) => (
              <CompletedProgramCard key={program.id} {...program} />
            ))
          )}
        </div>
      )}

      {/* NEW: Reviews Sub-Tab Content */}
      {mentorSubTab === "reviews" && (
        <div className="animate-fadeIn">
          {allReviews.length === 0 ? (
            <p className="text-gray-500 italic">
              No reviews have been submitted for your programs yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allReviews.map((review, idx) => (
                <ReviewCard
                  key={idx}
                  studentName={review.author}
                  programTitle={review.programTitle}
                  duration={review.duration}
                  rating={review.rating}
                  description={review.description}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderOpportunitySection = () => {
    const posted = opportunities.filter((opp) => opp.status === "posted");
    const archived = opportunities.filter((opp) => opp.status === "deleted");

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 min-h-[500px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 mb-6">
          <div className="flex gap-6 overflow-x-auto">
            <button
              onClick={() => setOppSubTab("active")}
              className={`pb-3 font-semibold text-sm transition-colors whitespace-nowrap ${
                oppSubTab === "active"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Active Postings
            </button>
            <button
              onClick={() => setOppSubTab("history")}
              className={`pb-3 font-semibold text-sm transition-colors whitespace-nowrap ${
                oppSubTab === "history"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Archived/Deleted
            </button>
          </div>
          {/* Add Opportunity Button */}
          {oppSubTab === "active" && !showAddOpportunity && (
            <button
              onClick={() => setShowAddOpportunity(true)}
              className="mb-3 sm:mb-0 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
            >
              + Post Opportunity
            </button>
          )}
        </div>

        {oppSubTab === "active" && showAddOpportunity && (
          <CreatePostForm
            type="opportunity"
            onSubmit={handleCreateOpportunity}
            onCancel={() => setShowAddOpportunity(false)}
          />
        )}

        {oppSubTab === "active" && (
          <div className="animate-fadeIn space-y-4">
            {posted.length === 0 && !showAddOpportunity ? (
              <p className="text-gray-500 italic">
                No active opportunities posted.
              </p>
            ) : (
              posted.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opp={opp}
                  onDelete={handleDeleteOpportunity}
                />
              ))
            )}
          </div>
        )}

        {oppSubTab === "history" && (
          <div className="animate-fadeIn space-y-4">
            {archived.length === 0 ? (
              <p className="text-gray-500 italic">No deleted opportunities.</p>
            ) : (
              archived.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opp={opp}
                  onDelete={handleDeleteOpportunity}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Mentor Dashboard
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Manage incoming requests, track active sessions, and oversee your
            postings.
          </p>
        </div>
      </div>

      <div className="flex space-x-1 bg-gray-200/70 p-1 rounded-lg w-max mb-2">
        <button
          onClick={() => setActiveMainTab("mentorship")}
          className={`px-6 py-2.5 text-sm font-semibold rounded-md transition-all ${
            activeMainTab === "mentorship"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-300/50"
          }`}
        >
          Mentorship Management
        </button>
        <button
          onClick={() => setActiveMainTab("opportunities")}
          className={`px-6 py-2.5 text-sm font-semibold rounded-md transition-all ${
            activeMainTab === "opportunities"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-300/50"
          }`}
        >
          Opportunity Management
        </button>
      </div>

      {activeMainTab === "mentorship"
        ? renderMentorshipSection()
        : renderOpportunitySection()}
    </div>
  );
}

export default MentorDashboard;
