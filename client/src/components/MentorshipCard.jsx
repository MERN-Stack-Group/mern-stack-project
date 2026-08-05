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
    <div className="bg-white rounded-lg border border-gray-300 p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header section grouping the core program identifiers and dynamic status badge */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2 sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {programName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{duration}</p>
        </div>

        {/* The badge applies a distinct visual style (gray for completed, green for active) based on the derived state */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide w-max sm:self-start ${
            isCompleted
              ? "bg-gray-100 text-gray-600 border border-gray-200"
              : "bg-emerald-100 text-emerald-700 border border-emerald-200"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mb-5">
        <p className="text-sm text-gray-700 leading-relaxed">{introduction}</p>
      </div>

      {/* Footer section containing mentee/mentor context and contextual actions */}
      <div className="border-t border-gray-200 pt-4 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-3">
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
                    <div className="w-10 h-10 bg-indigo-400 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold shadow-sm overflow-hidden">
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
                        <h4 className="text-sm font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                          {mentee.name}
                        </h4>
                      </Link>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {mentee.role || "Student"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">
                  No mentees enrolled yet.
                </p>
              )
            ) : mentor ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-400 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold shadow-sm overflow-hidden">
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
                    <h4 className="text-sm font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                      {mentor.name}
                    </h4>
                  </Link>
                  <p className="text-xs text-gray-600 line-clamp-1">
                    {mentor.role || "Alumni"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                Mentor information not available.
              </p>
            )}
          </div>
        </div>

        {/* Ensures the review button is only accessible when the program is finished, no review exists yet, and the form isn't active */}
        {!isMentorView && isOwnProfile && isCompleted && !showForm && !myReview && (
          <button
            onClick={handleOpenForm}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Add Review
          </button>
        )}
      </div>

      {/* Renders the single review if it exists */}
      {myReview && !showForm && (
        <div className="mt-5 flex flex-col gap-3">
            <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-bold text-yellow-500">
                  {/* Generates solid and empty stars based on the numerical rating value */}
                  {"★".repeat(myReview.rating)}
                  {"☆".repeat(5 - myReview.rating)}
                  <span className="text-gray-600 text-xs ml-2 font-normal">
                    ({myReview.rating}/5)
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleEdit}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {myReview.content}
              </p>
            </div>
        </div>
      )}

      {/* Inline form toggled by the showForm state, adapting its header text based on context (edit vs new) */}
      {showForm && (
        <div className="mt-5 bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h3 className="text-md font-bold text-gray-900 mb-4">
            {isEditing ? "Edit Review" : "Leave a Review"}
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating (Stars)
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white"
              rows="3"
              value={reviewData.description}
              onChange={(e) =>
                setReviewData({ ...reviewData, description: e.target.value })
              }
              placeholder="Share your experience..."
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 rounded-md font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitReview}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
