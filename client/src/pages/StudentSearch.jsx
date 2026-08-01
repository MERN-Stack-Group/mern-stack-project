import { useState } from "react";

function StudentSearch() {
  const [search, setSearch] = useState("");

  const students = [
    {
      name: "John Silva",
      major: "Computer Science",
      year: "3rd Year",
    },
    {
      name: "Nimal Perera",
      major: "Information Technology",
      year: "2nd Year",
    },
    {
      name: "Kavindi Fernando",
      major: "Software Engineering",
      year: "4th Year",
    },
  ];

  return (
    <div className="min-h-screen bg-[#120818] text-white p-10">
      <h1 className="text-4xl font-bold text-center text-purple-200 mb-10">
        Search Students
      </h1>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto bg-[#1A0F24] p-8 rounded-2xl border border-[#6B116E]">
        <label className="block mb-3 text-gray-300">
          Student Name
        </label>

        <input
          type="text"
          placeholder="Enter student name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#120818] border border-[#6B116E] text-white outline-none"
        />

        <button className="mt-5 w-full bg-[#6B116E] hover:bg-[#7E22CE] p-3 rounded-lg font-semibold">
          Search
        </button>
      </div>

      {/* Student Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
        {students
          .filter((student) =>
            student.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((student, index) => (
            <div
              key={index}
              className="bg-[#1A0F24] p-6 rounded-2xl border border-[#6B116E] hover:shadow-lg transition"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#7E22CE] to-[#4A044E] flex items-center justify-center text-3xl font-bold">
                {student.name.charAt(0)}
              </div>

              <h2 className="text-xl font-bold text-center mt-4 text-purple-200">
                {student.name}
              </h2>

              <p className="text-center text-gray-300 mt-2">
                {student.major}
              </p>

              <p className="text-center text-gray-400 mt-2">
                {student.year}
              </p>

              <button className="mt-5 w-full bg-[#6B116E] hover:bg-[#7E22CE] p-3 rounded-lg font-semibold">
                View Profile
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default StudentSearch;