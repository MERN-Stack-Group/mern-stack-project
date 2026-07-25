import { useState } from "react";

function Signup({ switchToSignin }) {
    const [role, setRole] = useState("");
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");

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
        setMessage("Registration submitted!");
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0d0b]">

        <div className="bg-[#24201D] w-full max-w-md p-8 rounded-2xl shadow-xl border border-stone-800">

      <h1 className="text-3xl font-bold text-[#F5F1EA] text-center" >GradBridge</h1>

      <h2 className="text-xl text-center mt-2 text-[#B8B0A8]">
        Student Mentorship & Alumni Network
      </h2>

      <p className="text-center mt-2 text-[#B8B0A8]">
        Create Account
        </p>

      <p className="mt-6 mb-2 text-stone-300">Select your role:</p>

      <div className="flex gap-3 mb-6">

      <button type="button"
        className={`flex-1 p-2 rounded-lg transition ${
            role === "alumni"
                ? "bg-[#7E8C54] text-white"
                : "bg-[#312C28] text-[#B8B0A8]"
        }`} 
        onClick={() => setRole("alumni")}>
        Alumni
        </button>

      <button type="button"
        className={`flex-1 p-2 rounded-lg transition ${
            role === "mentor"
                ? "bg-[#7E8C54] text-white"
                : "bg-[#312C28] text-[#B8B0A8]"
        }`} 
        onClick={() => setRole("mentor")}>
            Mentor</button>

        </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {role === "mentor" && (
            <>
            <input required className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Name" onChange={handleChange}/>

            <input required className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="NIC" onChange={handleChange}/>

            <input required className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="University" onChange={handleChange}/>
            </>
        )}
        
        <input required className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Email" onChange={handleChange}/>

        <input required className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Password" type="password" onChange={handleChange} />

        <button type="submit" className="bg-[#7E8C54] hover:bg-[#8E9E84] text-white p-3 rounded-lg mt-3 transition">
        Sign Up
        </button>

        {message && (
            <p className="text-center text-[#7E8C54] mt-3">
                {message}
            </p>
        )}

        <p className="text-center text-[#B8B0A8] mt-4">
        Already have an account?
        <button onClick={switchToSignin} type="button" className="text-[#7E8C54] ml-2">
            Sign In
        </button>
        </p>
        </form>

        </div>
        
    </div>
  );
}

export default Signup;