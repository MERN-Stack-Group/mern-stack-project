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
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-info/10 blur-[100px] pointer-events-none" />

      <div className="bg-surface/80 backdrop-blur-xl w-full max-w-md p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-border relative z-10">
        <div className="mb-10 text-center">
          <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-sm mx-auto mb-4">
            G
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
            Welcome back
          </h1>
          <h2 className="text-sm font-medium mt-2 text-text-secondary">
            Sign in to your GradBridge account
          </h2>
        </div>

        {/* Error Message Banner */}
        {errorMsg && (
          <div className="bg-danger/10 border border-danger/20 text-danger p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface border border-border text-text-primary px-4 py-3 rounded-xl placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              placeholder="e.g. johndoe@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-semibold text-text-primary mb-2">
                Password
              </label>
              <a href="#" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
                Forgot password?
              </a>
            </div>

            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-border text-text-primary px-4 py-3 pr-10 rounded-xl placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors focus:outline-none rounded-md p-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl mt-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Sign In
          </button>

          <p className="text-center text-text-secondary mt-6 text-sm font-medium">
            Don't have an account?
            <Link
              to="/signup"
              className="text-primary ml-1.5 hover:text-primary-hover transition-colors"
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
