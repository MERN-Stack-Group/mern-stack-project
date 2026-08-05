import { useState } from "react";

function PendingApproval() {
  // Mock data for initial pending users
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

  // Tracks which table view is currently active
  const [selectedView, setSelectedView] = useState("pending");

  // Moves a user from pending/rejected to the approved list
  const approveUser = (id) => {
    const pendingUser = users.find((user) => user.id === id);
    const rejectedUser = rejectedUsers.find((user) => user.id === id);
    const userToApprove = pendingUser || rejectedUser;

    if (!userToApprove) return;

    setApprovedUsers([...approvedUsers, userToApprove]);
    setUsers(users.filter((user) => user.id !== id));
    setRejectedUsers(rejectedUsers.filter((user) => user.id !== id));
  };

  // Moves a user from pending/approved to the rejected list
  const rejectUser = (id) => {
    const pendingUser = users.find((user) => user.id === id);
    const approvedUser = approvedUsers.find((user) => user.id === id);
    const userToReject = pendingUser || approvedUser;

    if (!userToReject) return;

    setRejectedUsers([...rejectedUsers, userToReject]);
    setUsers(users.filter((user) => user.id !== id));
    setApprovedUsers(approvedUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Pending Alumni Approvals
            </h1>
            <p className="text-text-secondary mt-2 text-sm">
              Review and manage alumni registration requests.
            </p>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Pending Requests Card */}
          <div
            onClick={() => setSelectedView("pending")}
            className={`p-6 rounded border cursor-pointer transition-colors shadow-sm ${
              selectedView === "pending"
                ? "bg-surface-hover border-primary"
                : "bg-surface border-border hover:bg-surface-hover"
            }`}
          >
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-2">
              Pending Requests
            </h3>
            <p className="text-3xl font-bold text-primary">{users.length}</p>
          </div>

          {/* Approved Card */}
          <div
            onClick={() => setSelectedView("approved")}
            className={`p-6 rounded border cursor-pointer transition-colors shadow-sm ${
              selectedView === "approved"
                ? "bg-surface-hover border-primary"
                : "bg-surface border-border hover:bg-surface-hover"
            }`}
          >
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-2">
              Approved
            </h3>
            <p className="text-3xl font-bold text-primary">
              {approvedUsers.length}
            </p>
          </div>

          {/* Rejected Card */}
          <div
            onClick={() => setSelectedView("rejected")}
            className={`p-6 rounded border cursor-pointer transition-colors shadow-sm ${
              selectedView === "rejected"
                ? "bg-surface-hover border-primary"
                : "bg-surface border-border hover:bg-surface-hover"
            }`}
          >
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-2">
              Rejected
            </h3>
            <p className="text-3xl font-bold text-primary">
              {rejectedUsers.length}
            </p>
          </div>
        </section>

        {/* Alumni Table */}
        <section className="p-6 rounded border border-border shadow-sm bg-surface">
          <h2 className="text-lg font-bold mb-5 text-text-primary">
            {selectedView === "pending"
              ? "Pending Requests"
              : selectedView === "approved"
                ? "Approved Alumni"
                : "Rejected Alumni"}
          </h2>

          <div className="overflow-x-auto border border-border rounded">
            <table className="w-full text-sm text-left divide-y divide-border">
              <thead className="bg-surface-hover">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold text-text-secondary uppercase tracking-widest">
                    Name
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-text-secondary uppercase tracking-widest">
                    NIC
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-text-secondary uppercase tracking-widest">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-text-secondary uppercase tracking-widest">
                    Faculty
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-text-secondary uppercase tracking-widest">
                    Industry
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-text-secondary uppercase tracking-widest">
                    Registered Date
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-text-secondary uppercase tracking-widest text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-surface divide-y divide-border">
                {(selectedView === "pending"
                  ? users
                  : selectedView === "approved"
                    ? approvedUsers
                    : rejectedUsers
                ).map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-surface-hover transition-colors text-text-primary"
                  >
                    <td className="px-4 py-3 font-medium">{user.name}</td>
                    <td className="px-4 py-3">{user.nic}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.faculty}</td>
                    <td className="px-4 py-3">{user.industry}</td>
                    <td className="px-4 py-3 text-text-secondary">
                      {user.date}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {/* Actions for Pending view */}
                      {selectedView === "pending" && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => approveUser(user.id)}
                            className="bg-primary hover:bg-primary-hover transition-colors text-white px-3 py-1.5 rounded text-xs font-bold focus:outline-none"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectUser(user.id)}
                            className="bg-surface hover:bg-surface-hover text-text-secondary hover:text-danger transition-colors border border-border hover:border-danger px-3 py-1.5 rounded text-xs font-bold focus:outline-none"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Actions for Approved view */}
                      {selectedView === "approved" && (
                        <div className="flex justify-end items-center gap-3">
                          <span className="text-success text-[11px] font-bold uppercase tracking-widest">
                            Approved
                          </span>
                          <button
                            onClick={() => rejectUser(user.id)}
                            className="bg-surface hover:bg-surface-hover text-text-secondary hover:text-danger transition-colors border border-border hover:border-danger px-3 py-1.5 rounded text-xs font-bold focus:outline-none"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Actions for Rejected view */}
                      {selectedView === "rejected" && (
                        <div className="flex justify-end items-center gap-3">
                          <span className="text-danger text-[11px] font-bold uppercase tracking-widest">
                            Rejected
                          </span>
                          <button
                            onClick={() => approveUser(user.id)}
                            className="bg-primary hover:bg-primary-hover transition-colors text-white px-3 py-1.5 rounded text-xs font-bold focus:outline-none"
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
              <div className="text-center text-text-secondary py-8 text-sm">
                No pending approval requests.
              </div>
            )}

            {selectedView === "approved" && approvedUsers.length === 0 && (
              <div className="text-center text-text-secondary py-8 text-sm">
                No approved users yet.
              </div>
            )}

            {selectedView === "rejected" && rejectedUsers.length === 0 && (
              <div className="text-center text-text-secondary py-8 text-sm">
                No rejected users yet.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default PendingApproval;
