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
    <div className="flex flex-col gap-4 w-full md:w-5/6 ml-0 md:ml-10 mt-5 pr-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-900">
          {viewType === "active"
            ? "Active Mentorships"
            : viewType === "reviews"
              ? "Mentorship Reviews"
              : "Mentorship History"}
        </h2>
        <Link
          to={userId ? `/profile/${userId}` : "/profile"}
          className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-semibold flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Profile
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500 italic">Loading...</p>
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
                <p className="text-gray-500 italic">No reviews found.</p>
              )}
            </div>
          ) : (
            <>
              {data.map((item) => (
                <MentorshipCard key={item.id} {...item} />
              ))}

              {data.length === 0 && (
                <p className="text-gray-500 italic">No mentorships found.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
