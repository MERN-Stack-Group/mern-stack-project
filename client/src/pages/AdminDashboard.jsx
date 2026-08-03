import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
    const navigate = useNavigate();

   return (
  <div className="flex">
    <AdminSidebar />

    <div className="flex-1 bg-gray-100 min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>
      <div className="mb-8">
  <h1 className="text-3xl font-bold text-gray-800">
    Welcome Back, Admin 👋
  </h1>

  <p className="text-gray-600 mt-2">
    Manage users and approval requests from here.
  </p>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold text-gray-800">
             100
        </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
          <h2 className="text-gray-500">Pending Requests</h2>
          <p className="text-3xl font-bold text-gray-800">
            20
            </p>
          
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
          <h2 className="text-gray-500">Approved Users</h2>
          <p className="text-3xl font-bold text-gray-800">
             70
            </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
          <h2 className="text-gray-500">Rejected Users</h2>
          <p className="text-3xl font-bold text-gray-800">
             10
        </p>
        </div>

      </div>

    </div>
  </div>
);
}


export default AdminDashboard;