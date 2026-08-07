import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOpportunityById } from "../api/opportunityApi";
import { useAuth } from "../hooks/AuthContext";
import { ArrowLeft, Building, MapPin, Briefcase, Mail, UserCircle } from "lucide-react";
import LoadingScreen from "../components/LoadingScreen";

export default function OpportunityDetail() {
  const { id } = useParams();
  const { token, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const data = await getOpportunityById(id, token);
        setOpportunity(data);
      } catch (err) {
        setError(err.message || "Failed to load opportunity details.");
      } finally {
        setLoading(false);
      }
    };
    if (token && !authLoading) fetchOpportunity();
  }, [id, token, authLoading]);

  if (loading) {
    return <LoadingScreen fullScreen={true} message="Loading Opportunity..." />;
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen bg-slate-300 dark:bg-[#0b0f17] flex flex-col items-center justify-center text-red-500 transition-colors duration-300">
        <p>{error || "Opportunity not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  const postedBy = opportunity.postedBy;

  return (
    <div className="min-h-screen bg-slate-300 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 p-6 pb-24 md:p-10 font-sans antialiased transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-slate-200 dark:bg-[#111622] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-300 dark:hover:bg-[#161d2b] hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-300 text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md mb-8 w-max cursor-pointer"
        >
          <ArrowLeft size={16} className="text-sky-500" /> Back to Search
        </button>

        <div className="bg-slate-200 dark:bg-[#111622] p-5 sm:p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {opportunity.tags && opportunity.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-slate-200 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 text-xs font-medium border border-sky-200 dark:border-sky-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {opportunity.title}
              </h1>
            </div>
            <a
              href={`mailto:${opportunity.applicationEmail}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-slate-2000 text-white font-bold text-sm transition-colors shadow-lg shadow-sky-600/20 whitespace-nowrap"
            >
              <Mail size={18} /> Apply Now
            </a>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-x-10 gap-y-6 mb-10 border-y border-slate-200 dark:border-slate-800 py-6">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Building className="text-slate-400 dark:text-slate-500" size={24} />
              <div>
                <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold uppercase tracking-wider">Company</p>
                <p className="font-medium text-lg text-slate-900 dark:text-white">{opportunity.companyName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Briefcase className="text-slate-400 dark:text-slate-500" size={24} />
              <div>
                <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold uppercase tracking-wider">Type</p>
                <p className="font-medium text-lg text-slate-900 dark:text-white capitalize">{opportunity.opportunityType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <MapPin className="text-slate-400 dark:text-slate-500" size={24} />
              <div>
                <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold uppercase tracking-wider">Location</p>
                <p className="font-medium text-lg text-slate-900 dark:text-white capitalize">{opportunity.location}</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Job Description</h2>
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-300 dark:bg-[#0b0f17] p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              {opportunity.description}
            </div>
          </div>

          {postedBy && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Posted By</h2>
              <Link to={`/profile/${postedBy._id}`}>
                <div className="flex items-center gap-5 p-5 bg-slate-300 dark:bg-[#0b0f17] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition-colors cursor-pointer group">
                  {postedBy.profileImage ? (
                    <img
                      src={postedBy.profileImage}
                      alt={postedBy.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-300 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xl">
                      {postedBy.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {postedBy.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                      <UserCircle size={14} /> {postedBy.faculty || "Alumni Network"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
