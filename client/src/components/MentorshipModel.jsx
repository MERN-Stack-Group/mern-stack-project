import React, { useState, useEffect } from "react";
import { MentorshipCard } from "./MentorshipCard";
import { useAuth } from "../hooks/AuthContext";
import { getUserMentorships } from "../api/mentorshipApi";
import { getMentorReviews } from "../api/reviewApi";
import { useParams, Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";

export const MentorshipModel = ({ viewType = "completed" }) => {
  const [mentorships, setMentorships] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: curentUser, token } = useAuth();

  const { userId } = useParams();
  const isOwnProfile = !userId || (curentUser && userId === curentUser._id);

  useEffect(() => {
    const fetchMentorships = async () => {
      if (!curentUser || !token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const profileUserId = userId || curentUser._id;

        if (viewType === "reviews") {
          const fetchedReviews = await getMentorReviews(profileUserId, token);
          setReviews(fetchedReviews);
        } else {
          const data = await getUserMentorships(profileUserId, token);

          // Map the backend data to match the MentorshipCard props
          const formattedData = data.map((item) => {
            const isMentorView = item.alumni && item.alumni._id === profileUserId;

            return {
              id: item._id,
              programName: item.title,
              duration: item.durationInWeeks
                ? `${item.durationInWeeks} Weeks`
                : "N/A",
              status:
                item.stage === "enrollment"
                  ? "Enrollment"
                  : item.stage === "active"
                    ? "Active"
                    : "Completed",
              mentees: item.students || [],
              mentor: item.alumni,
              introduction: item.description,
              originalStage: item.stage,
              isMentorView: isMentorView,
              isOwnProfile: isOwnProfile,
            };
          });

          setMentorships(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorships();
  }, [curentUser, token, userId, isOwnProfile, viewType]);

  const activeMentorships = mentorships.filter(
    (m) => m.originalStage === "active" || m.originalStage === "enrollment",
  );
  const completedMentorships = mentorships.filter(
    (m) => m.originalStage === "completed",
  );

  const data = viewType === "active" ? activeMentorships : completedMentorships;

  return (
    <div className="min-h-screen bg-slate-300 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 p-4 pb-24 md:p-10 font-sans antialiased transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {viewType === "active"
              ? "Active Mentorships"
              : viewType === "reviews"
                ? "Mentorship Reviews"
                : "Mentorship History"}
          </h2>
          <Link
            to={userId ? `/profile/${userId}` : "/profile"}
            className="w-max px-4 py-2 bg-slate-200 dark:bg-[#111622] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-300 dark:hover:bg-[#161d2b] hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-300 text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Profile
          </Link>
        </div>

      {loading ? (
        <p className="text-slate-500 dark:text-slate-400 italic">Loading...</p>
      ) : (
        <>
          {viewType === "reviews" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review, idx) => (
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
              {reviews.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 italic">No reviews found.</p>
              )}
            </div>
          ) : (
            <>
              {data.map((item) => (
                <MentorshipCard key={item.id} {...item} />
              ))}

              {data.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 italic">No mentorships found.</p>
              )}
            </>
          )}
        </>
      )}
      </div>
    </div>
  );
};
