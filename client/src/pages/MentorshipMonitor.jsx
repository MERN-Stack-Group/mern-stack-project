import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getAllMentorshipsAdmin } from "../api/mentorshipApi";
import LoadingScreen, { useMinLoading } from "../components/LoadingScreen";

function MentorshipMonitor() {
  const [mentorships, setMentorships] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const showLoading = useMinLoading(loading);

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        const data = await getAllMentorshipsAdmin();
        const formatted = data.map((item) => ({
          id: item._id,
          mentor: item.alumni ? item.alumni.name : "Unknown",
          mentee: item.students ? `${item.students.length} Enrolled` : "0 Enrolled",
          topic: item.title,
          status: item.stage === "active" ? "Active" : item.stage === "completed" ? "Completed" : "Pending",
        }));
        setMentorships(formatted);
      } catch (error) {
        console.error("Failed to fetch mentorships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorships();
  }, []);

  if (showLoading) {
    return <LoadingScreen fullScreen={true} message="Loading Monitor..." />;
  }

  return (
  <div className="flex">
    <AdminSidebar />
    <div className="flex-1 min-h-screen bg-[#0b0f17] text-slate-200 p-8">
        <h1 className="text-3xl font-bold text-white mb-6">
          Mentorship Monitor
        </h1>
        <p className="text-slate-400 mb-6">
          Monitor and manage mentorship activities.
        </p>

<div className="mb-6">
  <input
    type="text"
    placeholder="Search mentorships..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
   className="w-full md:w-80 px-4 py-2 border border-slate-700 rounded-lg text-slate-200 bg-[#111622] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
  />
</div>
        <div className="bg-[#111622] rounded-xl shadow-md overflow-hidden border border-slate-800">
          <table className="w-full text-left">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-4 font-semibold">Mentor</th>
                <th className="p-4 font-semibold">Mentees</th>
                <th className="p-4 font-semibold">Topic</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {mentorships
            .filter((item) =>
             item.mentor.toLowerCase().includes(search.toLowerCase()) || 
             item.topic.toLowerCase().includes(search.toLowerCase())
             )
             .map((item) => (
                <tr 
                  key={item.id}
                  className="border-b border-slate-800 text-slate-300 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="p-4">
                    {item.mentor}
                  </td>
                  <td className="p-4">
                    {item.mentee}
                  </td>
                  <td className="p-4">
                    {item.topic}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : item.status === 'Completed' ? 'bg-sky-500/20 text-sky-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MentorshipMonitor;