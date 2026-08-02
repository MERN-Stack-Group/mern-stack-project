import React, { useState } from "react";

// The MentorshipCard component displays program details, mentee information,
// and provides a system to manage reviews for completed programs.
export const MentorshipCard = ({
  programName,
  duration,
  // Defaulting status to an empty string prevents TypeError crashes if the prop is omitted by the parent.
  status = "",
  menteeName,
  menteeRole,
  introduction,
}) => {
  // Evaluates completion state to conditionally render review features.
  // Optional chaining prevents runtime errors if status is null or undefined.
  const isCompleted = status?.toLowerCase() === "completed";

  // State management for the internal review system.
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, description: "" });

  // Resets the form state to default values before displaying it for a new entry.
  const handleOpenForm = () => {
    setReviewData({ rating: 5, description: "" });
    setEditingIndex(null);
    setShowForm(true);
  };

  // Populates the form with existing data and stores the index to track which item is being modified.
  const handleEdit = (index) => {
    setReviewData(reviews[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  // Filters out the review at the specified index to remove it from the state.
  const handleDelete = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  // Handles both creating new reviews and updating existing ones based on whether an editing index exists.
  const handleSubmitReview = () => {
    if (editingIndex !== null) {
      const updatedReviews = [...reviews];
      updatedReviews[editingIndex] = reviewData;
      setReviews(updatedReviews);
    } else {
      setReviews([...reviews, reviewData]);
    }
    setShowForm(false);
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

      {/* Footer section containing mentee context and contextual actions */}
      <div className="border-t border-gray-200 pt-4 flex flex-wrap justify-between items-end gap-4">
        <div>
          <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Mentee
          </h4>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-400 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold shadow-sm">
              IMG
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                {menteeName}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-1">{menteeRole}</p>
            </div>
          </div>
        </div>

        {/* Ensures the review button is only accessible when the program is finished and the form isn't already active */}
        {isCompleted && !showForm && (
          <button
            onClick={handleOpenForm}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Add Review
          </button>
        )}
      </div>

      {/* Renders the list of submitted reviews if the state array is not empty */}
      {reviews.length > 0 && (
        <div className="mt-5 flex flex-col gap-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-md p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-bold text-yellow-500">
                  {/* Generates solid and empty stars based on the numerical rating value */}
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                  <span className="text-gray-600 text-xs ml-2 font-normal">
                    ({review.rating}/5)
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {review.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Inline form toggled by the showForm state, adapting its header text based on context (edit vs new) */}
      {showForm && (
        <div className="mt-5 bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h3 className="text-md font-bold text-gray-900 mb-4">
            {editingIndex !== null ? "Edit Review" : "Leave a Review"}
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
              {editingIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
