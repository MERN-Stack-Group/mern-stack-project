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
    if (!window.confirm("Are you sure you want to approve this user?")) return;
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
    if (!window.confirm("Are you sure you want to reject this user?")) return;
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
    <div className="flex min-h-screen bg-[#0b0f17] text-slate-200">
      <AdminSidebar />
      <main className="flex-1 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Pending Alumni Approvals
            </h1>
            <p className="text-slate-400 mt-1">
              Review and manage alumni registration requests.
            </p>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {/* Pending Requests Card */}
          <div
            onClick={() => setSelectedView("pending")}
            className={`p-6 rounded-xl shadow cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-[#111622] border ${selectedView === "pending" ? "border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]" : "border-slate-800 hover:border-slate-700"}`}
          >
            <h3 className="text-lg font-semibold mb-2 text-slate-300">Pending Requests</h3>
            <p className="text-3xl font-bold text-sky-400">{users.length}</p>
          </div>

          {/* Approved Card */}
          <div
            onClick={() => setSelectedView("approved")}
            className={`p-6 rounded-xl shadow cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-[#111622] border ${selectedView === "approved" ? "border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]" : "border-slate-800 hover:border-slate-700"}`}
          >
            <h3 className="text-lg font-semibold mb-2 text-slate-300">Approved</h3>
            <p className="text-3xl font-bold text-sky-400">
              {approvedUsers.length}
            </p>
          </div>

          {/* Rejected Card */}
          <div
            onClick={() => setSelectedView("rejected")}
            className={`p-6 rounded-xl shadow cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg bg-[#111622] border ${selectedView === "rejected" ? "border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]" : "border-slate-800 hover:border-slate-700"}`}
          >
            <h3 className="text-lg font-semibold mb-2 text-slate-300">Rejected</h3>
            <p className="text-3xl font-bold text-sky-400">
              {rejectedUsers.length}
            </p>
          </div>
        </section>

        {/* Alumni Table */}
        <section className="p-6 rounded-xl shadow bg-[#111622] border border-slate-800 text-slate-200">
          <h2 className="text-xl font-bold mb-5 text-white">
            {selectedView === "pending"
              ? "Pending Requests"
              : selectedView === "approved"
                ? "Approved Alumni"
                : "Rejected Alumni"}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800 text-slate-300">
                  <th className="p-3 text-left rounded-tl-lg font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">NIC</th>
                  <th className="p-3 text-left font-semibold">Email</th>
                  <th className="p-3 text-left font-semibold">Faculty</th>
                  <th className="p-3 text-left font-semibold">Industry</th>
                  <th className="p-3 text-left font-semibold">Registered Date</th>
                  <th className="p-3 text-left rounded-tr-lg font-semibold">Action</th>
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
                    className="border-b border-slate-800 text-slate-300 hover:bg-slate-800/50 transition-colors"
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
                            className="bg-sky-600 hover:bg-sky-700 transition-colors text-white px-3 py-2 rounded font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectUser(user.id)}
                            className="bg-slate-700 hover:bg-slate-600 transition-colors text-slate-200 px-3 py-2 rounded font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Actions for Approved view */}
                      {selectedView === "approved" && (
                        <div className="flex items-center gap-3">
                          <span className="text-emerald-400 font-bold">
                            Approved
                          </span>
                          <button
                            onClick={() => rejectUser(user.id)}
                            className="bg-red-500 hover:bg-red-600 transition-colors text-white px-3 py-2 rounded text-sm font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Actions for Rejected view */}
                      {selectedView === "rejected" && (
                        <div className="flex items-center gap-3">
                          <span className="text-red-400 font-bold">
                            Rejected
                          </span>
                          <button
                            onClick={() => approveUser(user.id)}
                            className="bg-sky-600 hover:bg-sky-700 transition-colors text-white px-3 py-2 rounded text-sm font-medium"
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
