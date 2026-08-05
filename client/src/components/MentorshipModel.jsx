import React, { useEffect, useState } from "react";
import { MentorshipCard } from "./MentorshipCard";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { getUserMentorships } from "../api/mentorshipApi";
import { getMentorReviews } from "../api/reviewApi";
import { ChevronLeft } from "lucide-react";

export const MentorshipModel = ({ viewType = "completed" }) => {
  const { userId } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const targetUserId = userId || user?._id;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!targetUserId || !token) return;
      try {
        setLoading(true);
        if (viewType === "reviews") {
          const rData = await getMentorReviews(targetUserId, token);
          setData(rData);
        } else {
          const mData = await getUserMentorships(targetUserId, token);
          // Filter based on viewType
          const filtered = mData.filter((m) =>
            viewType === "active"
              ? m.stage === "active" || m.stage === "enrollment"
              : m.stage === "completed",
          );
          setData(filtered);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [targetUserId, token, viewType]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background py-10 w-full">
      <div className="flex flex-col gap-6 w-full max-w-3xl px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            className="p-2 bg-surface border border-border rounded hover:bg-surface-hover transition-colors text-text-secondary hover:text-text-primary focus:outline-none"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold text-text-primary">
            {viewType === "active"
              ? "Active Mentorships"
              : viewType === "completed"
                ? "Mentorship History"
                : "Mentee Reviews"}
          </h2>
        </div>

        {loading ? (
          <div className="text-text-secondary animate-pulse">Loading...</div>
        ) : (
          <div className="flex flex-col gap-4">
            {viewType === "reviews" ? (
              data.length > 0 ? (
                data.map((review, idx) => (
                  <div
                    key={review._id || idx}
                    className="bg-surface rounded border border-border p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-sm font-bold text-text-primary hover:underline hover:text-primary transition-colors cursor-pointer"
                        onClick={() =>
                          navigate(`/profile/${review.reviewer?._id}`)
                        }
                      >
                        {review.reviewer?.name || "Anonymous"}
                      </span>
                      <span className="text-md font-bold text-accent tracking-widest">
                        {"★".repeat(review.rating)}
                        <span className="text-border">
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                      "{review.content}"
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-text-secondary italic">No reviews found.</p>
              )
            ) : data.length > 0 ? (
              data.map((item) => {
                const isAlumniView = item.alumni?._id === targetUserId;
                return (
                  <MentorshipCard
                    key={item._id}
                    mentorshipId={item._id}
                    currentUser={user}
                    token={token}
                    isAlumniView={isAlumniView}
                    students={item.students || []}
                    programName={item.title}
                    duration={`${item.durationInWeeks} Weeks`}
                    status={item.stage}
                    menteeName={item.alumni?.name}
                    menteeRole={item.alumni?.role?.[0] || "Alumni"}
                    introduction={item.description}
                  />
                );
              })
            ) : (
              <p className="text-text-secondary italic">
                No mentorships found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
