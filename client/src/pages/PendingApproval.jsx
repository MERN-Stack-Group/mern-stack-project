import { useState } from "react";

function PendingApproval() {
  const [users, setUsers] = useState([
  {
  id: 1,
  name: "Kasun Perera",
  nic: "200012345678",
  email: "kasun@gmail.com",
  faculty: "Computing",
  industry: "Software Engineering",
  date: "2026-07-20",
  },
  {
  id: 2,
  name: "Nimali Silva",
  nic: "199856789012",
  email: "nimali@gmail.com",
  faculty: "Business",
  industry: "Marketing",
  date: "2026-07-21",
  },
    {
      id: 3,
      name: "Amal Fernando",
      nic: "199912345678",
      email: "amal@gmail.com",
      faculty: "Engineering",
      industry: "IT",
      date: "2026-07-22",
    },
  ]);
 const [approvedUsers, setApprovedUsers] = useState([]);

const [rejectedUsers, setRejectedUsers] = useState([]);

const [selectedView, setSelectedView] = useState("pending");
  
  const [darkMode, setDarkMode] = useState(false);

  // Approve user
 const approveUser = (id) => {

  const pendingUser = users.find(
    (user) => user.id === id
  );

  const rejectedUser = rejectedUsers.find(
    (user) => user.id === id
  );


  const userToApprove = pendingUser || rejectedUser;


  if (!userToApprove) return;

  setApprovedUsers([
    ...approvedUsers,
    userToApprove
  ]);

  setUsers(
    users.filter(
      (user) => user.id !== id
    )
  );

  setRejectedUsers(
    rejectedUsers.filter(
      (user) => user.id !== id
    )
  );

};

  // Reject user
  const rejectUser = (id) => {

  const pendingUser = users.find(
    (user) => user.id === id
  );


  const approvedUser = approvedUsers.find(
    (user) => user.id === id
  );


  const userToReject = pendingUser || approvedUser;


  if (!userToReject) return;

  setRejectedUsers([
    ...rejectedUsers,
    userToReject
  ]);

  setUsers(
    users.filter(
      (user) => user.id !== id
    )
  );

  setApprovedUsers(
    approvedUsers.filter(
      (user) => user.id !== id
    )
  );

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
   <h3
onClick={() => setSelectedView("pending")}
className="cursor-pointer hover:text-purple-600"
>
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
    <h3
onClick={() => setSelectedView("approved")}
className="cursor-pointer hover:text-purple-600"
>
  Approved
</h3>

<p className="text-3xl font-bold text-purple-600">
  {approvedUsers.length}
</p>
  </div>


  {/* Rejected */}
  <div
    className={`p-6 rounded-xl shadow ${
      darkMode ? "bg-gray-800" : "bg-white"
    }`}
  >
    <h3
onClick={() => setSelectedView("rejected")}
className="cursor-pointer hover:text-purple-600"
>
  Rejected
</h3>

<p className="text-3xl font-bold text-purple-600">
  {rejectedUsers.length}
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

{
 selectedView === "pending"
 ? "Pending Requests"
 : selectedView === "approved"
 ? "Approved Alumni"
 : "Rejected Alumni"
}

</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={darkMode ? "bg-purple-900 text-white" : "bg-purple-100 text-gray-800"}>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">NIC</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Faculty</th>
                  <th className="p-3 text-left">Industry</th>
                  <th className="p-3 text-left">Registered Date</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {(
 selectedView === "pending"
 ? users
 : selectedView === "approved"
 ? approvedUsers
 : rejectedUsers
).map((user)=>(
                  <tr
  key={user.id}
  className={`border-b ${
    darkMode ? "text-white border-gray-600" : "text-gray-800"
  }`}
>
                    <td className="p-3">{user.name}</td>

                    <td className="p-3">{user.nic}</td>

                    <td className="p-3">{user.email}</td>

                    <td className="p-3">{user.faculty}</td>

                    <td className="p-3">{user.industry}</td>

                    <td className="p-3">{user.date}</td>

                    <td className="p-3">

  {selectedView === "pending" && (
    <>
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
    </>
  )}


  {selectedView === "approved" && (
  <>
    <span className="text-green-600 font-bold mr-3">
      Approved
    </span>

    <button
      onClick={() => rejectUser(user.id)}
      className="bg-red-500 text-white px-3 py-2 rounded"
    >
      Reject
    </button>
  </>
)}


{selectedView === "rejected" && (
  <>
    <span className="text-red-600 font-bold mr-3">
      Rejected
    </span>

    <button
      onClick={() => approveUser(user.id)}
      className="bg-purple-600 text-white px-3 py-2 rounded"
    >
      Approve
    </button>
  </>
)}

</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedView === "pending" && users.length === 0 && (
  <p className="text-center text-gray-500 py-6">
    No pending approval requests.
  </p>
)}


{selectedView === "approved" && approvedUsers.length === 0 && (
  <p className="text-center text-gray-500 py-6">
    No approved users yet.
  </p>
)}


{selectedView === "rejected" && rejectedUsers.length === 0 && (
  <p className="text-center text-gray-500 py-6">
    No rejected users yet.
  </p>
)}
          </div>
        </section>
      </main>
    </div>
  );
}

export default PendingApproval;
