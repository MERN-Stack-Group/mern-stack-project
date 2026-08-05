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
    <div className="min-h-screen bg-background text-text-primary font-sans antialiased">
      <h1 className="text-4xl font-bold text-center text-primary mb-10 tracking-tight">
        Search {displayTitle}
      </h1>

      <div className="max-w-4xl mx-auto bg-surface p-8 rounded-lg border border-border shadow-md relative overflow-hidden">
        {/* Subtle top border highlight */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-info opacity-80"></div>
        {/* Search Bar */}
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-primary transition-colors">
            <SearchIcon size={20} />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${currentCategory}...`}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface border border-border text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm hover:shadow"
          />
        </div>

        {/* Faculty Filter */}
        {!currentCategory.includes("opportunities") && (
          <div className="mt-6">
            <select
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              className="w-full p-4 rounded-2xl bg-surface border border-border text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer appearance-none shadow-sm hover:shadow"
            >
              <option value="">All Faculties</option>
              {faculties.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Add mentorship / opportunity-specific filters 
            mentorships -> , add duration / seats filters.
            opportunities -> add location / type filters.
         */}
      </div>

      {/* Status messages */}
      {loading && (
        <p className="text-center text-primary mt-10 animate-pulse">
          Loading {currentCategory}…
        </p>
      )}
      {error && <p className="text-center text-danger mt-10">{error}</p>}

      {/* Results Grid */}
      {!loading && !error && (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              let linkTo = `/profile/${item._id}`;
              if (currentCategory === "mentorships") {
                linkTo = `/details/mentorship/${item._id}`;
              } else if (currentCategory === "opportunities") {
                linkTo = `/details/opportunity/${item._id}`;
              }
              return <SearchCard key={item._id} item={item} linkTo={linkTo} />;
            })
          ) : (
            <div className="col-span-full text-center text-text-secondary py-10">
              No results found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
