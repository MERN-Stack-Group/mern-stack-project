import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import banner from "../assets/banner.jpg";
import TagCard from "../components/TagCard";
import { useAuth } from "../hooks/AuthContext";
import { getUserProfileById } from "../api/userApi";
import { getUserMentorships } from "../api/mentorshipApi";
import { getMentorReviews } from "../api/reviewApi";
import EditProfileModal from "../components/EditProfileModal";
import { GraduationCap, Building2, Building2Icon } from "lucide-react";

export const Profile = () => {
  const { user: currentUser, loading: authLoading, token } = useAuth();
  const { userId } = useParams();

  const isOwnProfile = !userId || (currentUser && userId === currentUser._id);

  const [otherUserData, setOtherUserData] = useState(null);
  const [isFetchingOther, setIsFetchingOther] = useState(!isOwnProfile);

  const [activeMentorshipsList, setActiveMentorshipsList] = useState([]);
  const [completedMentorshipsList, setCompletedMentorshipsList] = useState([]);
  const [mentorReviewsList, setMentorReviewsList] = useState([]);

  const displayData = isOwnProfile ? currentUser : otherUserData;

  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

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
    const fetchMentorships = async () => {
      if (displayData?._id && token) {
        try {
          const data = await getUserMentorships(displayData._id, token);
          const active = data
            .filter((m) => m.stage === "active" || m.stage === "enrollment")
            .slice(0, 2);
          const completed = data
            .filter((m) => m.stage === "completed")
            .slice(0, 2);
          setActiveMentorshipsList(active);
          setCompletedMentorshipsList(completed);

          if (displayData.role.includes("alumni")) {
            const reviews = await getMentorReviews(displayData._id, token);
            setMentorReviewsList(reviews.slice(0, 2));
          }
        } catch (error) {
          console.error("Failed to fetch profile mentorships:", error);
        }
      }
    };
    fetchMentorships();
  }, [displayData?._id, token]);

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
      <div className="min-h-screen bg-gray-100 w-full animate-pulse"></div>
    );
  }

  const completedMentorships = () => {
    if (isOwnProfile) {
      if (currentUser?.role?.includes("alumni")) {
        navigate("/mentor-dashboard/mentorships/history");
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

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-[5vh] w-full min-h-screen bg-gray-100 justify-center">
        <div className="flex flex-col gap-4 w-full md:w-2/3 lg:w-3/4 max-w-4xl">
          <div className="relative bg-white rounded-lg border border-gray-300 overflow-visible pb-6 shadow-sm">
            <div className="relative h-48 w-full bg-blue-400 rounded-t-lg flex items-center justify-center text-white font-bold tracking-widest">
              <img
                src={banner}
                alt="Banner Image"
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>

            <div className="absolute top-28 left-6 w-36 h-36 border-4 border-white rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-center z-10 shadow-sm overflow-hidden">
              <button className="w-full h-full rounded-full overflow-hidden hover:bg-black/20 transition-colors">
                <img
                  src={displayData?.profileImage}
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>

            <div className="relative pt-20 px-6 flex flex-col md:flex-row justify-between gap-4">
              {isOwnProfile && (
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="absolute top-4 right-4 md:right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
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
                <h1 className="text-2xl font-bold text-gray-900">
                  {displayData?.name}
                </h1>
                <p className="text-lg text-gray-700 mt-1">
                  {displayData?.degree}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {displayData?.location} •{" "}
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Contact info
                  </button>
                </p>
              </div>

              <div className="flex flex-row items-center md:items-start md:justify-end gap-3 w-full md:w-auto mt-2 md:mt-0">
                <div className="w-8 h-8 bg-purple-500 flex-shrink-0 flex items-center justify-center text-white text-[10px] rounded shadow-sm">
                  <GraduationCap />
                </div>
                <span className="text-sm font-semibold hover:underline hover:text-blue-700 cursor-pointer">
                  {displayData?.faculty}
                </span>
              </div>
            </div>

            {displayData?.role?.includes("alumni") && (
              <div className="mt-6 border-t border-gray-200 pt-6 px-6">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                  Current Employer
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-slate-100 border border-gray-200 rounded-md flex-shrink-0 flex items-center justify-center text-gray-500 text-xs font-bold shadow-sm">
                    <Building2 />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {displayData?.alumniProfile?.employment?.employer}
                    </h3>
                    <p className="text-sm font-semibold text-gray-700 mt-0.5">
                      {displayData?.alumniProfile?.employment?.jobTitle}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {displayData?.alumniProfile?.employment?.location}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg border border-gray-300 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>

            <div className="relative">
              {/* The ref is attached here to calculate dimensions against the line-clamp rule */}
              <p
                ref={aboutRef}
                className={`text-sm text-gray-700 leading-relaxed transition-all duration-300 ease-in-out ${
                  isAboutExpanded ? "" : "line-clamp-3"
                }`}
              >
                {displayData?.about}
              </p>

              {/* The button container is conditionally rendered solely if the text overshoots the visible bounds */}
              {showSeeMoreBtn && (
                <div
                  className={`flex justify-end mt-1 ${
                    isAboutExpanded ? "mt-2" : ""
                  }`}
                >
                  <button
                    onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                    className="text-gray-500 hover:text-blue-700 hover:underline text-sm font-semibold cursor-pointer"
                  >
                    {isAboutExpanded ? "See less" : "...see more"}
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

        <div className="flex flex-col gap-4 w-full md:w-1/3 lg:w-1/4">
          <div className="bg-white rounded-lg border border-gray-300 p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Active Mentorships
            </h2>

            <div className="flex flex-col gap-4">
              {activeMentorshipsList.map((m) => (
                <div
                  key={m._id}
                  className="flex items-center gap-3 border-b border-gray-200 pb-3"
                >
                  <div className="w-12 h-12 bg-rose-400 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold overflow-hidden">
                    {displayData?.role?.includes("alumni") ? (
                      m.title?.charAt(0) || "P"
                    ) : m.alumni?.profileImage ? (
                      <img
                        src={m.alumni.profileImage}
                        alt={m.alumni.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      m.alumni?.name?.charAt(0) || "M"
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                      {m.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {displayData?.role?.includes("alumni")
                        ? m.description
                        : m.alumni?.name}
                    </p>
                  </div>
                </div>
              ))}
              {activeMentorshipsList.length === 0 && (
                <p className="text-xs text-gray-500">No active mentorships.</p>
              )}
            </div>

            <div className="mt-5 border-t border-gray-200 pt-2">
              <button
                onClick={activeMentorships}
                className="w-full py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors text-center cursor-pointer"
              >
                View All
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-300 p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Completed Mentorships
            </h2>

            <div className="flex flex-col gap-4">
              {completedMentorshipsList.map((m) => (
                <div
                  key={m._id}
                  className="flex items-center gap-3 border-b border-gray-200 pb-3 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="w-12 h-12 bg-slate-400 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold overflow-hidden">
                    {displayData?.role?.includes("alumni") ? (
                      m.title?.charAt(0) || "P"
                    ) : m.alumni?.profileImage ? (
                      <img
                        src={m.alumni.profileImage}
                        alt={m.alumni.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      m.alumni?.name?.charAt(0) || "M"
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
                      {m.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {displayData?.role?.includes("alumni")
                        ? m.description
                        : m.alumni?.name}
                    </p>
                    <p className="text-[10px] font-semibold text-emerald-600 mt-1 uppercase tracking-wide">
                      Completed{" "}
                      {m.durationInWeeks ? `• ${m.durationInWeeks} Weeks` : ""}
                    </p>
                  </div>
                </div>
              ))}
              {completedMentorshipsList.length === 0 && (
                <p className="text-xs text-gray-500">
                  No completed mentorships.
                </p>
              )}
            </div>

            <div className="mt-5 border-t border-gray-200 pt-2">
              <button
                onClick={completedMentorships}
                className="w-full py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors text-center cursor-pointer"
              >
                View All
              </button>
            </div>
          </div>

          {displayData?.role.includes("alumni") ? (
            <div className="bg-white rounded-lg border border-gray-300 p-5 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                Mentee Reviews
              </h2>

              <div className="flex flex-col gap-4">
                {mentorReviewsList.map((review) => (
                  <div
                    key={review._id}
                    className="border-b border-gray-200 pb-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      {review.reviewer?._id ? (
                        <Link
                          to={`/profile/${review.reviewer._id}`}
                          className="text-xs font-bold text-blue-600 hover:underline"
                        >
                          {review.reviewer.name}
                        </Link>
                      ) : (
                        <span className="text-xs font-bold text-gray-900">
                          {review.reviewer?.name || "Anonymous"}
                        </span>
                      )}
                      <span className="text-sm font-bold text-yellow-500 tracking-widest">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-3 leading-relaxed">
                      "{review.content}"
                    </p>
                  </div>
                ))}
                {mentorReviewsList.length === 0 && (
                  <p className="text-xs text-gray-500">No reviews found.</p>
                )}
              </div>

              <div className="mt-5 border-t border-gray-200 pt-2">
                <button
                  onClick={viewAllReviews}
                  className="w-full py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors text-center cursor-pointer"
                >
                  View All
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Edit Profile Modal ── */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      {/* ── Contact Info Modal ── */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {displayData?.name}'s Contact
            </h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                    Email Address
                  </p>
                  <a
                    href={`mailto:${displayData?.email}`}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {displayData?.email || "No email provided"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
