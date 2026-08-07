import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllAlumni } from "../api/userApi";
import LoadingScreen, { useMinLoading } from "../components/LoadingScreen";

function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    });
    
    const [loading, setLoading] = useState(true);
    const showLoading = useMinLoading(loading);

    useEffect(() => {
      const fetchStats = async () => {
        try {
          const data = await getAllAlumni();
          
          let pending = 0;
          let approved = 0;
          let rejected = 0;

          data.forEach(user => {
            const profile = user.alumniProfile || {};
            if (profile.approved) {
              approved++;
            } else if (profile.rejected) {
              rejected++;
            } else {
              pending++;
            }
          });

          setStats({
            total: data.length,
            pending,
            approved,
            rejected
          });
        } catch (error) {
          console.error("Failed to fetch admin stats:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
    }, []);

    if (showLoading) {
      return <LoadingScreen fullScreen={true} message="Loading Dashboard..." />;
    }

   return (
  <div className="flex">
    <AdminSidebar />

    <div className="flex-1 bg-[#0b0f17] text-slate-200 min-h-screen p-8">

      <h1 className="text-3xl font-bold mb-6 text-white">
        Admin Dashboard
      </h1>
      <div className="mb-8">
  <h1 className="text-3xl font-bold text-white">
    Welcome Back, Admin
  </h1>

  <p className="text-slate-400 mt-2">
    Manage users and approval requests from here.
  </p>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-[#111622] p-6 rounded-xl shadow-md border border-slate-800 hover:border-slate-700 transition-colors">
          <h2 className="text-slate-400">Total Alumni</h2>
          <p className="text-3xl font-bold text-white mt-2">
             {stats.total}
          </p>
        </div>

        <div className="bg-[#111622] p-6 rounded-xl shadow-md border border-slate-800 hover:border-slate-700 transition-colors">
          <h2 className="text-slate-400">Pending Requests</h2>
          <p className="text-3xl font-bold text-white mt-2">
             {stats.pending}
          </p>
        </div>

        <div className="bg-[#111622] p-6 rounded-xl shadow-md border border-slate-800 hover:border-slate-700 transition-colors">
          <h2 className="text-slate-400">Approved Alumni</h2>
          <p className="text-3xl font-bold text-white mt-2">
             {stats.approved}
          </p>
        </div>

        <div className="bg-[#111622] p-6 rounded-xl shadow-md border border-slate-800 hover:border-slate-700 transition-colors">
          <h2 className="text-slate-400">Rejected Alumni</h2>
          <p className="text-3xl font-bold text-white mt-2">
             {stats.rejected}
          </p>
        </div>

      </div>

    </div>
  </div>
);
}


export default AdminDashboard;