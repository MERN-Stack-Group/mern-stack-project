import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

function AccountManagement() {

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Kasun Perera",
      email: "kasun@gmail.com",
      role: "Alumni",
      status: "Active",
    },
    {
      id: 2,
      name: "Nimali Silva",
      email: "nimali@gmail.com",
      role: "Student",
      status: "Active",
    },
    {
      id: 3,
      name: "Amal Fernando",
      email: "amal@gmail.com",
      role: "Alumni",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("All");

  const toggleSuspendUser = (id) => {
  setUsers(
    users.map((user) =>
      user.id === id
        ? {
            ...user,
            status:
              user.status === "Active"
                ? "Suspended"
                : "Active",
          }
        : user
    )
  );
};


  const deleteUser = (id) => {
    setUsers(
      users.filter((user) => user.id !== id)
    );
  };


  return (
  <div className="flex">

    <AdminSidebar />

    <div className="flex-1 min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Account Management
      </h1>

      <p className="text-gray-600 mb-6">
        Manage user accounts, suspend and delete accounts.
      </p>

       <div className="mb-6 flex items-center gap-3">

  {/* Search Box */}
  <input
    type="text"
    placeholder="🔍 Search users..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-80 px-4 py-2 border border-gray-300 rounded-lg text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* Filter Buttons */}

<div className="flex items-center gap-2">

  <span className="text-gray-700 font-medium">
    Filter:
  </span>

  <div className="flex gap-2">

    <button
  onClick={() => setRoleFilter("All")}
  className={`px-4 py-2 rounded-lg font-medium transition ${
    roleFilter === "All"
      ? "bg-blue-600 text-white shadow-md"
      : "bg-white text-gray-700 border border-gray-300"
   }`}
   >
  All
    </button>
<button
  onClick={() => setRoleFilter("Student")}
  className={`px-4 py-2 rounded-lg font-medium transition ${
    roleFilter === "Student"
      ? "bg-green-600 text-white shadow-md"
      : "bg-white text-gray-700 border border-gray-300"
  }`}
>
  Students
</button>

    <button
  onClick={() => setRoleFilter("Alumni")}
  className={`px-4 py-2 rounded-lg font-medium transition ${
    roleFilter === "Alumni"
      ? "bg-purple-600 text-white shadow-md"
      : "bg-white text-gray-700 border border-gray-300"
  }`}
>
  Alumni
</button>

  </div>

</div>
</div>

 

      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-200 text-gray-700">

            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
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
                className="border-b text-gray-800"
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
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>


                <td className="p-4 space-x-2">

                  <button
                  onClick={() => toggleSuspendUser(user.id)}
                  className={`${
                   user.status === "Active"
                     ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white px-3 py-2 rounded-lg`}
                  >
                 {user.status === "Active"
                   ? "Suspend"
                   : "Reactivate"}
                  </button>


                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
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

export default AccountManagement;