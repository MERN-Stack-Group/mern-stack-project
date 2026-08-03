import { useState } from "react";
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

  const deleteMentorship = (id) => {
  const updatedList = mentorships.filter(
    (item) => item.id !== id
  );

  setMentorships(updatedList);
};


  return (
    <div className="flex">

      <div className="flex-1 min-h-screen bg-gray-100 p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Mentorship Monitor
        </h1>

        <p className="text-gray-600 mb-6">
          Monitor and manage mentorship activities.
        </p>


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

              {mentorships.map((item) => (

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