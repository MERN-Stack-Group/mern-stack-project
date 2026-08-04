import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../api/userApi";
import { useAuth } from "../hooks/AuthContext";
/**
 * Signin Component
 * Handles user authentication against locally stored credentials.
 */
function Signin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // State for UI error messages

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);

      setUser(data.user);

      navigate("/");
    } catch (error) {
      if (error.message.includes("User")) {
        setErrorMsg("No account exists with this email");
        setEmail("");
        setPassword("");
      } else if (error.message.includes("password")) {
        setErrorMsg("Wrong password");
        setPassword("");
      } else {
        setErrorMsg("An unexpected error occurred");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0d0b] py-10 px-4">
      <div className="bg-[#24201D] w-full max-w-md p-8 rounded-2xl shadow-xl border border-stone-800">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#F5F1EA] text-center">
            GradBridge
          </h1>
          <h2 className="text-md text-center mt-1 text-[#B8B0A8]">
            Student Mentorship & Alumni Network
          </h2>
        </div>

        <p className="text-lg font-semibold text-[#F5F1EA] mb-4">
          Welcome Back!
        </p>

        {/* Error Message Banner */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-stone-400">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-[#7E8C54] focus:ring-1 focus:ring-[#7E8C54] transition"
              placeholder="e.g. johndoe@example.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-stone-400">
              Password
            </label>

            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#312C28] border border-[#4A433E] text-stone-100 p-2.5 pr-10 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-[#7E8C54] focus:ring-1 focus:ring-[#7E8C54] transition"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#7E8C54] hover:bg-[#8E9E84] text-white font-medium p-3 rounded-lg mt-4 transition duration-200"
          >
            Sign In
          </button>

          <p className="text-center text-[#B8B0A8] mt-4 text-sm">
            Don't have an account?
            <Link
              to="/signup"
              className="text-[#7E8C54] ml-2 font-medium hover:underline"
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
