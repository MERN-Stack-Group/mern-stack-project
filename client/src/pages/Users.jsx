import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

function Users() {

  const [users] = useState([
    {
      id: 1,
      name: "Kasun Perera",
      nic: "200012345678",
      email: "kasun@gmail.com",
      faculty: "Computing",
      industry: "Software Engineering",
      date: "2026-07-20",
      status: "Approved",
    },
    {
      id: 2,
      name: "Nimali Silva",
      nic: "200112345678",
      email: "nimali@gmail.com",
      faculty: "Business",
      industry: "Marketing",
      date: "2026-07-21",
      status: "Pending",
    },
    {
      id: 3,
      name: "Amal Fernando",
      nic: "200212345678",
      email: "amal@gmail.com",
      faculty: "Engineering",
      industry: "Civil Engineering",
      date: "2026-07-22",
      status: "Rejected",
    },
  ]);

  return (
  <div className="flex">

    <AdminSidebar />

    <div className="flex-1 min-h-screen bg-gray-100 p-8">

  <h2 className="text-xl font-semibold mb-4 text-gray-800">
    All Users
  </h2>

  <div className="overflow-x-auto">

    <table className="w-full text-left">

      <thead className="bg-gray-100 text-gray-700">

        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Faculty</th>
          <th className="p-3">Industry</th>
          <th className="p-3">Status</th>
        </tr>

      </thead>


      <tbody>

        {users.map((user) => (

          <tr
            key={user.id}
            className="border-b hover:bg-gray-50 text-gray-800"
          >

            <td className="p-3">
              {user.name}
            </td>

            <td className="p-3">
              {user.email}
            </td>

            <td className="p-3">
              {user.faculty}
            </td>

            <td className="p-3">
              {user.industry}
            </td>

            <td className="p-3">

              <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                {user.status}
              </span>

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

export default Users;