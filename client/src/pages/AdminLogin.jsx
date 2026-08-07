import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function AdminLogin() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "1234") {
            localStorage.setItem("adminLogin", "true");
            navigate("/admin-dashboard");
        } else {
            alert("Invalid Username or Password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0b0f17]">
            <div className="bg-[#111622] border border-slate-800 shadow-2xl rounded-xl p-10 w-[400px]">
                {/* Logo / Title */}
                <div className="text-center mb-8">
                    <div className="mx-auto bg-sky-600 text-white w-16 h-16 flex items-center justify-center rounded-full text-3xl font-bold shadow-lg">
                        A
                    </div>

                    <h1 className="text-2xl font-bold text-white mt-4">
                        Admin Portal
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Login to manage GradBridge
                    </p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-5">
                        <label className="block text-slate-300 font-semibold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full px-4 py-3 border border-slate-700 rounded-lg outline-none 
                            text-slate-200 bg-[#0b0f17] placeholder-slate-500
                            focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-slate-300 font-semibold mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="w-full px-4 py-3 border border-slate-700 rounded-lg outline-none 
                                text-slate-200 bg-[#0b0f17] placeholder-slate-500
                                focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        className="w-full bg-sky-600 text-white py-3 rounded-lg font-bold hover:bg-sky-700 transition-colors shadow-md"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-slate-500 text-sm mt-6">
                    © 2026 Admin Management System
                </p>
            </div>
        </div>
    );
}

export default AdminLogin;