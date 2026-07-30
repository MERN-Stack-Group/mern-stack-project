import { Link } from "react-router-dom";

function Signin({ switchToSignup }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0d0b]">
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

        <form className="flex flex-col gap-3 mt-6">

      <input className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500"
      placeholder="Email" />

      <input className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2 rounded-lg placeholder:text-stone-500" placeholder="Password" type="password"
      />

      <button type="submit" className="bg-[#7E8C54] hover:bg-[#8E9E84] text-white p-3 rounded-lg mt-3 transition">
        Sign In
      </button>

      <p className="text-center text-[#B8B0A8] mt-4">
        Don't have an account?

        <Link 
    to="/signup"
    className="text-[#7E8C54] ml-2"
>
    Sign Up
</Link>
      </p>

        </form>
    </div>
    </div>
  );
}

export default Signin;