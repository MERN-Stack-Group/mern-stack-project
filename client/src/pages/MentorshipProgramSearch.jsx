import { useState } from "react";

function MentorshipProgramSearch() {

    const [search, setSearch] = useState("");

    const programs = [
        {
            name: "Frontend Development Mentorship",
            organization: "Tech Community",
            duration: "3 Months",
            category: "Web Development",
            seats: "10 Seats Available"
        },
        {
            name: "Data Science Career Program",
            organization: "AI Academy",
            duration: "6 Months",
            category: "Data Science",
            seats: "5 Seats Available"
        },
        {
            name: "UI/UX Design Mentorship",
            organization: "Design Hub",
            duration: "4 Months",
            category: "Design",
            seats: "8 Seats Available"
        }
    ];


    return (
        <div className="min-h-screen bg-[#120818] text-white p-10">

            <h1 className="text-4xl font-bold text-center text-purple-200 mb-10">
                Search Mentorship Programs
            </h1>


            {/* Search Box */}
            <div className="max-w-2xl mx-auto bg-[#1A0F24] p-8 rounded-2xl border border-[#6B116E]">

                <label className="block mb-3 text-gray-300">
                    Program Name
                </label>

                <input
                    type="text"
                    placeholder="Search programs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#120818] border border-[#6B116E] text-white outline-none"
                />

                <button className="mt-5 w-full bg-[#6B116E] hover:bg-[#7E22CE] p-3 rounded-lg font-semibold transition">
                    Search
                </button>

            </div>


            {/* Program Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">

                {programs
                    .filter((program) =>
                        program.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((program, index) => (

                    <div
                        key={index}
                        className="bg-[#1A0F24] p-6 rounded-2xl border border-[#6B116E] hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition duration-300"
                    >

                        {/* Icon Circle */}
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#7E22CE] to-[#4A044E] flex items-center justify-center text-2xl font-bold">
                            P
                        </div>


                        <h2 className="text-xl font-bold text-center mt-4 text-purple-200">
                            {program.name}
                        </h2>


                        <p className="text-center text-gray-300 mt-3">
                            {program.organization}
                        </p>


                        <p className="text-gray-400 mt-4">
                            Duration: {program.duration}
                        </p>


                        <p className="text-purple-200 mt-3">
                            {program.category}
                        </p>


                        <p className="text-green-400 mt-3 font-semibold">
                            ● {program.seats}
                        </p>


                        <button className="mt-5 w-full bg-[#6B116E] hover:bg-[#7E22CE] p-3 rounded-lg font-semibold transition">
                            Apply Now
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default MentorshipProgramSearch;