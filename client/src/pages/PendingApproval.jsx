import { useState } from "react";

function PendingApproval() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Kasun Perera",
      email: "kasun@gmail.com",
      faculty: "Computing",
      industry: "Software Engineering",
      date: "2026-07-20",
    },
    {
      id: 2,
      name: "Nimali Silva",
      email: "nimali@gmail.com",
      faculty: "Business",
      industry: "Marketing",
      date: "2026-07-21",
    },
    {
      id: 3,
      name: "Amal Fernando",
      email: "amal@gmail.com",
      faculty: "Engineering",
      industry: "IT",
      date: "2026-07-22",
    },
  ]);

  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Approve user
  const approveUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setApprovedCount(approvedCount + 1);
  };

  // Reject user
  const rejectUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setRejectedCount(rejectedCount + 1);
  };

  return (
    
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-purple-50 text-gray-800"
      }`}
    >

      {/* Main Content */}
     <main
  className={`flex-1 p-10 ${
    darkMode ? "bg-gray-900 text-white" : "bg-purple-50 text-gray-800"
  }`}
>
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Pending Alumni Approvals
            </h1>

            <p className="text-gray-500">
              Review and manage alumni registration requests.
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-purple-600 text-white px-5 py-3 rounded-lg"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        {/* Summary Cards */}
<section className="grid grid-cols-3 gap-5 mb-10">

  {/* Pending Requests */}
  <div
    className={`p-6 rounded-xl shadow ${
      darkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    <h3 className={darkMode ? "text-white" : "text-gray-500"}>
      Pending Requests
    </h3>

    <p className="text-3xl font-bold text-purple-600">
      {users.length}
    </p>
  </div>


  {/* Approved */}
  <div
    className={`p-6 rounded-xl shadow ${
      darkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    <h3 className={darkMode ? "text-white" : "text-gray-500"}>
      Approved
    </h3>

    <p className="text-3xl font-bold text-purple-600">
      {approvedCount}
    </p>
  </div>


  {/* Rejected */}
  <div
    className={`p-6 rounded-xl shadow ${
      darkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    <h3 className={darkMode ? "text-white" : "text-gray-500"}>
      Rejected
    </h3>

    <p className="text-3xl font-bold text-purple-600">
      {rejectedCount}
    </p>
  </div>

</section>

        {/* Alumni Table */}
        <section
  className={`p-6 rounded-xl shadow ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
  }`}
>
          <h2 className="text-xl font-bold mb-5">
            Alumni Registration Requests
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={darkMode ? "bg-purple-900 text-white" : "bg-purple-100 text-gray-800"}>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Faculty</th>
                  <th className="p-3 text-left">Industry</th>
                  <th className="p-3 text-left">Registered Date</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
  key={user.id}
  className={`border-b ${
    darkMode ? "text-white border-gray-600" : "text-gray-800"
  }`}
>
                    <td className="p-3">{user.name}</td>

                    <td className="p-3">{user.email}</td>

                    <td className="p-3">{user.faculty}</td>

                    <td className="p-3">{user.industry}</td>

                    <td className="p-3">{user.date}</td>

                    <td className="p-3">
                      <button
                        onClick={() => approveUser(user.id)}
                        className="bg-purple-600 text-white px-3 py-2 rounded mr-2"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectUser(user.id)}
                        className="bg-purple-100 text-purple-700 px-3 py-2 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                No pending approval requests.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default PendingApproval;
