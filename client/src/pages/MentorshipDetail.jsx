import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMentorshipById } from "../api/mentorshipApi";
import {
  getMyRequests,
  createMentorshipRequest,
} from "../api/mentorshipRequestApi";
import { useAuth } from "../hooks/AuthContext";
import { ArrowLeft, Clock, GraduationCap, Info, Send } from "lucide-react";
import LoadingScreen from "../components/LoadingScreen";

export default function MentorshipDetail() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [mentorship, setMentorship] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorshipData, requestsData] = await Promise.all([
          getMentorshipById(id, token),
          user?.role?.includes("student")
            ? getMyRequests(token)
            : Promise.resolve([]),
        ]);
        setMentorship(mentorshipData);
        setMyRequests(requestsData);
      } catch (err) {
        setError(err.message || "Failed to load mentorship details.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [id, token, user]);

  if (loading) {
    return <LoadingScreen fullScreen={true} message="Loading Mentorship..." />;
  }

  if (error || !mentorship) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] flex flex-col items-center justify-center text-red-500 transition-colors duration-300">
        <p>{error || "Mentorship not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  const alumni = mentorship.alumni;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 p-6 md:p-10 font-sans antialiased transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white dark:bg-[#111622] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-[#161d2b] hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-300 text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md mb-8 w-max cursor-pointer"
        >
          <ArrowLeft size={16} className="text-sky-500" /> Back to Search
        </button>

        <div className="bg-white dark:bg-[#111622] p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider border border-sky-200 dark:border-sky-800/50">
                  {mentorship.stage}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {mentorship.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mb-10 border-y border-slate-200 dark:border-slate-800 py-6">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Clock className="text-slate-400 dark:text-slate-500" size={24} />
              <div>
                <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold uppercase tracking-wider">
                  Duration
                </p>
                <p className="font-medium text-lg text-slate-900 dark:text-white">
                  {mentorship.durationInWeeks} Weeks
                </p>
              </div>
            </div>
            {mentorship.startDate && (
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Info
                  className="text-slate-400 dark:text-slate-500"
                  size={24}
                />
                <div>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold uppercase tracking-wider">
                    Started
                  </p>
                  <p className="font-medium text-lg text-slate-900 dark:text-white">
                    {new Date(mentorship.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              About the Program
            </h2>
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-50 dark:bg-[#0b0f17] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              {mentorship.description}
            </div>
          </div>

          {alumni && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Hosted by Mentor
              </h2>
              <Link to={`/profile/${alumni._id}`}>
                <div className="flex items-center gap-5 p-5 bg-slate-50 dark:bg-[#0b0f17] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition-colors cursor-pointer group">
                  {alumni.profileImage ? (
                    <img
                      src={alumni.profileImage}
                      alt={alumni.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xl">
                      {alumni.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {alumni.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                      <GraduationCap size={14} /> {alumni.faculty || "Mentor"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {user?.role?.includes("student") && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Apply for Mentorship
              </h2>

              {(() => {
                // Find if there is a pending request
                const pendingRequest = myRequests.find(
                  (r) => r.mentorship === id && r.status === "pending",
                );
                // Find if there are any previous requests (rejected or accepted but student was removed)
                const previousRequest = myRequests.find(
                  (r) => r.mentorship === id && r.status !== "pending",
                );

                const isEnrolled = mentorship.students.includes(user._id);

                if (isEnrolled) {
                  return (
                    <div className="p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-500/30 text-sky-600 dark:text-sky-400 rounded-xl font-medium">
                      You are already enrolled in this mentorship program!
                    </div>
                  );
                }

                if (pendingRequest) {
                  return (
                    <div className="p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-500/30 rounded-xl">
                      <p className="text-sky-600 dark:text-sky-400 font-medium">
                        Request Status:{" "}
                        <span className="uppercase tracking-wider font-bold ml-2 text-sky-500 dark:text-sky-300">
                          PENDING
                        </span>
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                        Your message: "{pendingRequest.message}"
                      </p>
                    </div>
                  );
                }

                if (mentorship.stage !== "enrollment") {
                  return (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 rounded-xl font-medium">
                      This program is currently {mentorship.stage} and not
                      accepting new students.
                    </div>
                  );
                }

                return (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSending(true);
                      try {
                        const newReq = await createMentorshipRequest(
                          id,
                          message,
                          token,
                        );
                        setMyRequests([...myRequests, newReq]);
                        setMessage(""); // Clear message on success
                      } catch (err) {
                        alert(err.message);
                      } finally {
                        setIsSending(false);
                      }
                    }}
                    className="flex flex-col gap-4"
                  >
                    {previousRequest && (
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 rounded-xl text-sm mb-2">
                        <strong>Note:</strong> You previously applied to this
                        program (Status: {previousRequest.status.toUpperCase()}
                        ). You may submit a new request below to appeal.
                      </div>
                    )}
                    <textarea
                      placeholder={
                        previousRequest
                          ? "Write your appeal request here..."
                          : "Why do you want to join this program? Introduce yourself!"
                      }
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full p-4 rounded-xl bg-slate-50 dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all duration-300 min-h-[120px]"
                    />
                    <button
                      type="submit"
                      disabled={isSending}
                      className="self-end flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-colors shadow-lg shadow-sky-600/20 disabled:opacity-50"
                    >
                      <Send size={18} />{" "}
                      {isSending ? "Sending..." : "Send Request"}
                    </button>
                  </form>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
