import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Clock, Users, UserCog, LogOut } from "lucide-react";

function AdminSidebar() {

  const navigate = useNavigate();

  return (
    <div className="w-64 h-screen bg-[#0b0f17] border-r border-slate-800 text-slate-200 p-5">

      <h1 className="text-2xl font-bold mb-8 text-white">
        Admin Panel
      </h1>

      <ul className="space-y-4">

        <li
          onClick={() => navigate("/admin-dashboard")}
          className="cursor-pointer hover:text-sky-400 transition-colors flex items-center gap-3"
        >
          <LayoutDashboard size={20} /> Dashboard
        </li>

        <li
          onClick={() => navigate("/pending-approval")}
          className="cursor-pointer hover:text-sky-400 transition-colors flex items-center gap-3"
        >
          <Clock size={20} /> Pending Approval
        </li>
        
        <li
        onClick={() => navigate("/mentorship-monitor")}
         className="cursor-pointer hover:text-sky-400 transition-colors flex items-center gap-3"
        >
         <Users size={20} /> Mentorship Monitor
        </li>

        <li
        onClick={() => navigate("/account-management")}
        className="cursor-pointer hover:text-sky-400 transition-colors flex items-center gap-3"
        >
        <UserCog size={20} /> Account Management
        </li>

        <li
          onClick={() => {
            localStorage.removeItem("adminLogin");
            navigate("/admin-login");
          }}
          className="cursor-pointer hover:text-red-400 transition-colors mt-8 pt-4 border-t border-slate-800 flex items-center gap-3"
        >
          <LogOut size={20} /> Logout
        </li>

      </ul>

    </div>
  );
}

export default AdminSidebar;