import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../hooks/AuthContext";
import { getAllAlumni, approveAlumniRequest, rejectAlumniRequest } from "../api/userApi";
import LoadingScreen, { useMinLoading } from "../components/LoadingScreen";

function PendingApproval() {
  const [users, setUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);

  // Tracks which table view is currently active
  const [selectedView, setSelectedView] = useState("pending");
  const [darkMode, setDarkMode] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const showLoading = useMinLoading(loading);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const data = await getAllAlumni();
        
        // Categorize based on alumniProfile status
        const pending = [];
        const approved = [];
        const rejected = [];
        
        data.forEach(user => {
          const profile = user.alumniProfile || {};
          const formattedUser = {
            id: user._id,
            name: user.name,
            nic: profile.NIC || "N/A",
            email: user.email,
            faculty: user.faculty,
            industry: profile.employment?.jobTitle ? `${profile.employment.jobTitle} at ${profile.employment.employer}` : "N/A",
            date: new Date(user.createdAt).toLocaleDateString(),
          };

          if (profile.approved) {
            approved.push(formattedUser);
          } else if (profile.rejected) {
            rejected.push(formattedUser);
          } else {
            pending.push(formattedUser);
          }
        });
        
        setUsers(pending);
        setApprovedUsers(approved);
        setRejectedUsers(rejected);
      } catch (error) {
        console.error("Failed to fetch alumni:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAlumni();
  }, []);

  // Moves a user from pending/rejected to the approved list
  const approveUser = async (id) => {
    try {
      await approveAlumniRequest(id);
      
      const pendingUser = users.find((user) => user.id === id);
      const rejectedUser = rejectedUsers.find((user) => user.id === id);
      const userToApprove = pendingUser || rejectedUser;

      if (!userToApprove) return;

      setApprovedUsers([...approvedUsers, userToApprove]);
      setUsers(users.filter((user) => user.id !== id));
      setRejectedUsers(rejectedUsers.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to approve user");
    }
  };

  // Moves a user from pending/approved to the rejected list
  const rejectUser = async (id) => {
    try {
      await rejectAlumniRequest(id);
      
      const pendingUser = users.find((user) => user.id === id);
      const approvedUser = approvedUsers.find((user) => user.id === id);
      const userToReject = pendingUser || approvedUser;

      if (!userToReject) return;

      setRejectedUsers([...rejectedUsers, userToReject]);
      setUsers(users.filter((user) => user.id !== id));
      setApprovedUsers(approvedUsers.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to reject user");
    }
  };

  if (showLoading) {
    return <LoadingScreen fullScreen={true} message="Loading Dashboard..." />;
  }

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-purple-50 text-gray-800"
      }`}
      
    >
      <AdminSidebar />
      <main className="flex-1 p-10">
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
            <p className="text-gray-500 mt-1">
              Review and manage alumni registration requests.
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-5 py-3 rounded-lg font-medium"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {/* Pending Requests Card */}
          <div
            onClick={() => setSelectedView("pending")}
            className={`p-6 rounded-xl shadow cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-slate-200"
            } ${selectedView === "pending" ? "ring-2 ring-purple-600" : ""}`}
          >
            <h3 className="text-lg font-semibold mb-2">Pending Requests</h3>
            <p className="text-3xl font-bold text-purple-600">{users.length}</p>
          </div>

          {/* Approved Card */}
          <div
            onClick={() => setSelectedView("approved")}
            className={`p-6 rounded-xl shadow cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-slate-200"
            } ${selectedView === "approved" ? "ring-2 ring-purple-600" : ""}`}
          >
            <h3 className="text-lg font-semibold mb-2">Approved</h3>
            <p className="text-3xl font-bold text-purple-600">
              {approvedUsers.length}
            </p>
          </div>

          {/* Rejected Card */}
          <div
            onClick={() => setSelectedView("rejected")}
            className={`p-6 rounded-xl shadow cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-slate-200"
            } ${selectedView === "rejected" ? "ring-2 ring-purple-600" : ""}`}
          >
            <h3 className="text-lg font-semibold mb-2">Rejected</h3>
            <p className="text-3xl font-bold text-purple-600">
              {rejectedUsers.length}
            </p>
          </div>
        </section>

        {/* Alumni Table */}
        <section
          className={`p-6 rounded-xl shadow ${
            darkMode ? "bg-gray-800 text-white" : "bg-slate-200 text-gray-800"
          }`}
        >
          <h2 className="text-xl font-bold mb-5">
            {selectedView === "pending"
              ? "Pending Requests"
              : selectedView === "approved"
                ? "Approved Alumni"
                : "Rejected Alumni"}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={
                    darkMode
                      ? "bg-purple-900 text-white"
                      : "bg-purple-100 text-gray-800"
                  }
                >
                  <th className="p-3 text-left rounded-tl-lg">Name</th>
                  <th className="p-3 text-left">NIC</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Faculty</th>
                  <th className="p-3 text-left">Industry</th>
                  <th className="p-3 text-left">Registered Date</th>
                  <th className="p-3 text-left rounded-tr-lg">Action</th>
                </tr>
              </thead>

              <tbody>
                {(selectedView === "pending"
                  ? users
                  : selectedView === "approved"
                    ? approvedUsers
                    : rejectedUsers
                ).map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b hover:bg-opacity-50 transition-colors ${
                      darkMode
                        ? "text-white border-gray-700 hover:bg-gray-700"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.nic}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.faculty}</td>
                    <td className="p-3">{user.industry}</td>
                    <td className="p-3">{user.date}</td>
                    <td className="p-3">
                      {/* Actions for Pending view */}
                      {selectedView === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveUser(user.id)}
                            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-2 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectUser(user.id)}
                            className="bg-purple-100 hover:bg-purple-200 transition-colors text-purple-700 px-3 py-2 rounded"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Actions for Approved view */}
                      {selectedView === "approved" && (
                        <div className="flex items-center gap-3">
                          <span className="text-green-600 font-bold">
                            Approved
                          </span>
                          <button
                            onClick={() => rejectUser(user.id)}
                            className="bg-red-500 hover:bg-red-600 transition-colors text-white px-3 py-2 rounded text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Actions for Rejected view */}
                      {selectedView === "rejected" && (
                        <div className="flex items-center gap-3">
                          <span className="text-red-600 font-bold">
                            Rejected
                          </span>
                          <button
                            onClick={() => approveUser(user.id)}
                            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-2 rounded text-sm"
                          >
                            Approve
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State Messages */}
            {selectedView === "pending" && users.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No pending approval requests.
              </p>
            )}

            {selectedView === "approved" && approvedUsers.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No approved users yet.
              </p>
            )}

            {selectedView === "rejected" && rejectedUsers.length === 0 && (
              <p className="text-center text-gray-500 py-8">
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
