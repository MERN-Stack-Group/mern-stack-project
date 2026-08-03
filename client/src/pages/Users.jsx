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

  <h2 className="text-xl font-semibold mb-4 text-gray-800">
    All Users
  </h2>

  <div className="overflow-x-auto">

    <table className="w-full text-left">

      <thead className="bg-gray-100 text-gray-700">

        <tr>
          <th className="p-3">Name</th>
          <th className="p-3">NIC</th>
          <th className="p-3">Email</th>
          <th className="p-3">Faculty</th>
          <th className="p-3">Action</th>     
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
             {user.nic}
            </td>

            <td className="p-3">
              {user.email}
            </td>

            <td className="p-3">
              {user.faculty}
            </td>

            <td className="p-3">
            <button
             onClick={() => removeUser(user.id)}
             className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
             >
             Remove
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

export default Users;