import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectList from "../components/SelectList";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { registerUser } from "../api/userApi";
import logoImg from "../assets/gradbridge_logo.png";

/**
 * Signup Component
 * Fully compatible with theme toggling (Light & Dark mode)
 */
function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const faculties = [
    "Faculty of Humanities and Social Sciences",
    "Faculty of Applied Sciences",
    "Faculty of Management Studies and Commerce",
    "Faculty of Medical Sciences",
    "Faculty of Graduate Studies",
    "Faculty of Technology",
    "Faculty of Engineering",
    "Faculty of Allied Health Sciences",
    "Faculty of Dental Sciences",
    "Faculty of Computing",
    "Faculty of Urban and Aquatic Bioresources",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!role) {
      setMessage("Please select a role to continue.");
      return;
    }

    const password = formData.password || "";
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
    
    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must be 8-16 characters, including a lowercase letter, uppercase letter, number, and symbol."
      );
      return;
    }

    try {
      const submissionData = {
        email: formData.email,
        password: formData.password,
        role: [role],

        ...(role === "alumni" && {
          name: `${formData.firstName || ""} ${formData.lastName || ""}`.trim(),
          faculty: formData.faculty,
          degree: formData.degree,
          alumniProfile: {
            NIC: formData.nic,
          },
        }),
      };

      const data = await registerUser(submissionData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setMessage("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
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
            Create Account
          </h2>

          {/* Role Selection Tabs */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              I am joining as an:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`py-2.5 rounded-xl text-xs font-medium transition duration-200 border ${
                  role === "student"
                    ? "bg-slate-200 dark:bg-[#172338] border-sky-500 text-sky-700 dark:text-sky-300 shadow-sm"
                    : "bg-slate-300 dark:bg-[#161d2b] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#1f2838]"
                }`}
                onClick={() => setRole("student")}
              >
                Student
              </button>
              <button
                type="button"
                className={`py-2.5 rounded-xl text-xs font-medium transition duration-200 border ${
                  role === "alumni"
                    ? "bg-slate-200 dark:bg-[#172338] border-sky-500 text-sky-700 dark:text-sky-300 shadow-sm"
                    : "bg-slate-300 dark:bg-[#161d2b] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#1f2838]"
                }`}
                onClick={() => setRole("alumni")}
              >
                Alumni
              </button>
            </div>
          </div>

          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            {/* Conditional fields for Alumni */}
            {role === "alumni" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full bg-slate-300 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                      placeholder="e.g. John"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full bg-slate-300 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                      placeholder="e.g. Doe"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="nic" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    National Identity Card (NIC)
                  </label>
                  <input
                    id="nic"
                    name="nic"
                    required
                    className="w-full bg-slate-300 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                    placeholder="e.g. 199912345678"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Faculty</label>
                  <SelectList
                    options={faculties}
                    handleChange={handleChange}
                    name="faculty"
                    placeholder="Select your faculty..."
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="degree" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Degree
                  </label>
                  <input
                    id="degree"
                    name="degree"
                    required
                    className="w-full bg-slate-300 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                    placeholder="e.g. Bachelor of Science in ..."
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {/* Standard Email field */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-slate-300 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                placeholder="e.g. johndoe@example.com"
                onChange={handleChange}
              />
            </div>

            {/* Standard Password field */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Password
              </label>

              <div className="relative w-full">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full bg-slate-300 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800/90 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 pr-10 rounded-xl text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  placeholder="••••••••"
                  onChange={handleChange}
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

            {message && (
              <p
                className={`text-center text-xs pt-1 ${
                  message === "Registration successful! Redirecting..."
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 rounded-xl transition duration-200 shadow-lg shadow-sky-600/20 text-sm mt-2 cursor-pointer"
            >
              Sign Up
            </button>

            <p className="text-center text-slate-600 dark:text-slate-400 text-xs pt-2">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-sky-600 dark:text-sky-400 font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
