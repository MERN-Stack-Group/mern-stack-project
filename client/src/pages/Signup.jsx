import { useState } from "react";

function Signup() {
    const [role, setRole] = useState("");
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.placeholder]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(role);
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0d0b]">
        <div className="bg-[#24201D] w-full max-w-md p-8 rounded-2xl shadow-xl border border-stone-800">
      <h1 className="text-3xl font-bold text-[#F5F1EA]">GradBridge Signup Page</h1>
      <h2 className="text-xl text-center mt-2 text-[#B8B0A8]">Create Account</h2>

      <p className="mt-6 mb-2 text-stone-300">Select your role:</p>

      <div className="flex gap-3 mb-6">

      <button className="flex-1 bg-[#7E8C54] hover:bg-[#8E9E84] text-white p-2 rounded-lg transition" onClick={() => setRole("alumni")}>
        Alumni
        </button>
      <button className="flex-1 bg-[#7E8C54] hover:bg-[#8E9E84] text-white p-2 rounded-lg transition" onClick={() => setRole("mentor")}>
        Mentor</button>

        </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {role === "mentor" && (
            <>
            <input className="bg-[#312C28] border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Name" onChange={handleChange}/>

            <input className="bg-[#312C28] border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="NIC" onChange={handleChange}/>

            <input className="bg-[#312C28] border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="University" onChange={handleChange}/>
            </>
        )}
        
        <input className="bg-[#312C28] border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Email" onChange={handleChange}/>

        <input className="bg-[#312C28] border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Password" type="password" onChange={handleChange} />

        <button type="submit" className="bg-[#7E8C54] hover:bg-[#8E9E84] text-white p-3 rounded-lg mt-3 transition">
        Sign Up
        </button>
        </form>

        </div>
        
    </div>
  );
}

export default Signup;