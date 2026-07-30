import { useState } from "react";

function MentorSearch() {

    const [search, setSearch] = useState("");

    const mentors = [
        {
            name: "Sarah Johnson",
            role: "Frontend Developer",
            skills: ["React", "JavaScript", "UI Design"],
            experience: "5 Years Experience",
            available: true
        },
        {
            name: "David Perera",
            role: "Backend Engineer",
            skills: ["Node.js", "MongoDB", "Express"],
            experience: "4 Years Experience",
            available: false
        },
        {
            name: "Emma Wilson",
            role: "UI/UX Designer",
            skills: ["Figma", "Design", "Prototyping"],
            experience: "3 Years Experience",
            available: true
        }
    ];


    return (
        <div className="min-h-screen bg-[#120818] text-white p-10">

            <h1 className="text-4xl font-bold text-center text-purple-200 mb-10">
                Search Mentors
            </h1>


            {/* Search Box */}
            <div className="max-w-2xl mx-auto bg-[#1A0F24] p-8 rounded-2xl border border-[#6B116E]">

                <label className="block mb-3 text-gray-300">
                    Mentor Name
                </label>

                <input
                    type="text"
                    placeholder="Enter mentor name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#120818] border border-[#6B116E] text-white outline-none"
                />

                <button className="mt-5 w-full bg-[#6B116E] hover:bg-[#7E22CE] p-3 rounded-lg font-semibold transition">
                    Search
                </button>

            </div>


            {/* Mentor Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">

                {mentors
                    .filter((mentor) =>
                        mentor.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((mentor, index) => (

                    <div
                        key={index}
                        className="bg-[#1A0F24] p-6 rounded-2xl border border-[#6B116E] hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition duration-300"
                    >

                        {/* Profile Circle */}
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#7E22CE] to-[#4A044E] flex items-center justify-center text-3xl font-bold shadow-lg">
                            {mentor.name.charAt(0)}
                        </div>


                        <h2 className="text-xl font-bold text-center mt-4 text-purple-200">
                            {mentor.name}
                        </h2>


                        <p className="text-center text-gray-300 mt-2">
                            {mentor.role}
                        </p>


                        <p className="text-sm text-gray-400 mt-4">
                            Skills:
                        </p>


                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {mentor.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-[#6B116E]/30 text-purple-200 px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>


                        {/* Experience */}
                        <p className="text-gray-300 mt-4">
                            {mentor.experience}
                        </p>


                        {/* Availability */}
                        <p className={`mt-3 text-sm font-semibold ${
                            mentor.available 
                            ? "text-green-400" 
                            : "text-red-400"
                        }`}>
                            {mentor.available ? "● Available" : "● Not Available"}
                        </p>


                        <button className="mt-5 w-full bg-[#6B116E] hover:bg-[#7E22CE] p-3 rounded-lg font-semibold transition">
                            View Profile
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default MentorSearch;