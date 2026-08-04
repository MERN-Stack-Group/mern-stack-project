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

    const matchesFaculty =
      faculty === "" ||
      (item.faculty ?? "").toLowerCase() === faculty.toLowerCase();

    return matchesSearch && matchesFaculty;
  });

  return (
    <div className="min-h-screen bg-[#051811] text-emerald-50 p-6 md:p-10 font-sans antialiased">
      <h1 className="text-4xl font-bold text-center text-emerald-400 mb-10 tracking-tight">
        Search {displayTitle}
      </h1>

      <div className="max-w-4xl mx-auto bg-[#091D14] p-6 md:p-8 rounded-2xl border border-[#133826] shadow-xl">
        {/* Search Bar */}
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-600 group-focus-within:text-emerald-400 transition-colors">
            <SearchIcon size={20} />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${currentCategory}...`}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#051811] border border-[#133826] text-emerald-50 placeholder-emerald-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300 shadow-inner"
          />
        </div>

        {/* Faculty Filter */}
        <div className="mt-6">
          <select
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-[#051811] border border-[#133826] text-emerald-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300 cursor-pointer appearance-none"
          >
            <option value="">All Faculties</option>
            {faculties.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* ── TODO: Add mentorship / opportunity-specific filters here ──────
            When mentorships are implemented, add duration / seats filters.
            When opportunities are implemented, add location / type filters.
        ───────────────────────────────────────────────────────────────────── */}
      </div>

      {/* Status messages */}
      {loading && (
        <p className="text-center text-emerald-500 mt-10 animate-pulse">
          Loading {currentCategory}…
        </p>
      )}
      {error && <p className="text-center text-red-400 mt-10">{error}</p>}

      {/* Results Grid */}
      {!loading && !error && (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filtered.length > 0 ? (
            filtered.map((item) => <SearchCard key={item._id} item={item} />)
          ) : (
            <div className="col-span-full text-center text-emerald-700 py-10">
              No results found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
