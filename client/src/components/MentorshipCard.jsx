import React, { useState, useEffect } from "react";
import {
  getMyReviewForMentorship,
  getMentorshipReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../api/reviewApi";
import { useNavigate } from "react-router-dom";

// The MentorshipCard component displays program details, mentee information,
// and provides a system to manage reviews for completed programs.
export const MentorshipCard = ({
  mentorshipId,
  currentUser,
  token,
  isAlumniView = false,
  students = [],
  programName,
  duration,
  status = "",
  menteeName,
  menteeRole,
  introduction,
}) => {
  const isCompleted = status?.toLowerCase() === "completed";
  const isStudent = currentUser?.role?.includes("student");
  const navigate = useNavigate();

  // State management for the internal review system.
  const [review, setReview] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isCompleted && mentorshipId && token) {
      const fetchData = async () => {
        try {
          if (isStudent && !isAlumniView) {
            // Fetch single review for this student
            const fetchedReview = await getMyReviewForMentorship(
              mentorshipId,
              token,
            );
            if (fetchedReview) {
              setReview(fetchedReview);
            }
          } else if (isAlumniView) {
            // Fetch all reviews for this mentorship
            const fetchedReviews = await getMentorshipReviews(
              mentorshipId,
              token,
            );
            setAllReviews(fetchedReviews || []);
          }
        } catch (err) {
          console.error("Failed to fetch reviews:", err);
        }
      };
      fetchData();
    }
  }, [isCompleted, isStudent, isAlumniView, mentorshipId, token]);

  const handleOpenForm = () => {
    setReviewData({ rating: 5, description: "" });
    setIsEditing(false);
    setError("");
    setShowForm(true);
  };

  const handleEdit = () => {
    setReviewData({ rating: review.rating, description: review.content });
    setIsEditing(true);
    setError("");
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(review._id, token);
      setReview(null);
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert(err.message || "Failed to delete review");
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewData.description.trim()) {
      setError("Please provide a description.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      if (isEditing) {
        const updated = await updateReview(
          review._id,
          {
            rating: reviewData.rating,
            content: reviewData.description,
          },
          token,
        );
        setReview(updated);
      } else {
        const created = await createReview(
          {
            mentorshipId,
            rating: reviewData.rating,
            content: reviewData.description,
          },
          token,
        );
        setReview(created);
      }
      setShowForm(false);
    } catch (err) {
      setError(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface rounded border border-border p-6 shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2 sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary leading-tight">
            {programName}
          </h3>
          <p className="text-sm text-text-secondary mt-1">{duration}</p>
        </div>

        <span
          className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-widest w-max sm:self-start ${
            isCompleted
              ? "bg-surface-hover text-text-secondary border border-border"
              : "bg-surface text-primary border border-primary"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mb-5">
        <p className="text-sm text-text-secondary leading-relaxed">
          {introduction}
        </p>
      </div>

      <div className="border-t border-border pt-4 flex flex-wrap justify-between items-start gap-4">
        <div className="w-full">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">
            {isAlumniView
              ? students.length > 1
                ? "Mentees"
                : "Mentee"
              : "Mentor"}
          </h4>

          <div className="flex flex-col gap-3">
            {isAlumniView ? (
              students.length > 0 ? (
                students.map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center gap-3 border-b border-border pb-2 last:border-b-0 last:pb-0"
                  >
                    <div className="w-10 h-10 bg-surface-hover rounded flex-shrink-0 flex items-center justify-center text-xs text-text-secondary font-bold overflow-hidden border border-border">
                      {student.profileImage ? (
                        <img
                          src={student.profileImage}
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        student.name?.charAt(0) || "U"
                      )}
                    </div>
                    <div>
                      <h4
                        className="text-sm font-bold text-text-primary cursor-pointer hover:text-primary hover:underline transition-colors"
                        onClick={() => navigate(`/profile/${student._id}`)}
                      >
                        {student.name || "Unknown"}
                      </h4>
                      <p className="text-xs text-text-secondary line-clamp-1">
                        {student.degree}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-text-secondary italic">
                  No mentees yet.
                </p>
              )
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-surface-hover rounded flex-shrink-0 flex items-center justify-center text-xs text-text-secondary font-bold overflow-hidden border border-border">
                  {menteeName?.charAt(0) || "U"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">
                    {menteeName || "Unknown"}
                  </h4>
                  <p className="text-xs text-text-secondary line-clamp-1">
                    {menteeRole}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {isCompleted && isStudent && !isAlumniView && !review && !showForm && (
          <button
            onClick={handleOpenForm}
            className="mt-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary-hover border border-transparent transition-colors whitespace-nowrap self-end focus:outline-none"
          >
            Add Review
          </button>
        )}
      </div>

      {isStudent && !isAlumniView && review && !showForm && (
        <div className="mt-5 flex flex-col gap-3">
          <div className="bg-surface-hover rounded p-4 border border-border">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-bold text-accent">
                {"★".repeat(review.rating)}
                <span className="text-border">
                  {"☆".repeat(5 - review.rating)}
                </span>
                <span className="text-text-secondary text-xs ml-2 font-normal">
                  ({review.rating}/5)
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleEdit}
                  className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-xs font-semibold text-danger hover:text-danger/80 transition-colors focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-sm text-text-secondary whitespace-pre-wrap">
              {review.content}
            </p>
          </div>
        </div>
      )}

      {isAlumniView && isCompleted && allReviews.length > 0 && (
        <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">
            Reviews
          </h4>
          {allReviews.map((r) => (
            <div
              key={r._id}
              className="bg-surface-hover rounded p-4 border border-border"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span
                    className="text-sm font-bold text-text-primary cursor-pointer hover:underline block"
                    onClick={() => navigate(`/profile/${r.reviewer?._id}`)}
                  >
                    {r.reviewer?.name || "Anonymous"}
                  </span>
                  <div className="text-sm font-bold text-accent mt-1">
                    {"★".repeat(r.rating)}
                    <span className="text-border">
                      {"☆".repeat(5 - r.rating)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary whitespace-pre-wrap mt-2">
                {r.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="mt-5 bg-surface border border-border rounded p-6">
          <h3 className="text-lg font-bold text-text-primary mb-5">
            {isEditing ? "Edit Review" : "Leave a Review"}
          </h3>

          {error && <p className="text-danger text-xs mb-3">{error}</p>}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-text-primary mb-1.5">
              Rating (Stars)
            </label>
            <select
              className="w-full border border-border rounded px-4 py-2.5 text-sm bg-surface text-text-primary focus:border-primary focus:outline-none transition-colors"
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

          <div className="mb-5">
            <label className="block text-sm font-semibold text-text-primary mb-1.5">
              Description
            </label>
            <textarea
              className="w-full border border-border rounded px-4 py-3 text-sm bg-surface text-text-primary focus:border-primary focus:outline-none resize-none transition-colors"
              rows="4"
              value={reviewData.description}
              onChange={(e) =>
                setReviewData({ ...reviewData, description: e.target.value })
              }
              placeholder="Share your experience..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 border-t border-border pt-4">
            <button
              disabled={submitting}
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-text-primary bg-surface hover:bg-surface-hover border border-border rounded font-medium transition-colors disabled:opacity-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              disabled={submitting}
              onClick={handleSubmitReview}
              className="px-4 py-2 text-sm bg-primary text-white border border-transparent rounded hover:bg-primary-hover font-medium transition-colors disabled:opacity-50 focus:outline-none"
            >
              {submitting ? "Saving..." : isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
