import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getAllUsers, suspendAlumniRequest, approveAlumniRequest, deleteUserRequest } from "../api/userApi";
import LoadingScreen, { useMinLoading } from "../components/LoadingScreen";

function AccountManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const showLoading = useMinLoading(loading);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        const formattedUsers = data.map(user => {
          // Determine Primary Role for display
          let displayRole = "Unknown";
          if (user.role && user.role.includes("student")) displayRole = "Student";
          else if (user.role && user.role.includes("alumni")) displayRole = "Alumni";

          // Determine Status
          let status = "Active";
          if (displayRole === "Alumni" && user.alumniProfile) {
            if (user.alumniProfile.rejected) status = "Rejected";
            else if (!user.alumniProfile.approved) status = "Suspended";
          }

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: displayRole,
            status: status,
          };
        });
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("All");

  const toggleSuspendUser = async (id, currentStatus) => {
    const action = currentStatus === "Active" ? "suspend" : "reactivate";
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;
    
    try {
      if (currentStatus === "Active") {
        await suspendAlumniRequest(id);
      } else {
        await approveAlumniRequest(id);
      }
      
      setUsers(
        users.map((user) =>
          user.id === id
            ? {
                ...user,
                status: currentStatus === "Active" ? "Suspended" : "Active",
              }
            : user
        )
      );
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUserRequest(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  if (showLoading) {
    return <LoadingScreen fullScreen={true} message="Loading Accounts..." />;
  }


  return (
  <div className="flex">
    <AdminSidebar />
    <div className="flex-1 min-h-screen bg-[#0b0f17] text-slate-200 p-10">

      <h1 className="text-3xl font-bold text-white mb-2">
        Account Management
      </h1>

      <p className="text-slate-400 mb-6">
        Manage user accounts, suspend and delete accounts.
      </p>

       <div className="mb-6 flex items-center gap-3">
  {/* Search Box */}
  <input
    type="text"
    placeholder="Search users..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-80 px-4 py-2 border border-slate-700 rounded-lg text-slate-200 bg-[#111622] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
  />

  {/* Filter Buttons */}

<div className="flex items-center gap-2">
  <span className="text-slate-400 font-medium">
    Filter:
  </span>

  <div className="flex gap-2">
    <button
      onClick={() => setRoleFilter("All")}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        roleFilter === "All"
          ? "bg-sky-600 text-white shadow-md border border-sky-500"
          : "bg-[#111622] text-slate-400 border border-slate-700 hover:border-slate-600 hover:text-slate-300"
      }`}
    >
      All
    </button>
    <button
      onClick={() => setRoleFilter("Student")}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        roleFilter === "Student"
          ? "bg-sky-600 text-white shadow-md border border-sky-500"
          : "bg-[#111622] text-slate-400 border border-slate-700 hover:border-slate-600 hover:text-slate-300"
      }`}
    >
      Students
    </button>
    <button
      onClick={() => setRoleFilter("Alumni")}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        roleFilter === "Alumni"
          ? "bg-sky-600 text-white shadow-md border border-sky-500"
          : "bg-[#111622] text-slate-400 border border-slate-700 hover:border-slate-600 hover:text-slate-300"
      }`}
    >
      Alumni
    </button>
  </div>
</div>
</div>
 
      <div className="bg-[#111622] rounded-xl shadow-md overflow-hidden border border-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>


          <tbody>

            {users
  .filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  })
  .map((user) => (

              <tr
                key={user.id}
                className="border-b border-slate-800 text-slate-300 hover:bg-slate-800/50 transition-colors"
              >
                <td className="p-4">
                  {user.name}
                </td>
                <td className="p-4">
                  {user.email}
                </td>
                <td className="p-4">
                  {user.role}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  {user.role !== "Student" && (
                    <>
                      <button
                        onClick={() => toggleSuspendUser(user.id, user.status)}
                        className={`${
                         user.status === "Active"
                           ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20"
                            : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20"
                        } border px-3 py-2 rounded-lg text-sm font-medium transition-colors`}
                      >
                       {user.status === "Active" ? "Suspend" : "Reactivate"}
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  )}
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

export default AccountManagement;