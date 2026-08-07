import React, { useState, useEffect } from "react";
import IncomingRequestsTable from "../components/IncomingRequestsTable";
import MentorshipProgramCard from "../components/MentorshipProgramCard";
import CompletedProgramCard from "../components/CompletedProgramCard";
import CreatePostForm from "../components/CreatePostForm";
import ReviewCard from "../components/ReviewCard";
import LoadingScreen, { useMinLoading } from "../components/LoadingScreen";
import { X } from "lucide-react";
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
  getActiveOpportunities,
  getDeletedOpportunities,
  deleteOpportunity,
  createOpportunity,
} from "../api/opportunityApi";

const OpportunityCard = ({ opp, onDelete }) => (
  <div className="bg-slate-300 dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm dark:shadow-xl transition-all mb-4 text-left">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">{opp.title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Date: {opp.date}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
            opp.status === "posted"
              ? "bg-slate-200 dark:bg-sky-950/80 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800/50"
              : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
          }`}
        >
          {opp.status}
        </span>
        {opp.status === "posted" && (
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to remove this opportunity?",
                )
              ) {
                onDelete(opp.id);
              }
            }}
            title="Remove Posting"
            className="p-1.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition shadow-sm cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
    <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-300 dark:bg-[#161d2b] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80 leading-relaxed">
      {opp.description}
    </p>
  </div>
);

function MentorDashboard({
  mainTab = "mentorship",
  mentorSub = "requests",
  oppSub = "active",
}) {
  const { user, token, loading: authLoading } = useAuth();

  const [activeMainTab, setActiveMainTab] = useState(mainTab);
  const [mentorSubTab, setMentorSubTab] = useState(mentorSub);
  const [oppSubTab, setOppSubTab] = useState(oppSub);

  const [showAddMentorship, setShowAddMentorship] = useState(false);
  const [showAddOpportunity, setShowAddOpportunity] = useState(false);
  const [loading, setLoading] = useState(true);

  const [requests, setRequests] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [activePrograms, setActivePrograms] = useState([]);
  const [completedPrograms, setCompletedPrograms] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token || authLoading) return;
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
            reviews: [],
          }));

        setActivePrograms(myActive);
        setCompletedPrograms(myCompleted);

        const pendingReqs = await getPendingRequests(token);
        const mappedRequests = pendingReqs.map((r) => ({
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

          const activeOpps = await getActiveOpportunities(token);
          const myActiveOpps = activeOpps.filter(
            (opp) =>
              opp.postedBy?._id === user._id || opp.postedBy === user._id,
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
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [token, user, authLoading]);

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
      const created = await createOpportunity(
        {
          title: data.title,
          description: data.description,
          companyName: data.companyName,
          opportunityType: data.opportunityType,
          location: data.location,
          applicationEmail: data.applicationEmail,
          tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        },
        token,
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
              },
            ],
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

  const renderMentorshipSection = () => (
    <div className="bg-slate-200 dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 mt-6 min-h-[500px] shadow-sm dark:shadow-xl text-left transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/90 mb-6">
        <div className="flex gap-6 overflow-x-auto">
          {["requests", "active", "history", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setMentorSubTab(tab)}
              className={`pb-3 font-semibold text-xs capitalize transition-colors whitespace-nowrap cursor-pointer ${
                mentorSubTab === tab
                  ? "border-b-2 border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
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
        {mentorSubTab === "active" && !showAddMentorship && (
          <button
            onClick={() => setShowAddMentorship(true)}
            className="mb-3 sm:mb-0 px-4 py-2 bg-sky-600 hover:bg-slate-2000 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-600/20 whitespace-nowrap cursor-pointer"
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
        <div>
          <IncomingRequestsTable
            requests={requests}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </div>
      )}

      {mentorSubTab === "active" && (
        <div className="space-y-6">
          {activePrograms.length === 0 && !showAddMentorship ? (
            <p className="text-slate-500 italic text-xs">
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
        <div className="space-y-6">
          {completedPrograms.length === 0 ? (
            <p className="text-slate-500 italic text-xs">
              You have no completed mentorship programs yet.
            </p>
          ) : (
            completedPrograms.map((program) => (
              <CompletedProgramCard key={program.id} {...program} />
            ))
          )}
        </div>
      )}

      {mentorSubTab === "reviews" && (
        <div>
          {allReviews.length === 0 ? (
            <p className="text-slate-500 italic text-xs">
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
                  duration={
                    review.mentorship?.durationInWeeks
                      ? review.mentorship.durationInWeeks + " Weeks"
                      : ""
                  }
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
      <div className="bg-slate-200 dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 mt-6 min-h-[500px] shadow-sm dark:shadow-xl text-left transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/90 mb-6">
          <div className="flex gap-6 overflow-x-auto">
            <button
              onClick={() => setOppSubTab("active")}
              className={`pb-3 font-semibold text-xs transition-colors whitespace-nowrap cursor-pointer ${
                oppSubTab === "active"
                  ? "border-b-2 border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Active Postings
            </button>
            <button
              onClick={() => setOppSubTab("history")}
              className={`pb-3 font-semibold text-xs transition-colors whitespace-nowrap cursor-pointer ${
                oppSubTab === "history"
                  ? "border-b-2 border-sky-600 dark:border-sky-400 text-sky-600 dark:text-sky-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Archived/Deleted
            </button>
          </div>
          {oppSubTab === "active" && !showAddOpportunity && (
            <button
              onClick={() => setShowAddOpportunity(true)}
              className="mb-3 sm:mb-0 px-4 py-2 bg-sky-600 hover:bg-slate-2000 text-white text-xs font-bold rounded-xl transition shadow-md shadow-sky-600/20 whitespace-nowrap cursor-pointer"
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
          <div className="space-y-4">
            {posted.length === 0 && !showAddOpportunity ? (
              <p className="text-slate-500 italic text-xs">
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
          <div className="space-y-4">
            {archived.length === 0 ? (
              <p className="text-slate-500 italic text-xs">No deleted opportunities.</p>
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

  const isLoading = loading || authLoading;
  const showLoading = useMinLoading(isLoading);

  if (showLoading) {
    return <LoadingScreen fullScreen={true} message="Loading Dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-slate-300 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 p-4 pb-24 md:p-10 font-sans antialiased transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-2 text-left">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Mentor Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1 text-xs">
              Manage incoming requests, track active sessions, and oversee your postings.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:space-x-2 bg-transparent sm:bg-slate-200 sm:dark:bg-[#111622] sm:border border-slate-200 dark:border-slate-800 p-0 sm:p-1.5 rounded-2xl w-full sm:w-max mb-6 sm:mb-2 shadow-none sm:shadow-sm">
          <button
            onClick={() => setActiveMainTab("mentorship")}
            className={`w-full sm:w-auto px-5 py-3 sm:py-2 text-sm sm:text-xs font-semibold rounded-xl transition-all cursor-pointer border sm:border-transparent ${
              activeMainTab === "mentorship"
                ? "bg-slate-200 sm:bg-slate-200 dark:bg-[#172338] border-sky-500/50 sm:border-sky-500/50 text-sky-700 dark:text-sky-300 shadow-sm"
                : "bg-slate-200 sm:bg-transparent border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Mentorship Management
          </button>
          <button
            onClick={() => setActiveMainTab("opportunities")}
            className={`w-full sm:w-auto px-5 py-3 sm:py-2 text-sm sm:text-xs font-semibold rounded-xl transition-all cursor-pointer border sm:border-transparent ${
              activeMainTab === "opportunities"
                ? "bg-slate-200 sm:bg-slate-200 dark:bg-[#172338] border-sky-500/50 sm:border-sky-500/50 text-sky-700 dark:text-sky-300 shadow-sm"
                : "bg-slate-200 sm:bg-transparent border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Opportunity Management
          </button>
        </div>

        {activeMainTab === "mentorship"
          ? renderMentorshipSection()
          : renderOpportunitySection()}
      </div>
    </div>
  );
}

export default MentorDashboard;
