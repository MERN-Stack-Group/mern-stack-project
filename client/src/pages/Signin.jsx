import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { loginUser } from "../api/userApi";
import { useAuth } from "../hooks/AuthContext";
import logoImg from "../assets/gradbridge_logo.png";

/**
 * Signin Component
 * Fully compatible with theme toggling (Light & Dark mode)
 */
function Signin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    <div className="min-h-screen bg-slate-300 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 flex flex-col justify-between p-4 md:p-8 font-sans relative transition-colors duration-300">
      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-[#111622] hover:bg-slate-300 dark:hover:bg-[#161d2b] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
        >
          <ArrowLeft size={16} className="text-sky-500" />
          Back to Home
        </Link>
      </div>

      {/* Main Centered Card Container */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="bg-slate-200 dark:bg-[#111622] w-full max-w-md p-8 rounded-2xl border border-slate-200 dark:border-sky-900/40 shadow-xl dark:shadow-2xl space-y-6 transition-colors">
          {/* Logo Image Header only */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <img
              src={logoImg}
              alt="GradBridge Logo"
              className="h-14 w-auto object-contain"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Student Mentorship & Alumni Network
            </p>
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white text-left pt-2">
            Welcome Back!
          </h2>

          {/* Error Message Banner */}
          {errorMsg && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/40 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label htmlFor="email" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-300 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                placeholder="e.g. johndoe@example.com"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label htmlFor="password" className="text-xs font-medium text-slate-600 dark:text-slate-400">
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
                  className="w-full bg-slate-300 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 pr-10 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-slate-2000 text-white font-medium py-3 rounded-xl transition duration-200 shadow-lg shadow-sky-600/20 text-sm mt-2 cursor-pointer"
            >
              Sign In
            </button>

            <p className="text-center text-slate-600 dark:text-slate-400 text-xs pt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-sky-600 dark:text-sky-400 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
