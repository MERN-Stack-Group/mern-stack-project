import { useState } from "react";

export default function Search() {

  const [category, setCategory] = useState("mentors");
  const [faculty, setFaculty] = useState("");
  const [industry, setIndustry] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");


  const mentors = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      faculty: "Computing",
      industry: "Software Engineering",
      type: "Professional"
    },
    {
      name: "David Perera",
      role: "Backend Engineer",
      faculty: "Technology",
      industry: "IT",
      type: "Academic"
    },
    {
      name: "Emma Wilson",
      role: "UI/UX Designer",
      faculty: "Computing",
      industry: "Design",
      type: "Professional"
    }
  ];


  const filteredMentors = mentors.filter((mentor) => {

    return (
      mentor.name.toLowerCase().includes(search.toLowerCase()) &&
      (faculty === "" || mentor.faculty === faculty) &&
      (industry === "" || mentor.industry === industry) &&
      (type === "" || mentor.type === type)
    );

  });


  return (

    <div className="min-h-screen bg-[#120818] text-white p-10">


      <h1 className="text-4xl font-bold text-center text-purple-200 mb-10">
        Search
      </h1>


      {/* Filters */}

      <div className="max-w-4xl mx-auto bg-[#1A0F24] p-8 rounded-2xl border border-[#6B116E]">


        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#120818] border border-[#6B116E]"
        />


        <label className="block mt-5 mb-2">
          Category
        </label>

        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#120818] border border-[#6B116E]"
        >
          <option value="mentors">Mentors</option>
          <option value="students">Students</option>
          <option value="programs">Programs</option>
          <option value="opportunities">Opportunities</option>
        </select>



        <label className="block mt-5 mb-2">
          Faculty
        </label>

        <select
          value={faculty}
          onChange={(e)=>setFaculty(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#120818] border border-[#6B116E]"
        >
          <option value="">All Faculties</option>
          <option>Computing</option>
          <option>Engineering</option>
          <option>Technology</option>
          <option>Medical Sciences</option>
          <option>Management Studies and Commerce</option>
          <option>Applied Sciences</option>
          <option>Humanities and Social Sciences</option>
        </select>



        <label className="block mt-5 mb-2">
          Industry
        </label>

        <select
          value={industry}
          onChange={(e)=>setIndustry(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#120818] border border-[#6B116E]"
        >
          <option value="">All Industries</option>
          <option>Software Engineering</option>
          <option>IT</option>
          <option>Research</option>
          <option>Healthcare</option>
          <option>Business</option>
          <option>Design</option>
        </select>



        <label className="block mt-5 mb-2">
          Type
        </label>

        <select
          value={type}
          onChange={(e)=>setType(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#120818] border border-[#6B116E]"
        >
          <option value="">All Types</option>
          <option>Academic</option>
          <option>Professional</option>
          <option>Research</option>
        </select>


      </div>



      {/* Results */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">


        {category === "mentors" && filteredMentors.map((mentor,index)=>(

          <div
            key={index}
            className="bg-[#1A0F24] p-6 rounded-2xl border border-[#6B116E]"
          >

            <h2 className="text-xl font-bold text-purple-200">
              {mentor.name}
            </h2>

            <p className="mt-2">
              {mentor.role}
            </p>

            <p className="text-gray-300 mt-3">
              Faculty: {mentor.faculty}
            </p>

            <p className="text-gray-300">
              Industry: {mentor.industry}
            </p>

            <p className="text-gray-300">
              Type: {mentor.type}
            </p>

          </div>

        ))}


      </div>


    </div>

  );
}