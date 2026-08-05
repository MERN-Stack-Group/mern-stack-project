import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOpportunityById } from "../api/opportunityApi";
import { useAuth } from "../hooks/AuthContext";
import { ArrowLeft, Building, MapPin, Briefcase, Mail, UserCircle } from "lucide-react";

export default function OpportunityDetail() {
  const { id } = useParams();
  const { token } = useAuth();
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
    if (token) fetchOpportunity();
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#051811] flex items-center justify-center text-emerald-500 animate-pulse">
        Loading Opportunity...
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen bg-[#051811] flex flex-col items-center justify-center text-red-400">
        <p>{error || "Opportunity not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-emerald-500 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  const postedBy = opportunity.postedBy;

  return (
    <div className="min-h-screen bg-[#051811] text-emerald-50 p-6 md:p-10 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-emerald-500 hover:text-emerald-300 transition-colors flex items-center gap-2 mb-8"
        >
          <ArrowLeft size={18} /> Back to Search
        </button>

        <div className="bg-[#091D14] p-8 md:p-10 rounded-3xl border border-[#133826] shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {opportunity.tags && opportunity.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-emerald-900/40 text-emerald-300 text-xs font-medium border border-emerald-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-emerald-400 tracking-tight leading-tight">
                {opportunity.title}
              </h1>
            </div>
            <a
              href={`mailto:${opportunity.applicationEmail}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-lg hover:shadow-emerald-900/50 whitespace-nowrap"
            >
              <Mail size={18} /> Apply Now
            </a>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-6 mb-10 border-y border-[#133826] py-6">
            <div className="flex items-center gap-3 text-emerald-100/80">
              <Building className="text-emerald-500" size={24} />
              <div>
                <p className="text-xs text-emerald-500 font-semibold uppercase tracking-wider">Company</p>
                <p className="font-medium text-lg">{opportunity.companyName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-emerald-100/80">
              <Briefcase className="text-emerald-500" size={24} />
              <div>
                <p className="text-xs text-emerald-500 font-semibold uppercase tracking-wider">Type</p>
                <p className="font-medium text-lg capitalize">{opportunity.opportunityType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-emerald-100/80">
              <MapPin className="text-emerald-500" size={24} />
              <div>
                <p className="text-xs text-emerald-500 font-semibold uppercase tracking-wider">Location</p>
                <p className="font-medium text-lg capitalize">{opportunity.location}</p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-emerald-300 mb-4">Job Description</h2>
            <div className="text-emerald-50/80 leading-relaxed whitespace-pre-wrap bg-[#051811] p-6 rounded-2xl border border-[#133826]">
              {opportunity.description}
            </div>
          </div>

          {postedBy && (
            <div>
              <h2 className="text-xl font-bold text-emerald-300 mb-4">Posted By</h2>
              <Link to={`/profile/${postedBy._id}`}>
                <div className="flex items-center gap-5 p-5 bg-[#051811] rounded-2xl border border-[#133826] hover:border-emerald-500/50 transition-colors cursor-pointer group">
                  {postedBy.profileImage ? (
                    <img
                      src={postedBy.profileImage}
                      alt={postedBy.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-emerald-900/50"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-emerald-900/50 flex items-center justify-center border-2 border-emerald-800/50 text-emerald-300 font-bold text-xl">
                      {postedBy.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-emerald-100 group-hover:text-emerald-300 transition-colors">
                      {postedBy.name}
                    </h3>
                    <p className="text-sm text-emerald-500 flex items-center gap-1.5 mt-1">
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
