import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { getMyReviewForMentorship, createReview, updateReview, deleteReview } from "../api/reviewApi";

// The MentorshipCard component displays program details, mentee information,
// and provides a system to manage reviews for completed programs.
export const MentorshipCard = ({
  id,
  programName,
  duration,
  // Defaulting status to an empty string prevents TypeError crashes if the prop is omitted by the parent.
  status = "",
  mentees = [],
  mentor,
  isMentorView,
  introduction,
  isOwnProfile,
}) => {
  // Evaluates completion state to conditionally render review features.
  // Optional chaining prevents runtime errors if status is null or undefined.
  const isCompleted = status?.toLowerCase() === "completed";

  const { token } = useAuth();
  
  // State management for the internal review system.
  const [myReview, setMyReview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, description: "" });

  useEffect(() => {
    const fetchReview = async () => {
      if (isCompleted && isOwnProfile && !isMentorView && token && id) {
        try {
          const review = await getMyReviewForMentorship(id, token);
          if (review) {
            setMyReview(review);
          }
        } catch (error) {
          console.error("Failed to fetch review:", error);
        }
      }
    };
    fetchReview();
  }, [isCompleted, isOwnProfile, isMentorView, token, id]);

  // Resets the form state to default values before displaying it for a new entry.
  const handleOpenForm = () => {
    setReviewData({ rating: 5, description: "" });
    setIsEditing(false);
    setShowForm(true);
  };

  // Populates the form with existing data
  const handleEdit = () => {
    setReviewData({ rating: myReview.rating, description: myReview.content });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(myReview._id, token);
        setMyReview(null);
        setShowForm(false);
      } catch (error) {
        console.error("Failed to delete review:", error);
        alert(error.message || "Failed to delete review");
      }
    }
  };

  const handleSubmitReview = async () => {
    try {
      if (isEditing) {
        const updated = await updateReview(myReview._id, { rating: reviewData.rating, content: reviewData.description }, token);
        setMyReview(updated);
      } else {
        const created = await createReview({ mentorshipId: id, rating: reviewData.rating, content: reviewData.description }, token);
        setMyReview(created);
      }
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save review:", error);
      alert(error.message || "Failed to save review");
    }
  };

  return (
    <div className="bg-slate-200 dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm dark:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-sky-500/10 mb-5 text-left group">
      {/* Header section grouping the core program identifiers and dynamic status badge */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2 sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            {programName}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{duration}</p>
        </div>

        {/* The badge applies a distinct visual style (gray for completed, green for active) based on the derived state */}
        <span
          className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-max sm:self-start border transition-colors ${
            isCompleted
              ? "bg-slate-200 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/50"
              : "bg-slate-200 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800/50 shadow-[0_0_15px_rgba(14,165,233,0.15)] dark:shadow-[0_0_15px_rgba(14,165,233,0.1)]"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-transparent dark:from-sky-500/10 rounded-xl pointer-events-none"></div>
        <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-300/80 dark:bg-[#161d2b]/80 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/60 leading-relaxed relative z-10 backdrop-blur-sm">
          {introduction}
        </p>
      </div>

      {/* Footer section containing mentee/mentor context and contextual actions */}
      <div className="border-t border-slate-200 dark:border-slate-800/60 pt-5 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h4 className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
            {isMentorView ? "Mentees" : "Mentor"}
          </h4>

          <div className="flex flex-col gap-3">
            {isMentorView ? (
              mentees.length > 0 ? (
                mentees.map((mentee) => (
                  <div
                    key={mentee._id || mentee.id || Math.random()}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-white dark:from-sky-950 dark:to-[#161d2b] border border-sky-200 dark:border-sky-800/50 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-sky-600 dark:text-sky-400 font-bold shadow-sm overflow-hidden ring-2 ring-transparent group-hover:ring-sky-500/20 transition-all">
                      {mentee.profileImage ? (
                        <img
                          src={mentee.profileImage}
                          alt={mentee.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        mentee.name?.charAt(0) || "M"
                      )}
                    </div>
                    <div>
                      <Link to={`/profile/${mentee._id || mentee.id}`}>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 hover:underline cursor-pointer">
                          {mentee.name}
                        </h4>
                      </Link>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {mentee.role || "Student"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No mentees enrolled yet.
                </p>
              )
            ) : mentor ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-white dark:from-sky-950 dark:to-[#161d2b] border border-sky-200 dark:border-sky-800/50 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-sky-600 dark:text-sky-400 font-bold shadow-sm overflow-hidden ring-2 ring-transparent group-hover:ring-sky-500/20 transition-all">
                  {mentor.profileImage ? (
                    <img
                      src={mentor.profileImage}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    mentor.name?.charAt(0) || "M"
                  )}
                </div>
                <div>
                  <Link to={`/profile/${mentor._id || mentor.id}`}>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 hover:underline cursor-pointer">
                      {mentor.name}
                    </h4>
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {mentor.role || "Alumni"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mentor information not available.
              </p>
            )}
          </div>
        </div>

        {/* Ensures the review button is only accessible when the program is finished, no review exists yet, and the form isn't active */}
        {!isMentorView && isOwnProfile && isCompleted && !showForm && !myReview && (
          <button
            onClick={handleOpenForm}
            className="px-4 py-2 bg-sky-600 hover:bg-slate-2000 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-sky-600/20 whitespace-nowrap cursor-pointer"
          >
            Add Review
          </button>
        )}
      </div>

      {/* Renders the single review if it exists */}
      {myReview && !showForm && (
        <div className="mt-5 flex flex-col gap-3">
            <div className="bg-slate-300 dark:bg-[#161d2b] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-bold text-amber-400">
                  {/* Generates solid and empty stars based on the numerical rating value */}
                  {"★".repeat(myReview.rating)}
                  <span className="text-slate-400 dark:text-slate-600 ml-1">{"★".repeat(5 - myReview.rating)}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs ml-2 font-normal">
                    ({myReview.rating}/5)
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleEdit}
                    className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {myReview.content}
              </p>
            </div>
        </div>
      )}

      {/* Inline form toggled by the showForm state, adapting its header text based on context (edit vs new) */}
      {showForm && (
        <div className="mt-5 bg-slate-300 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <h3 className="text-md font-bold text-slate-900 dark:text-white mb-4">
            {isEditing ? "Edit Review" : "Leave a Review"}
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Rating (Stars)
            </label>
            <select
              className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm bg-slate-200 dark:bg-[#111622] text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              value={reviewData.rating}
              onChange={(e) =>
                setReviewData({ ...reviewData, rating: Number(e.target.value) })
              }
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm bg-slate-200 dark:bg-[#111622] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
              rows="3"
              value={reviewData.description}
              onChange={(e) =>
                setReviewData({ ...reviewData, description: e.target.value })
              }
              placeholder="Share your experience..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-[#111622] border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitReview}
              className="px-4 py-2 text-sm bg-sky-600 hover:bg-slate-2000 text-white rounded-xl font-bold transition-colors shadow-md shadow-sky-600/20 cursor-pointer"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
