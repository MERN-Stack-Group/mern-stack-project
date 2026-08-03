import { useState } from "react";

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


  const suspendUser = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: "Suspended" }
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
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Account Management
      </h1>

      <p className="text-gray-600 mb-6">
        Manage user accounts, suspend and delete accounts.
      </p>


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

            {users.map((user) => (

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
                    onClick={() => suspendUser(user.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
                  >
                    Suspend
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
  );
}

export default AccountManagement;