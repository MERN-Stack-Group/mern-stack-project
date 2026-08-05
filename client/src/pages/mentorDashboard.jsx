import React, { useState, useEffect } from "react";
import IncomingRequestsTable from "../components/IncomingRequestsTable";
import MentorshipProgramCard from "../components/MentorshipProgramCard";
import CompletedProgramCard from "../components/CompletedProgramCard";
import CreatePostForm from "../components/CreatePostForm";
import ReviewCard from "../components/ReviewCard";
import { useAuth } from "../hooks/AuthContext";
import {
  getMyMentorships,
  progressMentorshipStage,
  deleteMentorship,
  createMentorship,
  removeStudentFromMentorship,
} from "../api/mentorshipApi";
import {
  getPendingRequests,
  acceptRequest,
  rejectRequest,
} from "../api/mentorshipRequestApi";
import { getMentorReviews } from "../api/reviewApi";
import {
  createOpportunity,
  getActiveOpportunities,
  getDeletedOpportunities,
  deleteOpportunity,
} from "../api/opportunityApi";

// Helper component for the Opportunities section
const OpportunityCard = ({ opp, onDelete }) => (
  <div className="bg-surface rounded border border-border p-6 shadow-sm hover:border-primary transition-colors mb-5 relative group">
    <div className="flex justify-between items-start mb-4 gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors break-words">
          {opp.title}
        </h3>
        <p className="text-sm font-semibold text-text-secondary mt-1">
          {opp.companyName} • {opp.location} • {opp.opportunityType}
        </p>
        <p className="text-sm text-primary mt-1 font-bold">
          {opp.applicationEmail}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2.5">
        <span
          className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-widest shadow-sm ${
            opp.status === "active"
              ? "bg-surface text-primary border border-primary"
              : "bg-surface-hover text-text-secondary border border-border"
          }`}
        >
          {opp.status}
        </span>
        {opp.status === "active" && (
          <button
            onClick={() => onDelete(opp.id)}
            className="text-xs font-bold text-danger hover:text-danger/80 transition-colors cursor-pointer focus:outline-none"
          >
            Remove Posting
          </button>
        )}
      </div>
    </div>
    <p className="text-sm text-text-secondary bg-surface-hover p-4 rounded border border-border leading-relaxed">
      {opp.description}
    </p>
    {opp.tags && opp.tags.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {opp.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 bg-surface-hover text-text-secondary text-[11px] uppercase tracking-widest rounded border border-border font-bold shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
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

  const [activePrograms, setActivePrograms] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

  const [completedPrograms, setCompletedPrograms] = useState([]);

  const [opportunities, setOpportunities] = useState([]);
  const [deletedOpportunities, setDeletedOpportunities] = useState([]);

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

        // Fetch Reviews
        if (user?._id) {
          const fetchedReviews = await getMentorReviews(user._id, token);
          const mappedReviews = fetchedReviews.map((r) => ({
            id: r._id,
            author: r.reviewer?.name || "Unknown Student",
            programTitle: r.mentorship?.title || "Unknown Program",
            duration: r.mentorship?.durationInWeeks
              ? `${r.mentorship.durationInWeeks} Weeks`
              : "N/A",
            rating: r.rating,
            description: r.content,
            mentorshipId: r.mentorship?._id || r.mentorship,
          }));
          setAllReviews(mappedReviews);

          setCompletedPrograms((prev) =>
            prev.map((prog) => ({
              ...prog,
              reviews: mappedReviews.filter(
                (r) =>
                  r.mentorshipId === prog.id ||
                  r.mentorshipId?.toString() === prog.id?.toString(),
              ),
            })),
          );
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    fetchPrograms();
  }, [token, user]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!token) return;
      try {
        const pending = await getPendingRequests(token);
        const formatted = pending.map((req) => ({
          id: req._id,
          requesterId:
            req.requester?._id ||
            req.requester?.id ||
            (typeof req.requester === "string" ? req.requester : ""),
          name: req.requester?.name || "Unknown Student",
          program: req.requester?.degree || "Student",
          topic: req.mentorship?.title || "Mentorship Program",
          message: req.message,
          date: new Date(req.createdAt).toLocaleDateString(),
          rawRequest: req,
        }));
        setRequests(formatted);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };
    fetchRequests();
  }, [token]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      if (!token) return;
      try {
        const activeOpps = await getActiveOpportunities(token);
        const deletedOpps = await getDeletedOpportunities(token);

        const mapOpp = (opp) => ({
          id: opp._id,
          title: opp.title,
          description: opp.description,
          companyName: opp.companyName,
          location: opp.location,
          opportunityType: opp.opportunityType,
          applicationEmail: opp.applicationEmail,
          status: opp.status,
          tags: opp.tags || [],
        });

        // The API returns all active opportunities. If you only want the current mentor's, you might need to filter.
        // Assuming we filter by postedBy
        setOpportunities(
          activeOpps.filter((o) => o.postedBy?._id === user?._id).map(mapOpp),
        );
        setDeletedOpportunities(deletedOpps.map(mapOpp));
      } catch (err) {
        console.error("Failed to fetch opportunities:", err);
      }
    };
    fetchOpportunities();
  }, [token, user]);

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
        token,
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
      const payload = {
        title: data.title,
        description: data.description,
        companyName: data.companyName,
        opportunityType: data.opportunityType,
        location: data.location,
        applicationEmail: data.applicationEmail,
        tags: data.tags
          ? data.tags
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t)
          : [],
      };
      const created = await createOpportunity(payload, token);

      const newOpp = {
        id: created._id,
        title: created.title,
        description: created.description,
        companyName: created.companyName,
        location: created.location,
        opportunityType: created.opportunityType,
        applicationEmail: created.applicationEmail,
        status: created.status,
        tags: created.tags || [],
      };
      setOpportunities([newOpp, ...opportunities]);
      setShowAddOpportunity(false);
    } catch (err) {
      console.error("Failed to create opportunity:", err);
      alert(err.message || "Failed to create opportunity");
    }
  };

  // Save progress (both active and completed)
  const handleSaveProgress = async (programId, newStep) => {
    try {
      const stageName =
        newStep === 1 ? "active" : newStep === 2 ? "completed" : "enrollment";
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
          prev.map((p) =>
            p.id === programId ? { ...p, savedStep: newStep } : p,
          ),
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

  // HANDLERS: Requests & Active Program Updates
  const handleAccept = async (request) => {
    try {
      if (token) {
        await acceptRequest(request.id, token);
      }

      setActivePrograms((prev) => {
        const updated = [...prev];
        const programId =
          request.rawRequest?.mentorship?._id || request.rawRequest?.mentorship;
        const idx = updated.findIndex((p) => p.id === programId);

        if (idx >= 0) {
          updated[idx] = {
            ...updated[idx],
            mentees: [
              ...updated[idx].mentees,
              {
                id:
                  request.rawRequest?.requester?._id ||
                  request.rawRequest?.requester,
                name: request.name,
                program: request.program,
                message: request.message,
              },
            ],
          };
        }
        return updated;
      });

      setRequests(requests.filter((item) => item.id !== request.id));
      setMentorSubTab("active");
    } catch (err) {
      console.error("Failed to accept request:", err);
      alert(err.message || "Failed to accept request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      if (token) {
        await rejectRequest(requestId, token);
      }
      setRequests(requests.filter((item) => item.id !== requestId));
    } catch (err) {
      console.error("Failed to reject request:", err);
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
    try {
      const program = activePrograms.find((p) => p.id === programId);
      const studentToRemove = program?.mentees[studentIndex];

      if (!studentToRemove || !studentToRemove.id) {
        console.error("Student ID not found for removal.");
        return;
      }

      if (
        !window.confirm(
          `Are you sure you want to remove ${studentToRemove.name} from this program?`,
        )
      ) {
        return;
      }

      if (token) {
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
      console.error("Failed to remove student:", err);
      alert(err.message || "Failed to remove student");
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
    <div className="bg-surface rounded shadow-sm border border-border p-8 mt-6 min-h-[500px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border mb-6">
        <div className="flex gap-6 overflow-x-auto">
          {["requests", "active", "history", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMentorSubTab(tab)}
              className={`pb-3 font-semibold text-sm capitalize transition-colors whitespace-nowrap cursor-pointer focus:outline-none ${
                mentorSubTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-text-secondary hover:text-text-primary"
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
            className="mb-3 sm:mb-0 px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-hover transition-colors whitespace-nowrap cursor-pointer focus:outline-none"
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
            <p className="text-text-secondary italic">
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
            <p className="text-text-secondary italic">
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
            <p className="text-text-secondary italic">
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

  const handleDeleteOpportunity = async (oppId) => {
    if (!window.confirm("Are you sure you want to remove this posting?"))
      return;
    try {
      await deleteOpportunity(oppId, token);
      const oppToMove = opportunities.find((o) => o.id === oppId);
      if (oppToMove) {
        setOpportunities(opportunities.filter((o) => o.id !== oppId));
        setDeletedOpportunities([
          { ...oppToMove, status: "deleted" },
          ...deletedOpportunities,
        ]);
      }
    } catch (err) {
      console.error("Failed to delete opportunity:", err);
      alert("Failed to remove posting.");
    }
  };

  const renderOpportunitySection = () => {
    const posted = opportunities;
    const archived = deletedOpportunities;

    return (
      <div className="bg-surface rounded shadow-sm border border-border p-8 mt-6 min-h-[500px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border mb-6">
          <div className="flex gap-6 overflow-x-auto">
            <button
              onClick={() => setOppSubTab("active")}
              className={`pb-3 font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer focus:outline-none ${
                oppSubTab === "active"
                  ? "border-b-2 border-primary text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Active Postings
            </button>
            <button
              onClick={() => setOppSubTab("history")}
              className={`pb-3 font-semibold text-sm transition-colors whitespace-nowrap cursor-pointer focus:outline-none ${
                oppSubTab === "history"
                  ? "border-b-2 border-primary text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Archived/Deleted
            </button>
          </div>
          {/* Add Opportunity Button */}
          {oppSubTab === "active" && !showAddOpportunity && (
            <button
              onClick={() => setShowAddOpportunity(true)}
              className="mb-3 sm:mb-0 px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-hover transition-colors whitespace-nowrap cursor-pointer focus:outline-none"
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
              <p className="text-text-secondary italic">
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
              <p className="text-text-secondary italic">
                No deleted opportunities.
              </p>
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary">
            Mentor Dashboard
          </h1>
          <p className="text-text-secondary mt-2 text-sm">
            Manage incoming requests, track active sessions, and oversee your
            postings.
          </p>
        </div>
      </div>

      <div className="flex space-x-2 bg-surface-hover p-1 rounded w-max mb-2 border border-border">
        <button
          onClick={() => setActiveMainTab("mentorship")}
          className={`px-4 py-2 text-sm font-semibold rounded transition-colors cursor-pointer focus:outline-none ${
            activeMainTab === "mentorship"
              ? "bg-surface text-text-primary shadow-sm border border-border"
              : "text-text-secondary hover:text-text-primary hover:bg-border border border-transparent"
          }`}
        >
          Mentorship Management
        </button>
        <button
          onClick={() => setActiveMainTab("opportunities")}
          className={`px-4 py-2 text-sm font-semibold rounded transition-colors cursor-pointer focus:outline-none ${
            activeMainTab === "opportunities"
              ? "bg-surface text-text-primary shadow-sm border border-border"
              : "text-text-secondary hover:text-text-primary hover:bg-border border border-transparent"
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
