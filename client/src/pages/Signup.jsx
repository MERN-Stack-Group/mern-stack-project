{/*Roles = Student, Alumni */}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        nic: "",
        university: "",
        email: "",
        password: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (!role) {
            alert("Please select a role.");
            return;
        }
        // Temporary storage!!! replace with MongoDB)
        const user = {
            ...formData,
            role,
        };

        localStorage.setItem("user", JSON.stringify(user));
        alert("Registration successful!");
        navigate("/signin");
    }

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0d0b] p-6">

                {/*CHANGE!!!*/}
                <Link to="/" className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#7E8C54] flex items-center justify-center">
                    <span className="font-bold text-[#F5F1EA]">GB</span>
                </div>

                <h1 className="text-2xl font-bold text-[#F5F1EA]">
                    GradBridge
                    </h1>
                </Link>
            

        <div className="bg-[#24201D] w-full max-w-md p-8 rounded-2xl shadow-xl border border-stone-800">
{/*
      <h1 className="text-3xl font-bold text-[#F5F1EA] text-center" >GradBridge</h1>*/}

      <h2 className="text-xl font-bold text-center text-[#B8B0A8]">
        Student Mentorship & Alumni Network
      </h2>

      <p className="text-center mt-2 text-[#B8B0A8]">
        Create Account
        </p>

      <p className="mt-6 mb-2 text-stone-300">
        Select your role:
      </p>

      <div className="flex gap-3 mb-6">

      <button 
        type="button"
        onClick={() => setRole("student")}
        className={`flex-1 p-3 rounded-lg transition ${
            role === "student"
                ? "bg-[#7E8C54] text-white"
                : "bg-[#312C28] text-[#B8B0A8]"
        }`}
        > Student
        </button>

      <button 
        type="button"
        onClick={() => setRole("alumni")}
        className={`flex-1 p-3 rounded-lg transition ${
            role === "alumni"
                ? "bg-[#7E8C54] text-white"
                : "bg-[#312C28] text-[#B8B0A8]"
        }`} 
        >
            Alumni
            </button>

        </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {role === "alumni" && (
            <>
            <input 
            id="name"
            name="name"
            type="text"
            required 
            className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Name" 
            value={formData.name}
            onChange={handleChange}/>

            <input 
            id="nic"
            name="nic"
            type="text"
            required 
            className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="NIC" 
            value={formData.nic}
            onChange={handleChange}/>

            <input 
            id="university"
            name="university"
            type="text"
            required 
            className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="University" 
            value={formData.university}
            onChange={handleChange}/>
            </>
        )}
        
        <input 
        id="email"
        name="email"
        type="email"
        required 
        className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Email" 
        value={formData.email}
        onChange={handleChange}/>

        <input 
        id="password"
        name="password"
        required 
        className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Password" 
        type="password" 
        value={formData.password}
        onChange={handleChange} />

        <button 
        type="submit" 
        className="bg-[#7E8C54] hover:bg-[#8E9E84] text-white p-3 rounded-lg mt-3 transition">
        Sign Up
        </button>
        </form>

        <p className="text-center text-[#B8B0A8] mt-5">
        Already have an account?
        <Link
        to="/signin"
        className="text-[#7E8C54] ml-2">Sign In</Link>
        </p>
        

        </div>
        
    </div>
  );
}

export default Signup;