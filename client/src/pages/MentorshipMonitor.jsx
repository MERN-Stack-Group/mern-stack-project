import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

function MentorshipMonitor() {

  const [mentorships, setMentorships] = useState([
    {
      id: 1,
      mentor: "Kasun Perera",
      mentee: "Nimali Silva",
      topic: "Career Guidance",
      status: "Active",
    },
    {
      id: 2,
      mentor: "Amal Fernando",
      mentee: "Saman Kumara",
      topic: "Software Engineering",
      status: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");

  const deleteMentorship = (id) => {
  const updatedList = mentorships.filter(
    (item) => item.id !== id
  );

  setMentorships(updatedList);
};


  return (
  <div className="flex">

    <AdminSidebar />

    <div className="flex-1 min-h-screen bg-gray-100 p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Mentorship Monitor
        </h1>

        <p className="text-gray-600 mb-6">
          Monitor and manage mentorship activities.
        </p>

<div className="mb-6">
  <input
    type="text"
    placeholder="🔍 Search mentorships..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
   className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          <table className="w-full text-left">

            <thead className="bg-gray-200 text-gray-700">

              <tr>
                <th className="p-4">Mentor</th>
                <th className="p-4">Mentee</th>
                <th className="p-4">Topic</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>

            </thead>


            <tbody>

              {mentorships
            .filter((item) =>
             item.mentor.toLowerCase().includes(search.toLowerCase())
             )
             .map((item) => (

                <tr 
                  key={item.id}
                  className="border-b text-gray-800"
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
                    {item.status}
                  </td>

                  <td className="p-4">

                    <button
                    onClick={() => deleteMentorship(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                 Delete
                </button>

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