import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SelectList from "../components/SelectList";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "../api/userApi";

/**
 * Signup Component
 * Handles new user registration, role selection, and persists
 * the mock user data to local storage for authentication.
 */
function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Dynamically update form data based on input name attributes
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

    if (!role) {
      setMessage("Please select a role to continue.");
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
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-info/10 blur-[100px] pointer-events-none" />

      <div className="bg-surface/80 backdrop-blur-xl w-full max-w-lg p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-border relative z-10 my-8">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-sm mx-auto mb-4">
            G
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
            Create an account
          </h1>
          <h2 className="text-sm font-medium mt-2 text-text-secondary">
            Join the GradBridge mentorship network
          </h2>
        </div>

        {/* Role Selection Tabs */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-text-primary mb-3">
            I am joining as an:
          </label>
          <div className="flex gap-3 bg-surface-hover p-1 rounded-xl border border-border">
            <button
              type="button"
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                role === "student"
                  ? "bg-surface text-primary shadow-sm border border-border/50"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface/50 border border-transparent"
              }`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                role === "alumni"
                  ? "bg-surface text-primary shadow-sm border border-border/50"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface/50 border border-transparent"
              }`}
              onClick={() => setRole("alumni")}
            >
              Alumni
            </button>
          </div>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Conditional rendering for Alumni-specific fields */}
          {role === "alumni" && (
            <div className="animate-fadeIn space-y-5">
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label htmlFor="firstName" className="block text-sm font-semibold text-text-primary mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    className="bg-surface border border-border text-text-primary px-4 py-3 rounded-xl placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    placeholder="e.g. John"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  <label htmlFor="lastName" className="block text-sm font-semibold text-text-primary mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    className="bg-surface border border-border text-text-primary px-4 py-3 rounded-xl placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                    placeholder="e.g. Doe"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="nic" className="block text-sm font-semibold text-text-primary mb-2">
                  National Identity Card (NIC)
                </label>
                <input
                  id="nic"
                  name="nic"
                  required
                  className="bg-surface border border-border text-text-primary px-4 py-3 rounded-xl placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  placeholder="e.g. 199912345678"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="block text-sm font-semibold text-text-primary mb-2">Faculty</label>
                <SelectList
                  options={faculties}
                  handleChange={handleChange}
                  name="faculty"
                  placeholder="Select your faculty..."
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="degree" className="block text-sm font-semibold text-text-primary mb-2">
                  Degree
                </label>
                <input
                  id="degree"
                  name="degree"
                  required
                  className="bg-surface border border-border text-text-primary px-4 py-3 rounded-xl placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  placeholder="e.g. Bachelor of Science in..."
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Standard fields shown for all roles */}
          <div className="flex flex-col gap-1.5 mt-2">
            <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="bg-surface border border-border text-text-primary px-4 py-3 rounded-xl placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              placeholder="e.g. johndoe@example.com"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="block text-sm font-semibold text-text-primary mb-2">
              Password
            </label>

            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-surface border border-border text-text-primary px-4 py-3 pr-10 rounded-xl placeholder:text-text-secondary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                placeholder="••••••••"
                onChange={handleChange}
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

          {message && (
            <div className={`mt-2 p-3 rounded-xl text-sm flex items-center gap-2 border ${
              message.includes("Please select") || message.toLowerCase().includes("error") || message.toLowerCase().includes("failed")
                ? "bg-danger/10 border-danger/20 text-danger"
                : "bg-success/10 border-success/20 text-success"
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl mt-4 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Sign Up
          </button>

          <p className="text-center text-text-secondary mt-6 text-sm font-medium">
            Already have an account?
            <Link
              to="/signin"
              className="text-primary ml-1.5 hover:text-primary-hover transition-colors"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
