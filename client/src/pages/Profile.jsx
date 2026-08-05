import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import banner from "../assets/banner.jpg";
import TagCard from "../components/TagCard";
import { useAuth } from "../hooks/AuthContext";
import { getUserProfileById } from "../api/userApi";
import { getUserMentorships } from "../api/mentorshipApi";
import { getMentorReviews, createReview } from "../api/reviewApi";
import EditProfileModal from "../components/EditProfileModal";

export const Profile = () => {
  const { user: currentUser, loading: authLoading, token } = useAuth();
  const { userId } = useParams();

  const isOwnProfile = !userId || (currentUser && userId === currentUser._id);

  const [otherUserData, setOtherUserData] = useState(null);
  const [isFetchingOther, setIsFetchingOther] = useState(!isOwnProfile);

  const displayData = isOwnProfile ? currentUser : otherUserData;

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [mentorships, setMentorships] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewMentorshipId, setReviewMentorshipId] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");

  // A state flag indicating whether the text is actually long enough to require truncation.
  const [showSeeMoreBtn, setShowSeeMoreBtn] = useState(false);

  // A reference to the paragraph element is necessary to access its underlying DOM properties (like height).
  const aboutRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!isOwnProfile && userId && token) {
        try {
          setIsFetchingOther(true);

          const data = await getUserProfileById(userId, token);

          console.log("Fetched profile:", data);

          setOtherUserData(data);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        } finally {
          setIsFetchingOther(false);
        }
      }
    };

    fetchUser();
  }, [userId, isOwnProfile, token]);

  useEffect(() => {
    const fetchMentorshipsAndReviews = async () => {
      if (!displayData?._id || !token) return;
      try {
        const mData = await getUserMentorships(displayData._id, token);
        setMentorships(mData);

        if (displayData.role?.includes("alumni")) {
          const rData = await getMentorReviews(displayData._id, token);
          setReviews(rData);
        }
      } catch (err) {
        console.error("Failed to fetch mentorships/reviews:", err);
      }
    };
    fetchMentorshipsAndReviews();
  }, [displayData?._id, displayData?.role, token]);

  // This effect evaluates the height of the text block whenever the user data loads or changes.
  // By comparing scrollHeight (total text height) to clientHeight (visible height restricted by line-clamp),
  // it accurately determines if the text overflows the 3-line limit.
  useEffect(() => {
    if (aboutRef.current) {
      const isOverflowing =
        aboutRef.current.scrollHeight > aboutRef.current.clientHeight;
      setShowSeeMoreBtn(isOverflowing);
    }
  }, [displayData?.about]);

  if (authLoading || isFetchingOther || (!isOwnProfile && !otherUserData)) {
    return (
      <div className="min-h-screen bg-background w-full animate-pulse"></div>
    );
  }

  const completedMentorships = () => {
    if (isOwnProfile) {
      if (currentUser?.role?.includes("alumni")) {
        navigate("/mentor-dashboard/mentorships/completed");
      } else {
        navigate("/profile/mentorships-completed");
      }
    } else {
      navigate(`/profile/${userId}/mentorships-completed`);
    }
  };

  const activeMentorships = () => {
    if (isOwnProfile) {
      if (currentUser?.role?.includes("alumni")) {
        navigate("/mentor-dashboard/mentorships/active");
      } else {
        navigate("/profile/mentorships-active");
      }
    } else {
      navigate(`/profile/${userId}/mentorships-active`);
    }
  };

  const viewAllReviews = () => {
    if (isOwnProfile) {
      if (currentUser?.role?.includes("alumni")) {
        navigate("/mentor-dashboard/mentorships/reviews");
      } else {
        navigate("/profile/mentorships-reviews");
      }
    } else {
      navigate(`/profile/${userId}/mentorships-reviews`);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewContent.trim()) {
      setReviewError("Please write a review.");
      return;
    }

    try {
      setReviewSubmitting(true);
      setReviewError("");
      await createReview(
        {
          mentorshipId: reviewMentorshipId,
          rating: reviewRating,
          content: reviewContent,
        },
        token,
      );

      setIsReviewModalOpen(false);
      setReviewMentorshipId(null);
      setReviewContent("");
      setReviewRating(5);

      // Optionally refresh mentorships or just alert success
      alert("Review submitted successfully!");
    } catch (err) {
      setReviewError(err.message || "Failed to submit review");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const activePrograms = mentorships
    .filter((m) => m.stage === "active" || m.stage === "enrollment")
    .slice(0, 2);
  const completedPrograms = mentorships
    .filter((m) => m.stage === "completed")
    .slice(0, 2);
  const displayReviews = reviews.slice(0, 2);

  return (
    <>
      <div className="min-h-screen bg-background w-full">
          <div className="flex flex-col gap-8 w-full md:w-2/3 lg:w-3/4 max-w-4xl">
            <div className="relative bg-surface rounded border border-border overflow-visible pb-6 shadow-sm">
              <div className="relative h-48 w-full bg-surface-hover rounded-t flex items-center justify-center text-text-secondary font-bold tracking-widest border-b border-border">
                <img
                  src={banner}
                  alt="Banner Image"
                  className="w-full h-full object-cover rounded-t opacity-80"
                />

                {isOwnProfile && (
                  <button
                    className="absolute top-4 right-4 p-2 bg-surface rounded text-text-primary hover:bg-surface-hover transition-colors cursor-pointer border border-border focus:outline-none"
                    aria-label="Edit Banner"
                    title="Edit Banner"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                      <path
                        fillRule="evenodd"
                        d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="absolute top-28 left-6 w-28 h-28 border-2 border-surface rounded bg-surface-hover flex items-center justify-center text-text-primary font-bold text-center z-10 shadow-sm overflow-hidden">
                <button className="w-full h-full rounded overflow-hidden hover:opacity-80 transition-opacity focus:outline-none">
                  <img
                    src={displayData?.profileImage}
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>

              <div className="relative pt-16 px-6 flex flex-col md:flex-row justify-between gap-4">
                {isOwnProfile && (
                  <button
                    onClick={() => setIsEditOpen(true)}
                    className="absolute top-4 right-4 md:right-6 p-2 rounded hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors cursor-pointer border border-transparent hover:border-border focus:outline-none"
                    aria-label="Edit Profile"
                    title="Edit Profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.158 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                  </button>
                )}

                <div className="w-full md:w-3/4">
                  <h1 className="text-2xl font-bold text-text-primary">
                    {displayData?.name}
                  </h1>
                  <p className="text-base text-text-primary mt-1 font-medium">
                    {displayData?.degree}
                  </p>
                  <p className="text-sm text-text-secondary mt-2 flex items-center gap-2">
                    {displayData?.location} •{" "}
                    <button className="text-primary font-bold hover:underline focus:outline-none">
                      Contact info
                    </button>
                  </p>
                </div>

                <div className="flex flex-row items-center md:items-start md:justify-end gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <div className="w-10 h-10 bg-surface-hover text-text-secondary flex-shrink-0 flex items-center justify-center text-[10px] rounded border border-border font-bold">
                    LOGO
                  </div>
                  <span className="text-sm font-bold hover:underline text-text-primary cursor-pointer mt-1">
                    {displayData?.faculty}
                  </span>
                </div>
              </div>

              {displayData?.role?.includes("alumni") && (
                <div className="mt-8 border-t border-border pt-6 px-6">
                  <h2 className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-4">
                    Current Employer
                  </h2>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-surface-hover border border-border rounded flex-shrink-0 flex items-center justify-center text-text-secondary text-xs font-bold shadow-sm">
                      LOGO
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-sm font-bold text-text-primary leading-tight">
                        {displayData?.alumniProfile?.employment?.employer}
                      </h3>
                      <p className="text-xs font-semibold text-text-primary mt-1">
                        {displayData?.alumniProfile?.employment?.jobTitle}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        {displayData?.alumniProfile?.employment?.location}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-surface rounded border border-border p-6 shadow-sm">
              <h2 className="text-lg font-bold text-text-primary mb-4">
                About
              </h2>

              <div className="relative">
                <p
                  ref={aboutRef}
                  className={`text-sm text-text-secondary leading-relaxed transition-all duration-300 ease-in-out ${
                    isAboutExpanded ? "" : "line-clamp-3"
                  }`}
                >
                  {displayData?.about || "No details provided yet."}
                </p>

                {showSeeMoreBtn && (
                  <div
                    className={`flex justify-end mt-1 ${
                      isAboutExpanded ? "mt-2" : ""
                    }`}
                  >
                    <button
                      onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                      className="text-text-primary hover:text-primary hover:underline text-xs font-bold uppercase tracking-widest cursor-pointer focus:outline-none"
                    >
                      {isAboutExpanded ? "See less" : "See more"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <TagCard
              topic="Skills and Interests"
              skills={displayData?.tags || []}
            />{" "}
          </div>

          <div className="flex flex-col gap-6 w-full md:w-1/3 lg:w-1/4">
            <div className="bg-surface rounded border border-border p-6 shadow-sm">
              <h2 className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-4">
                Active Mentorships
              </h2>

              <div className="flex flex-col gap-4">
                {activePrograms.length > 0 ? (
                  activePrograms.map((prog) => (
                    <div
                      key={prog._id}
                      className="flex items-center gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0"
                    >
                      <div className="w-10 h-10 bg-surface-hover border border-border rounded flex-shrink-0 flex items-center justify-center text-sm text-text-secondary font-bold overflow-hidden">
                        {prog.alumni?.profileImage ? (
                          <img
                            src={prog.alumni.profileImage}
                            alt={prog.alumni.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          prog.alumni?.name?.charAt(0) || "U"
                        )}
                      </div>
                      <div>
                        <h3
                          className="text-sm font-bold text-text-primary hover:text-primary hover:underline cursor-pointer transition-colors"
                          onClick={() =>
                            navigate(`/details/mentorship/${prog._id}`)
                          }
                        >
                          {prog.title}
                        </h3>
                        <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                          With {prog.alumni?.name}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-text-secondary italic">
                    No active mentorships.
                  </p>
                )}
              </div>

              {activePrograms.length > 0 && (
                <div className="mt-4 border-t border-border pt-3">
                  <button
                    onClick={activeMentorships}
                    className="w-full py-1.5 text-xs font-bold text-text-primary hover:bg-surface-hover rounded transition-colors text-center cursor-pointer border border-border focus:outline-none"
                  >
                    View All
                  </button>
                </div>
              )}
            </div>

            <div className="bg-surface rounded border border-border p-6 shadow-sm">
              <h2 className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-4">
                Completed Mentorships
              </h2>

              <div className="flex flex-col gap-4">
                {completedPrograms.length > 0 ? (
                  completedPrograms.map((prog) => (
                    <div
                      key={prog._id}
                      className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0 transition-opacity"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-surface-hover border border-border rounded flex-shrink-0 flex items-center justify-center text-sm text-text-secondary font-bold overflow-hidden">
                          {prog.alumni?.profileImage ? (
                            <img
                              src={prog.alumni.profileImage}
                              alt={prog.alumni.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            prog.alumni?.name?.charAt(0) || "U"
                          )}
                        </div>
                        <div>
                          <h3
                            className="text-sm font-bold text-text-primary hover:text-primary hover:underline cursor-pointer transition-colors"
                            onClick={() =>
                              navigate(`/details/mentorship/${prog._id}`)
                            }
                          >
                            {prog.title}
                          </h3>
                          <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                            With {prog.alumni?.name}
                          </p>
                        </div>
                      </div>
                      {isOwnProfile &&
                        currentUser?.role?.includes("student") && (
                          <button
                            onClick={() => {
                              setReviewMentorshipId(prog._id);
                              setIsReviewModalOpen(true);
                            }}
                            className="text-xs font-bold px-3 py-1.5 bg-primary text-white hover:bg-primary-hover rounded transition-colors whitespace-nowrap focus:outline-none border border-transparent"
                          >
                            Add Review
                          </button>
                        )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-text-secondary italic">
                    No completed mentorships.
                  </p>
                )}
              </div>

              {completedPrograms.length > 0 && (
                <div className="mt-4 border-t border-border pt-3">
                  <button
                    onClick={completedMentorships}
                    className="w-full py-1.5 text-xs font-bold text-text-primary hover:bg-surface-hover rounded transition-colors text-center cursor-pointer border border-border focus:outline-none"
                  >
                    View All
                  </button>
                </div>
              )}
            </div>

            {displayData?.role?.includes("alumni") ? (
              <div className="bg-surface rounded border border-border p-6 shadow-sm">
                <h2 className="text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-4">
                  Mentee Reviews
                </h2>

                <div className="flex flex-col gap-4">
                  {displayReviews.length > 0 ? (
                    displayReviews.map((review, idx) => (
                      <div
                        key={review._id || idx}
                        className="border-b border-border pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-sm font-bold text-text-primary cursor-pointer hover:underline hover:text-primary transition-colors"
                            onClick={() =>
                              navigate(`/profile/${review.reviewer?._id}`)
                            }
                          >
                            {review.reviewer?.name || "Anonymous"}
                          </span>
                          <span className="text-xs font-bold text-accent tracking-widest">
                            {"★".repeat(review.rating)}
                            <span className="text-border">
                              {"☆".repeat(5 - review.rating)}
                            </span>
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">
                          "{review.content}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-text-secondary italic">
                      No reviews yet.
                    </p>
                  )}
                </div>

                {displayReviews.length > 0 && (
                  <div className="mt-4 border-t border-border pt-3">
                    <button
                      onClick={viewAllReviews}
                      className="w-full py-1.5 text-xs font-bold text-text-primary hover:bg-surface-hover rounded transition-colors text-center cursor-pointer border border-border focus:outline-none"
                    >
                      View All
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
      </div>

      {/* ── Review Modal ── */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded p-8 w-full max-w-md shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-6">
              Write a Review
            </h2>
            {reviewError && (
              <p className="text-danger text-sm mb-4 bg-surface-hover p-3 rounded border border-border">
                {reviewError}
              </p>
            )}
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-6">
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-3">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`text-2xl transition-colors ${star <= reviewRating ? "text-accent" : "text-surface-hover"} focus:outline-none`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-widest mb-3">
                  Review Content
                </label>
                <textarea
                  required
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  className="w-full rounded bg-surface border border-border text-text-primary p-4 focus:border-primary outline-none resize-none h-32 placeholder:text-text-secondary/50 transition-colors text-sm"
                  placeholder="Share your experience..."
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-sm text-text-primary bg-surface hover:bg-surface-hover rounded font-bold transition-colors border border-border focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="px-4 py-2 text-sm bg-primary text-white font-bold rounded hover:bg-primary-hover transition-colors disabled:opacity-50 focus:outline-none border border-transparent"
                >
                  {reviewSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Edit Profile Modal ── */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </>
  );
};
