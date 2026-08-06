import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import SearchCard from "../components/SearchCard";
import { getUsersByRole } from "../api/userApi";
import { useAuth } from "../hooks/AuthContext";
import { getMentorships } from "../api/mentorshipApi";
import { getActiveOpportunities } from "../api/opportunityApi";

// categoryType prop expects: "mentors", "students", "mentorships", or "opportunities"
export default function Search({ categoryType = "mentors" }) {
  const { token } = useAuth();

  const [faculty, setFaculty] = useState("");
  const [search, setSearch] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Normalise the incoming prop to a canonical category name
  const categoryMap = {
    mentor: "mentors",
    mentors: "mentors",
    mentorships: "mentorships",
    programs: "mentorships",
    student: "students",
    students: "students",
    opportunity: "opportunities",
    opportunities: "opportunities",
  };

  //list of faculties
  const faculties = [
    "Faculty of Humanities and Social Sciences",
    "Faculty of Applied Sciences",
    "Faculty of Management Studies and Commerce",
    "Faculty of Medical Sciences",
    "Faculty of Graduate Studies",
    "Faculty of Technology",
    "Faculty of Engineering",
    "Faculty of Allied Health Sciences",
    "Faculty of Dental Sciences",
    "Faculty of Computing",
    "Faculty of Urban and Aquatic Bioresources",
  ];
  const currentCategory = categoryMap[categoryType.toLowerCase()] || "mentors";

  // Capitalise for the page heading
  const displayTitle =
    currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);

  // Map a raw DB user document to the shape SearchCard expects
  const mapUserToCard = (user) => {
    const isAlumni = user.role?.includes("alumni");

    return {
      _id: user._id,
      itemType: "profile",
      name: user.name,
      imageUrl: user.profileImage || null,
      faculty: user.faculty,
      degree: isAlumni ? null : user.degree,
      // Alumni-specific
      jobTitle: isAlumni
        ? (user.alumniProfile?.employment?.jobTitle ?? null)
        : null,
      company: isAlumni
        ? (user.alumniProfile?.employment?.employer ?? null)
        : null,
      // Student-specific – expose tags as a searchable industry hint
      tags: Array.isArray(user.tags) ? user.tags : [],
    };
  };

  // Map mentorships to cards (when mentorships are implemented)
  const mapMentorshipToCard = (mentorship) => {
    return {
      _id: mentorship._id,
      itemType: "mentorship",
      name: mentorship.title,
      description: mentorship.description,
      duration: mentorship.durationInWeeks + " weeks",
      postedBy: mentorship.alumni?.name,
      faculty: mentorship.alumni?.faculty,
    };
  };

  const mapOpportunityToCard = (opportunity) => {
    return {
      _id: opportunity._id,
      itemType: "opportunity",
      name: opportunity.title,
      company: opportunity.companyName,
      location: opportunity.location,
      type: opportunity.employmentType,
      postedBy: opportunity.postedBy?.name,
    };
  };

  // Fetch data whenever the category or token changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      setResults([]);

      try {
        if (currentCategory === "mentors") {
          // Mentors = alumni users
          const users = await getUsersByRole("alumni", token);
          setResults(users.map(mapUserToCard));
        } else if (currentCategory === "students") {
          // Students = student users
          const users = await getUsersByRole("student", token);
          setResults(users.map(mapUserToCard));
        } else if (currentCategory === "mentorships") {
          const mentorships = await getMentorships(token, "enrollment");
          setResults(mentorships.map(mapMentorshipToCard));
        } else if (currentCategory === "opportunities") {
          const opportunities = await getActiveOpportunities(token);
          setResults(opportunities.map(mapOpportunityToCard));
        }
      } catch (err) {
        setError(err.message || "Failed to load results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [currentCategory, token]);

  //  Client-side filtering on the fetched results
  const filtered = results.filter((item) => {
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    //a bandaid fix for filter faculty being applied to opportunties
    //forces the faculty filter to not apply to opportunties
    const matchesFaculty =
      currentCategory.includes("opportunities") ||
      faculty === "" ||
      (item.faculty ?? "").toLowerCase() === faculty.toLowerCase();

    return matchesSearch && matchesFaculty;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 p-6 pb-24 md:p-10 font-sans antialiased transition-colors duration-300">
      <h1 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-10 tracking-tight">
        Search {displayTitle}
      </h1>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-3 bg-white dark:bg-[#111622] p-2.5 rounded-3xl md:rounded-full border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl hover:shadow-sky-500/5 transition-all duration-300">
          {/* Search Bar */}
          <div className="relative w-full flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-sky-500 transition-colors">
              <SearchIcon size={20} />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${currentCategory}...`}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 md:bg-transparent dark:bg-[#0b0f17] md:dark:bg-transparent rounded-2xl md:rounded-full text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Divider (Desktop) */}
          {!currentCategory.includes("opportunities") && (
            <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-800 mx-2"></div>
          )}

          {/* Faculty Filter */}
          {!currentCategory.includes("opportunities") && (
            <div className="w-full md:w-64 relative flex-shrink-0">
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-slate-50 md:bg-transparent dark:bg-[#0b0f17] md:dark:bg-transparent rounded-2xl md:rounded-full text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer appearance-none transition-colors"
              >
                <option value="" className="bg-white dark:bg-[#111622] text-slate-900 dark:text-slate-100">
                  All Faculties
                </option>
                {faculties.map((f) => (
                  <option key={f} value={f} className="bg-white dark:bg-[#111622] text-slate-900 dark:text-slate-100">
                    {f}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          )}

          {/* Search Button (Desktop) */}
          <button className="hidden md:flex items-center justify-center bg-sky-600 hover:bg-sky-500 text-white p-3.5 rounded-full transition-colors mr-1 shadow-md shadow-sky-600/20">
            <SearchIcon size={18} />
          </button>
        </div>
      </div>

      {/* Status messages & Loaders */}
      {loading && (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-[#111622] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 h-[180px] animate-pulse flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
                </div>
              </div>
              <div className="mt-auto flex gap-2">
                 <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                 <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
           <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-4">
             <span className="text-3xl font-bold">!</span>
           </div>
           <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Results Grid */}
      {!loading && !error && (
        <div className="max-w-6xl mx-auto mt-12">
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <SearchCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-slate-100 dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <SearchIcon size={40} className="text-slate-400 dark:text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                We couldn't find anything matching "{search}". Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
