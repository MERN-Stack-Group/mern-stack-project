import React, { useState, useEffect } from "react";
import IncomingRequestsTable from "../components/IncomingRequestsTable";
import MentorshipProgramCard from "../components/MentorshipProgramCard";
import CompletedProgramCard from "../components/CompletedProgramCard";
import CreatePostForm from "../components/CreatePostForm";
import ReviewCard from "../components/ReviewCard"; // <-- Make sure you have this file created
import { useAuth } from "../hooks/AuthContext";
import { getMyMentorships, progressMentorshipStage, deleteMentorship, createMentorship, removeStudentFromMentorship } from "../api/mentorshipApi";
import { getPendingRequests, acceptRequest, rejectRequest } from "../api/mentorshipRequestApi";
import { getMentorReviews } from "../api/reviewApi";
import { getActiveOpportunities, getDeletedOpportunities, deleteOpportunity, createOpportunity } from "../api/opportunityApi";

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
            onClick={() => {
              if (window.confirm("Are you sure you want to remove this opportunity?")) {
                onDelete(opp.id);
              }
            }}
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
  const [requests, setRequests] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

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

  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
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
              id: s._id || s,
              name: s.name || s,
              program: s.degree || "Student",
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
              id: s._id || s,
              name: s.name || s,
              program: s.degree || "Student",
            })),
            reviews: [], // placeholder until reviews are fetched
          }));

        setActivePrograms(myActive);
        setCompletedPrograms(myCompleted);

        const pendingReqs = await getPendingRequests(token);
        const mappedRequests = pendingReqs.map(r => ({
          id: r._id,
          mentorshipId: r.mentorship?._id,
          requesterId: r.requester?._id,
          name: r.requester?.name || "Student",
          program: r.requester?.degree || "Student",
          topic: r.mentorship?.title || "Program",
          message: r.message || "",
          date: new Date(r.createdAt).toLocaleDateString(),
        }));
        setRequests(mappedRequests);

        if (user?._id) {
          const fetchedReviews = await getMentorReviews(user._id, token);
          setAllReviews(fetchedReviews);
          
          // Fetch opportunities
          const activeOpps = await getActiveOpportunities(token);
          const myActiveOpps = activeOpps.filter(
            (opp) => opp.postedBy?._id === user._id || opp.postedBy === user._id
          );
          const deletedOpps = await getDeletedOpportunities(token);
          
          const mappedActiveOpps = myActiveOpps.map((opp) => ({
            id: opp._id,
            title: opp.title,
            status: "posted",
            date: new Date(opp.createdAt).toLocaleDateString(),
            description: opp.description,
          }));
          
          const mappedDeletedOpps = deletedOpps.map((opp) => ({
            id: opp._id,
            title: opp.title,
            status: "deleted",
            date: new Date(opp.createdAt).toLocaleDateString(),
            description: opp.description,
          }));
          
          setOpportunities([...mappedActiveOpps, ...mappedDeletedOpps]);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, [token, user]);

  // Removed derived allReviews

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

  const handleCreateOpportunity = async (data) => {
    if (!token) return;
    try {
      const created = await createOpportunity(
        {
          title: data.title,
          description: data.description,
          companyName: data.companyName,
          opportunityType: data.opportunityType,
          location: data.location,
          applicationEmail: data.applicationEmail,
          tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
        },
        token
      );
      
      const newOpp = {
        id: created._id,
        title: created.title,
        status: "posted",
        date: new Date(created.createdAt).toLocaleDateString(),
        description: created.description,
      };
      setOpportunities([newOpp, ...opportunities]);
      setShowAddOpportunity(false);
    } catch (err) {
      console.error("Failed to post opportunity:", err);
      alert(err.message || "Failed to post opportunity");
    }
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

  const handleDeleteOpportunity = async (id) => {
    if (!token) return;
    try {
      await deleteOpportunity(id, token);
      setOpportunities(
        opportunities.map((opp) =>
          opp.id === id ? { ...opp, status: "deleted" } : opp,
        ),
      );
    } catch (err) {
      console.error("Failed to delete opportunity:", err);
      alert(err.message || "Failed to delete opportunity");
    }
  };

  // HANDLERS: Requests & Active Program Updates
  const handleAccept = async (request) => {
    if (!token) return;
    try {
      await acceptRequest(request.id, token);
      
      setActivePrograms((prev) => {
        const idx = prev.findIndex((p) => p.id === request.mentorshipId);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            mentees: [
              ...updated[idx].mentees,
              {
                id: request.requesterId,
                name: request.name,
                program: request.program,
                message: request.message,
              }
            ]
          };
          return updated;
        }
        return prev;
      });
      setRequests(requests.filter((item) => item.id !== request.id));
      setMentorSubTab("active");
    } catch (err) {
      console.error("Failed to accept request", err);
      alert(err.message || "Failed to accept request");
    }
  };

  const handleReject = async (id) => {
    if (!token) return;
    try {
      await rejectRequest(id, token);
      setRequests(requests.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Failed to reject request", err);
      alert(err.message || "Failed to reject request");
    }
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

  const handleRemoveStudent = async (programId, studentIndex) => {
    const program = activePrograms.find((p) => p.id === programId);
    if (!program || !token) return;

    const studentToRemove = program.mentees[studentIndex];
    if (!studentToRemove) return;

    try {
      if (studentToRemove.id) {
        await removeStudentFromMentorship(programId, studentToRemove.id, token);
      }
      
      setActivePrograms((prev) =>
        prev.map((p) => {
          if (p.id === programId) {
            return {
              ...p,
              mentees: p.mentees.filter((_, idx) => idx !== studentIndex),
              removedMentees: [...(p.removedMentees || []), studentToRemove],
            };
          }
          return p;
        }),
      );
    } catch (err) {
      console.error("Failed to remove student", err);
      alert(err.message || "Failed to remove student from program");
    }
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
            onReject={handleReject}
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
                  key={review._id || idx}
                  reviewerId={review.reviewer?._id}
                  studentName={review.reviewer?.name || "Anonymous"}
                  programTitle={review.mentorship?.title || "Program"}
                  duration={review.mentorship?.durationInWeeks ? review.mentorship.durationInWeeks + " Weeks" : ""}
                  rating={review.rating}
                  description={review.content}
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
