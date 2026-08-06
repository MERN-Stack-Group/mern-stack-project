import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import banner from "../assets/banner.jpg";
import TagCard from "../components/TagCard";
import { MentorshipCard } from "../components/MentorshipCard";
import ReviewCard from "../components/ReviewCard";
import LoadingScreen from "../components/LoadingScreen";
import { useAuth } from "../hooks/AuthContext";
import { getUserProfileById } from "../api/userApi";
import { getUserMentorships } from "../api/mentorshipApi";
import { getMentorReviews } from "../api/reviewApi";
import EditProfileModal from "../components/EditProfileModal";
import { GraduationCap, Building2, Pencil, Mail, X } from "lucide-react";

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
  const [showSeeMoreBtn, setShowSeeMoreBtn] = useState(false);

  const aboutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!isOwnProfile && userId && token) {
        try {
          setIsFetchingOther(true);
          const data = await getUserProfileById(userId, token);
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

          if (displayData.role?.includes("alumni")) {
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

  useEffect(() => {
    if (aboutRef.current) {
      const isOverflowing =
        aboutRef.current.scrollHeight > aboutRef.current.clientHeight;
      setShowSeeMoreBtn(isOverflowing);
    }
  }, [displayData?.about]);

  if (authLoading || isFetchingOther || (!isOwnProfile && !otherUserData)) {
    return <LoadingScreen fullScreen={true} message="Loading profile..." />;
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
      <div className="flex flex-col md:flex-row gap-6 p-4 pb-24 md:p-[4vh] w-full min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 justify-center font-sans transition-colors duration-300">
        {/* Main Column */}
        <div className="flex flex-col gap-6 w-full md:w-2/3 lg:w-3/4 max-w-4xl">
          {/* Header Card */}
          <div className="relative bg-white dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-visible pb-6 shadow-sm dark:shadow-xl">
            {/* Banner Image */}
            <div className="relative h-48 w-full bg-slate-200 dark:bg-slate-900 rounded-t-3xl overflow-hidden">
              <img
                src={banner}
                alt="Banner Image"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 dark:to-[#111622]/80"></div>
            </div>

            {/* Profile Avatar */}
            <div className="absolute top-28 left-6 w-36 h-36 border-4 border-white dark:border-[#111622] rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-white font-bold text-center z-10 shadow-lg overflow-hidden">
              <button className="w-full h-full rounded-full overflow-hidden hover:opacity-90 transition-opacity">
                <img
                  src={displayData?.profileImage}
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>

            {/* Main Header Info */}
            <div className="relative pt-20 px-6 flex flex-col md:flex-row justify-between gap-4">
              {isOwnProfile && (
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="absolute top-4 right-4 md:right-5 p-2.5 rounded-xl bg-slate-100 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                  aria-label="Edit Profile"
                  title="Edit Profile"
                >
                  <Pencil size={18} />
                </button>
              )}

              <div className="w-full md:w-3/4 space-y-1 text-left">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {displayData?.name}
                </h1>
                <p className="text-base text-slate-700 dark:text-slate-300">
                  {displayData?.degree}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  {displayData?.location} •{" "}
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="text-sky-600 dark:text-sky-400 font-medium hover:underline cursor-pointer"
                  >
                    Contact info
                  </button>
                </p>
              </div>

              {/* Faculty Info */}
              <div className="flex flex-row items-center md:items-start md:justify-end gap-2.5 w-full md:w-auto mt-2 md:mt-0">
                <div className="w-8 h-8 bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800/50 flex-shrink-0 flex items-center justify-center text-sky-600 dark:text-sky-400 rounded-xl">
                  <GraduationCap size={18} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition cursor-pointer">
                  {displayData?.faculty}
                </span>
              </div>
            </div>

            {/* Employer Section for Alumni */}
            {displayData?.role?.includes("alumni") && (
              <div className="mt-6 border-t border-slate-200 dark:border-slate-800/80 pt-6 px-6 text-left">
                <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Current Employer
                </h2>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800 rounded-xl flex-shrink-0 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Building2 size={22} />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {displayData?.alumniProfile?.employment?.employer}
                    </h3>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                      {displayData?.alumniProfile?.employment?.jobTitle}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {displayData?.alumniProfile?.employment?.location}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* About Section Card */}
          <div className="bg-white dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm dark:shadow-xl text-left">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              About
            </h2>

            <div className="relative">
              <p
                ref={aboutRef}
                className={`text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed transition-all duration-300 ${
                  isAboutExpanded ? "" : "line-clamp-3"
                }`}
              >
                {displayData?.about}
              </p>

              {showSeeMoreBtn && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                    className="text-sky-600 dark:text-sky-400 hover:underline text-xs font-semibold cursor-pointer"
                  >
                    {isAboutExpanded ? "See less" : "...see more"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Skills & Interests Card */}
          <TagCard
            topic="Skills and Interests"
            skills={displayData?.tags || []}
          />
        </div>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-6 w-full md:w-1/3 lg:w-1/4 text-left">
          {/* Active Mentorships Sidebar Card */}
          <div className="bg-white dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm dark:shadow-xl">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4 tracking-wide">
              Active Mentorships
            </h2>

            <div className="flex flex-col gap-3">
              {activeMentorshipsList.map((m) => (
                <div
                  key={m._id}
                  className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-3"
                >
                  <div className="w-10 h-10 bg-sky-100 dark:bg-sky-950 border border-sky-200 dark:border-sky-800/50 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-sky-700 dark:text-sky-400 font-bold overflow-hidden">
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
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition cursor-pointer">
                      {m.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {displayData?.role?.includes("alumni")
                        ? m.description
                        : m.alumni?.name}
                    </p>
                  </div>
                </div>
              ))}
              {activeMentorshipsList.length === 0 && (
                <p className="text-xs text-slate-500">No active mentorships.</p>
              )}
            </div>

            <div className="mt-4 border-t border-slate-200 dark:border-slate-800/80 pt-2">
              <button
                onClick={activeMentorships}
                className="w-full py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition rounded-xl text-center cursor-pointer"
              >
                View All
              </button>
            </div>
          </div>

          {/* Completed Mentorships Sidebar Card */}
          <div className="bg-white dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm dark:shadow-xl">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4 tracking-wide">
              Completed Mentorships
            </h2>

            <div className="flex flex-col gap-3">
              {completedMentorshipsList.map((m) => (
                <div
                  key={m._id}
                  className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-3"
                >
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800/50 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-emerald-700 dark:text-emerald-400 font-bold overflow-hidden">
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
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer">
                      {m.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {displayData?.role?.includes("alumni")
                        ? m.description
                        : m.alumni?.name}
                    </p>
                    <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 uppercase tracking-wide">
                      Completed{" "}
                      {m.durationInWeeks ? `• ${m.durationInWeeks} Weeks` : ""}
                    </p>
                  </div>
                </div>
              ))}
              {completedMentorshipsList.length === 0 && (
                <p className="text-xs text-slate-500">
                  No completed mentorships.
                </p>
              )}
            </div>

            <div className="mt-4 border-t border-slate-200 dark:border-slate-800/80 pt-2">
              <button
                onClick={completedMentorships}
                className="w-full py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition rounded-xl text-center cursor-pointer"
              >
                View All
              </button>
            </div>
          </div>

          {/* Mentee Reviews (Alumni only) */}
          {displayData?.role?.includes("alumni") && (
            <div className="bg-white dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm dark:shadow-xl">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4 tracking-wide">
                Mentee Reviews
              </h2>

              <div className="flex flex-col gap-3">
                {mentorReviewsList.map((review) => (
                  <div
                    key={review._id}
                    className="border-b border-slate-200 dark:border-slate-800/80 pb-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      {review.reviewer?._id ? (
                        <Link
                          to={`/profile/${review.reviewer._id}`}
                          className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
                        >
                          {review.reviewer.name}
                        </Link>
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {review.reviewer?.name || "Anonymous"}
                        </span>
                      )}
                      <span className="text-xs font-bold text-amber-500 dark:text-amber-400 tracking-widest">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      "{review.content}"
                    </p>
                  </div>
                ))}
                {mentorReviewsList.length === 0 && (
                  <p className="text-xs text-slate-500">No reviews found.</p>
                )}
              </div>

              <div className="mt-4 border-t border-slate-200 dark:border-slate-800/80 pt-2">
                <button
                  onClick={viewAllReviews}
                  className="w-full py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition rounded-xl text-center cursor-pointer"
                >
                  View All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      {/* Contact Info Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-sm p-6 relative text-left">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {displayData?.name}'s Contact
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800/50 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">
                    Email Address
                  </p>
                  <a
                    href={`mailto:${displayData?.email}`}
                    className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
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
