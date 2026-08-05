import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building,
  MapPin,
  Clock,
  Calendar,
  Mail,
  Tag,
  Send,
  User,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../hooks/AuthContext";
import { getOpportunityById } from "../api/opportunityApi";
import { getMentorshipById } from "../api/mentorshipApi";
import { createMentorshipRequest } from "../api/mentorshipRequestApi";

export default function DetailsPage() {
  const { type, id } = useParams(); // type is either "opportunity" or "mentorship"
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Application State
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [applyStatus, setApplyStatus] = useState(null); // null, "submitting", "success", "error"
  const [applyError, setApplyError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (type === "opportunity") {
          const res = await getOpportunityById(id, token);
          setData(res);
        } else if (type === "mentorship") {
          const res = await getMentorshipById(id, token);
          setData(res);
        } else {
          setError("Invalid content type");
        }
      } catch (err) {
        setError(err.message || "Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchData();
    }
  }, [type, id, token]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setApplyError("Please provide a message to the mentor.");
      return;
    }

    try {
      setApplyStatus("submitting");
      setApplyError("");
      await createMentorshipRequest(id, message, token);
      setApplyStatus("success");
    } catch (err) {
      setApplyStatus("error");
      setApplyError(err.message || "Failed to send request.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center">
        <div className="text-danger mb-4">
          <AlertCircle size={48} />
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-4">
          {error || "Content not found"}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isMentorship = type === "mentorship";
  const isOpportunity = type === "opportunity";

  const publisher = isMentorship ? data.alumni : data.postedBy;
  const isOwner = user?._id === publisher?._id;
  const isStudent = user?.role?.includes("student");

  // Logic for whether student can apply for mentorship
  const canApplyMentorship =
    isMentorship && isStudent && data.stage === "enrollment" && !isOwner;

  return (
    <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-4 font-medium cursor-pointer focus:outline-none"
          >
            <ChevronLeft size={20} /> Back
          </button>

          {/* Main Content Card */}
          <div className="bg-surface rounded shadow-sm border border-border overflow-hidden mb-8">
            {/* Header Banner - Flat, Academic Style */}
            <div className="h-24 bg-surface-hover border-b border-border relative">
              <div className="absolute -bottom-6 left-8">
                {publisher?.profileImage ? (
                  <img
                    src={publisher.profileImage}
                    alt={publisher.name}
                    className="w-16 h-16 rounded object-cover border border-border bg-surface cursor-pointer"
                    onClick={() => navigate(`/profile/${publisher._id}`)}
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded bg-surface border border-border flex items-center justify-center text-text-secondary text-xl font-bold cursor-pointer"
                    onClick={() => navigate(`/profile/${publisher?._id}`)}
                  >
                    {publisher?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              <div className="absolute top-4 right-6">
                <span className="px-3 py-1 bg-surface border border-border text-text-secondary text-[11px] font-bold uppercase tracking-widest rounded shadow-sm">
                  {isMentorship
                    ? "Mentorship Program"
                    : `${data.opportunityType || "Job"} Opportunity`}
                </span>
              </div>
            </div>

            <div className="pt-10 px-8 pb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 leading-tight">
                {data.title}
              </h1>

              <div
                className="text-sm text-primary font-bold mb-6 flex items-center gap-2 cursor-pointer hover:underline w-max"
                onClick={() => navigate(`/profile/${publisher?._id}`)}
              >
                <User size={16} /> Posted by {publisher?.name || "Unknown"}
              </div>

              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-6">
                {isOpportunity && (
                  <>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-hover text-text-secondary rounded text-[11px] font-bold uppercase tracking-widest border border-border">
                      <Building size={14} className="text-text-muted" />{" "}
                      {data.companyName}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-hover text-text-secondary rounded text-[11px] font-bold uppercase tracking-widest border border-border">
                      <MapPin size={14} className="text-text-muted" />{" "}
                      {data.location}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface text-primary rounded text-[11px] font-bold uppercase tracking-widest border border-primary">
                      <Briefcase size={14} /> {data.opportunityType}
                    </div>
                  </>
                )}

                {isMentorship && (
                  <>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-hover text-text-secondary rounded text-[11px] font-bold uppercase tracking-widest border border-border">
                      <Clock size={14} className="text-text-muted" />{" "}
                      {data.durationInWeeks} Weeks
                    </div>
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-widest border ${
                        data.stage === "enrollment"
                          ? "bg-surface-hover text-text-secondary border-border"
                          : data.stage === "active"
                            ? "bg-surface text-primary border-primary"
                            : "bg-surface-hover text-text-secondary border-border"
                      }`}
                    >
                      <Calendar size={14} /> Stage: {data.stage}
                    </div>
                  </>
                )}
              </div>

              {/* Description Body */}
              <div className="mb-10 text-text-primary text-sm leading-relaxed">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">
                  Description
                </h3>
                <p className="whitespace-pre-wrap">{data.description}</p>
              </div>

              {/* Tags (if Opportunity) */}
              {isOpportunity && data.tags && data.tags.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">
                    Relevant Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1 px-2.5 py-1 bg-surface-hover text-text-secondary border border-border rounded text-[11px] font-bold uppercase tracking-widest"
                      >
                        <Tag size={12} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action Section */}
              <div className="bg-surface-hover rounded p-6 border border-border">
                {isOpportunity && (
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-text-primary mb-1">
                        Interested in this opportunity?
                      </h4>
                      <p className="text-text-secondary text-sm">
                        Send your resume and cover letter to the provided
                        contact email.
                      </p>
                    </div>
                    <a
                      href={`mailto:${data.applicationEmail}`}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded transition-colors w-full md:w-auto focus:outline-none"
                    >
                      <Mail size={16} /> Apply via Email
                    </a>
                  </div>
                )}

                {isMentorship && (
                  <div>
                    {!isStudent && (
                      <p className="text-text-secondary text-sm text-center italic">
                        Only verified students can apply to mentorship programs.
                      </p>
                    )}
                    {isOwner && (
                      <p className="text-text-secondary text-sm text-center italic">
                        This is your mentorship program. You cannot apply to it.
                      </p>
                    )}
                    {isStudent && data.stage !== "enrollment" && (
                      <div className="flex flex-col items-center text-center p-4">
                        <div className="w-10 h-10 bg-surface border border-border text-text-secondary rounded flex items-center justify-center mb-3">
                          <Calendar size={20} />
                        </div>
                        <h4 className="text-text-primary text-sm font-bold mb-1">
                          Enrollment Closed
                        </h4>
                        <p className="text-text-secondary text-sm">
                          This program is no longer accepting new students.
                        </p>
                      </div>
                    )}

                    {canApplyMentorship && (
                      <>
                        {applyStatus === "success" ? (
                          <div className="flex flex-col items-center text-center py-6 bg-surface rounded border border-border">
                            <CheckCircle2
                              size={40}
                              className="text-text-primary mb-3"
                            />
                            <h4 className="text-lg font-bold text-text-primary mb-2">
                              Request Sent Successfully
                            </h4>
                            <p className="text-text-secondary text-sm">
                              The mentor has been notified.
                            </p>
                          </div>
                        ) : (
                          <div className="transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-base font-bold text-text-primary">
                                Request Mentorship
                              </h4>
                            </div>

                            {isApplying ? (
                              <form
                                onSubmit={handleApply}
                                className="space-y-4 animate-in fade-in slide-in-from-top-4"
                              >
                                <div>
                                  <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-2">
                                    Why do you want to join this program?
                                  </label>
                                  <textarea
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-surface text-sm text-text-primary rounded border border-border p-4 focus:border-primary transition-colors outline-none resize-none h-32"
                                    placeholder="Introduce yourself and explain what you hope to learn..."
                                  />
                                  {applyError && (
                                    <p className="text-danger text-sm mt-2 flex items-center gap-1">
                                      <AlertCircle size={14} /> {applyError}
                                    </p>
                                  )}
                                </div>
                                <div className="flex gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setIsApplying(false)}
                                    className="flex-1 px-4 py-2.5 bg-surface border border-border text-text-secondary text-sm font-bold rounded hover:bg-surface-hover hover:text-text-primary transition-colors cursor-pointer focus:outline-none"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    disabled={applyStatus === "submitting"}
                                    className="flex-[2] flex justify-center items-center gap-2 px-4 py-2.5 bg-primary border border-transparent text-white text-sm font-bold rounded hover:bg-primary-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer focus:outline-none"
                                  >
                                    {applyStatus === "submitting" ? (
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                      <>
                                        <Send size={16} /> Submit Request
                                      </>
                                    )}
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <button
                                onClick={() => setIsApplying(true)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded transition-colors cursor-pointer focus:outline-none"
                              >
                                <Send size={16} /> Apply for Mentorship
                              </button>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
