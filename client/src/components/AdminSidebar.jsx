import { useNavigate } from "react-router-dom";

function AdminSidebar() {

  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen bg-slate-800 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        Admin Panel
      </h1>

      <ul className="space-y-4">

        <li
          onClick={() => navigate("/admin-dashboard")}
          className="cursor-pointer hover:text-yellow-300"
        >
          🏠 Dashboard
        </li>

        <li
          onClick={() => navigate("/users")}
          className="cursor-pointer hover:text-yellow-300"
        >
          👥 Users
        </li>

        <li
          onClick={() => navigate("/pending-approval")}
          className="cursor-pointer hover:text-yellow-300"
        >
          ⏳ Pending Approval
        </li>

        <li
          onClick={() => {
            localStorage.removeItem("adminLogin");
            navigate("/admin-login");
          }}
          className="cursor-pointer hover:text-red-300"
        >
          🚪 Logout
        </li>

      </ul>

    </div>
  );
}

export default AdminSidebar;