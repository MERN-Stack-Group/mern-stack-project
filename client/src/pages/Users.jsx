import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

function Users() {

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Kasun Perera",
      email: "kasun@gmail.com",
      nic: "200012345678",
      faculty: "Computing",
    },
    {
      id: 2,
      name: "Nimali Silva",
      email: "nimali@gmail.com",
      nic: "200145678912",
      faculty: "Engineering",
    },
    {
      id: 3,
      name: "Amal Fernando",
      email: "amal@gmail.com",
      nic: "199978945612",
      faculty: "Business",
    },
  ]);


  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };


  return (
    <div className="flex">

      <AdminSidebar />


      <div className="flex-1 min-h-screen bg-gray-100 p-8">


        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          All Users
        </h1>

        <p className="text-gray-600 mb-6">
          View and manage approved users in the system.
        </p>


        <div className="bg-white rounded-2xl shadow-md overflow-hidden">


          <table className="w-full text-left">


            <thead className="bg-blue-900 text-white">

              <tr>

                <th className="px-6 py-4">
                  Name
                </th>

                <th className="px-6 py-4">
                  NIC
                </th>

                <th className="px-6 py-4">
                  Email
                </th>

                <th className="px-6 py-4">
                  Faculty
                </th>

                <th className="px-6 py-4">
                  Action
                </th>

              </tr>

            </thead>



            <tbody>

              {users.length > 0 ? (

                users.map((user) => (

                  <tr
                    key={user.id}
                    className="border-b hover:bg-blue-50 transition"
                  >

                    <td className="px-6 py-4 font-medium text-gray-800">
                      {user.name}
                    </td>


                    <td className="px-6 py-4 text-gray-700">
                      {user.nic}
                    </td>


                    <td className="px-6 py-4 text-gray-700">
                      {user.email}
                    </td>


                    <td className="px-6 py-4">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {user.faculty}
                      </span>

                    </td>


                    <td className="px-6 py-4">

                      <button
                        onClick={() => removeUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Remove
                      </button>

                    </td>


                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No users available
                  </td>

                </tr>

              )}

            </tbody>


          </table>


        </div>


      </div>


    </div>
  );
}

export default Users;