import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import SearchCard from "../components/SearchCard";

// categoryType prop expects: "mentors", "students", "mentorships", or "opportunities"
export default function Search({ categoryType = "mentors" }) {
  const [faculty, setFaculty] = useState("");
  const [industry, setIndustry] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  // Map the incoming prop to the correct internal data key
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

  const currentCategory = categoryMap[categoryType.toLowerCase()] || "mentors";

  const data = {
    mentors: [
      {
        name: "Sarah Johnson",
        jobTitle: "Senior Frontend Developer",
        company: "TechNova",
        faculty: "Computing",
        industry: "Software Engineering",
        type: "Professional",
        imageUrl: "https://i.pravatar.cc/150?u=sarah",
        experience: "5+ Years",
      },
      {
        name: "David Perera",
        jobTitle: "Backend Engineer",
        company: "Sysco",
        faculty: "Technology",
        industry: "IT",
        type: "Academic",
        imageUrl: "https://i.pravatar.cc/150?u=david",
        experience: "8 Years",
      },
    ],
    students: [
      {
        name: "John Silva",
        degree: "BSc (Hons) in Software Engineering",
        faculty: "Computing",
        industry: "Software Engineering",
        type: "Student",
        imageUrl: "https://i.pravatar.cc/150?u=john",
        gradYear: "2027",
      },
    ],
    mentorships: [
      {
        name: "Web Development Mastery",
        duration: "6 Month Program",
        postedBy: "Sarah Johnson",
        seatsLeft: 3,
        faculty: "Computing",
        industry: "Software Engineering",
        type: "Program",
      },
    ],
    opportunities: [
      {
        name: "Software Engineering Intern",
        employmentType: "Internship",
        postedBy: "David Perera",
        company: "Sysco",
        location: "Colombo",
        faculty: "Technology",
        industry: "IT",
        type: "Opportunity",
      },
    ],
  };

  const results = (data[currentCategory] || []).filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (faculty === "" || item.faculty === faculty) &&
      (industry === "" || item.industry === industry) &&
      (type === "" || item.type === type)
    );
  });

  // Capitalize the current category for the page title
  const displayTitle =
    currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);

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

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <select
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-[#051811] border border-[#133826] text-emerald-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300 cursor-pointer appearance-none"
          >
            <option value="">All Faculties</option>
            <option>Computing</option>
            <option>Technology</option>
            <option>Engineering</option>
            <option>Medical Sciences</option>
          </select>

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-[#051811] border border-[#133826] text-emerald-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300 cursor-pointer appearance-none"
          >
            <option value="">All Industries</option>
            <option>Software Engineering</option>
            <option>IT</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-[#051811] border border-[#133826] text-emerald-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-300 cursor-pointer appearance-none"
          >
            <option value="">All Types</option>
            <option>Professional</option>
            <option>Academic</option>
            <option>Student</option>
            <option>Program</option>
            <option>Opportunity</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {results.length > 0 ? (
          results.map((item, index) => <SearchCard key={index} item={item} />)
        ) : (
          <div className="col-span-full text-center text-emerald-700 py-10">
            No results found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}