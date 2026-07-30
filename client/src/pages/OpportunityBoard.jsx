function OpportunityBoard() {

    const opportunities = [
        {
            title: "Frontend Developer Intern",
            company: "Tech Solutions",
            type: "Internship",
            skills: ["React", "JavaScript", "CSS"],
            deadline: "August 15, 2026"
        },
        {
            title: "MERN Stack Project Opportunity",
            company: "Startup Hub",
            type: "Project",
            skills: ["MongoDB", "Express", "React", "Node.js"],
            deadline: "September 1, 2026"
        },
        {
            title: "UI/UX Design Volunteer",
            company: "Creative Community",
            type: "Volunteer",
            skills: ["Figma", "Prototyping"],
            deadline: "August 30, 2026"
        }
    ];


    return (
        <div className="min-h-screen bg-[#120818] text-white p-10">

            <h1 className="text-4xl font-bold text-center text-purple-200 mb-10">
                Opportunity Board
            </h1>


            {/* Search Box */}
            <div className="max-w-2xl mx-auto bg-[#1A0F24] p-8 rounded-2xl border border-[#6B116E]">

                <label className="block mb-3 text-gray-300">
                    Search Opportunities
                </label>

                <input
                    type="text"
                    placeholder="Search opportunities..."
                    className="w-full p-3 rounded-lg bg-[#120818] border border-[#6B116E] text-white outline-none"
                />

                <button className="mt-5 w-full bg-[#6B116E] hover:bg-[#7E22CE] p-3 rounded-lg font-semibold transition">
                    Search
                </button>

            </div>


            {/* Opportunity Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">

                {opportunities.map((opportunity, index) => (

                    <div
                        key={index}
                        className="bg-[#1A0F24] p-6 rounded-2xl border border-[#6B116E] hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition duration-300"
                    >

                        {/* Opportunity Icon */}
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#7E22CE] to-[#4A044E] flex items-center justify-center text-2xl font-bold">
                            O
                        </div>


                        <h2 className="text-xl font-bold text-center mt-4 text-purple-200">
                            {opportunity.title}
                        </h2>


                        <p className="text-center text-gray-300 mt-3">
                            {opportunity.company}
                        </p>


                        <p className="text-purple-200 mt-3 text-center">
                            {opportunity.type}
                        </p>


                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mt-4">

                            {opportunity.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-[#6B116E]/30 text-purple-200 px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}

                        </div>


                        <p className="text-gray-400 mt-4">
                            Deadline: {opportunity.deadline}
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

export default OpportunityBoard;