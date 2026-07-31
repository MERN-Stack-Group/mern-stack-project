import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";

function Signin({ setIsLoggedIn, setRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   function handleLogin(e) {
        e.preventDefault();

        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (!savedUser) {
            alert("No account found. Please sign up first.");
            return;
        }
        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {
            
            setIsLoggedIn(true);
            setRole(savedUser.role);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("role", savedUser.role);

            navigate("/");
        } else {
            alert("Incorrect email or password.");
        }
      }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0d0b] gap-6">
    <div className="bg-[#24201D] w-full max-w-md p-8 rounded-2xl shadow-xl border border-stone-800">
      <h1 className="text-3xl font-bold text-[#F5F1EA] text-center">
        GradBridge
        </h1>

      <h2 className="text-xl text-center mt-2 text-[#B8B0A8]">
        Student Mentorship & Alumni Network
        </h2>

        <p className="text-center mt-2 text-[#B8B0A8]"> 
            Welcome Back!
        </p>

        <form 
          onSubmit={handleLogin}
          className="flex flex-col gap-3 mt-8">

      <input 
        id="email"
        name="email"
        type="email"
        required 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500"
        placeholder="Email" />

      <input 
        id="password"
        name="password"
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" 
        placeholder="Password" 
        type="password"
      />

      <button type="submit" className="bg-[#7E8C54] hover:bg-[#8E9E84] text-white p-3 rounded-lg mt-3 transition">
        Sign In
      </button>
      </form>

      <p className="text-center text-[#B8B0A8] mt-4">
        Don't have an account?

        <Link 
    to="/signup"
    className="text-[#7E8C54] ml-2"
>
    Sign Up
</Link>
      </p>
    </div>
    </div>
  );
}

export default Signin;