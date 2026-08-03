import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">


            <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-[400px]">


                {/* Logo / Title */}

                <div className="text-center mb-8">

                    <div className="mx-auto bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full text-3xl font-bold shadow-lg">
                        A
                    </div>


                    <h1 className="text-3xl font-bold text-gray-800 mt-4">
                        Admin Portal
                    </h1>


                    <p className="text-gray-500 mt-2">
                        Login to manage approval requests
                    </p>

                </div>



                <form onSubmit={handleLogin}>


                    <div className="mb-5">

                        <label className="block text-gray-700 font-semibold mb-2">
                            Username
                        </label>


                        <input
    type="text"
    placeholder="Enter username"
    className="w-full px-4 py-3 border rounded-xl outline-none 
    text-gray-800 bg-white placeholder-gray-400
    focus:ring-2 focus:ring-blue-500 transition"
    value={username}
    onChange={(e)=>setUsername(e.target.value)}
/>

                    </div>




                    <div className="mb-6">

    <label className="block text-gray-700 font-semibold mb-2">
        Password
    </label>

    <div className="relative">

        <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full px-4 py-3 border rounded-xl outline-none 
            text-gray-800 bg-white placeholder-gray-400
            focus:ring-2 focus:ring-blue-500 transition"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />


        <button
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-gray-500"
        >
            {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>

    </div>

</div>


                    <button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition duration-300 shadow-lg"
                    >
                        Login
                    </button>


                </form>



                <p className="text-center text-gray-400 text-sm mt-6">
                    © 2026 Admin Management System
                </p>


            </div>


        </div>

    );
}


export default AdminLogin;