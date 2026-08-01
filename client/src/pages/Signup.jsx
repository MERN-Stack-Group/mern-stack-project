import { useState } from "react";
import { Link } from "react-router-dom";
import SelectList from "../components/SelectList";
import { Eye, EyeOff } from "lucide-react";

function Signup({ switchToSignin }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure a role is selected before submitting
    if (!role) {
      setMessage("Please select a role to continue.");
      return;
    }

    // Combine role with form data for final payload
    const submissionData = { ...formData, role };
    console.log("Submitted Payload:", submissionData);

    setMessage("Registration submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0d0b] py-10 px-4">
      <div className="bg-[#24201D] w-full max-w-lg p-8 rounded-2xl shadow-xl border border-stone-800">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#F5F1EA] text-center">
            GradBridge
          </h1>
          <h2 className="text-md text-center mt-1 text-[#B8B0A8]">
            Student Mentorship & Alumni Network
          </h2>
        </div>

        <p className="text-lg font-semibold text-[#F5F1EA] mb-4">
          Create Account
        </p>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-400 mb-2">
            I am joining as an:
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              className={`flex-1 p-2.5 rounded-lg font-medium transition duration-200 ${
                role === "student"
                  ? "bg-[#7E8C54] text-white shadow-md"
                  : "bg-[#312C28] text-[#B8B0A8] hover:bg-[#3f3833]"
              }`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 p-2.5 rounded-lg font-medium transition duration-200 ${
                role === "alumni"
                  ? "bg-[#7E8C54] text-white shadow-md"
                  : "bg-[#312C28] text-[#B8B0A8] hover:bg-[#3f3833]"
              }`}
              onClick={() => setRole("alumni")}
            >
              Alumni
            </button>
          </div>
        </div>

        {/* Dynamic Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Render Alumni specific fields */}
          {role === "alumni" && (
            <>
              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-1">
                  <label htmlFor="firstName" className="text-sm text-stone-400">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    required
                    className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-[#7E8C54] focus:ring-1 focus:ring-[#7E8C54] transition"
                    placeholder="e.g. John"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <label htmlFor="lastName" className="text-sm text-stone-400">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    required
                    className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-[#7E8C54] focus:ring-1 focus:ring-[#7E8C54] transition"
                    placeholder="e.g. Doe"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="nic" className="text-sm text-stone-400">
                  National Identity Card (NIC)
                </label>
                <input
                  id="nic"
                  name="nic"
                  required
                  className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-[#7E8C54] focus:ring-1 focus:ring-[#7E8C54] transition"
                  placeholder="e.g. 199912345678"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-stone-400">Faculty</label>
                <SelectList
                  options={faculties}
                  handleChange={handleChange}
                  name="faculty"
                  placeholder="Select your faculty..."
                  required
                />
              </div>
            </>
          )}

          {/* Standard fields for both roles */}
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="email" className="text-sm text-stone-400">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="bg-[#312C28] border border-[#4A433E] text-stone-100 p-2.5 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-[#7E8C54] focus:ring-1 focus:ring-[#7E8C54] transition"
              placeholder="e.g. johndoe@example.com"
              onChange={handleChange}
            />
          </div>

          {/* Password Input Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-stone-400">
              Password
            </label>

            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"} //dynamically change type to show the password
                required
                className="w-full bg-[#312C28] border border-[#4A433E] text-stone-100 p-2.5 pr-10 rounded-lg placeholder:text-stone-600 focus:outline-none focus:border-[#7E8C54] focus:ring-1 focus:ring-[#7E8C54] transition"
                placeholder="••••••••"
              />

              {/* showpassword button */}
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

          {/* Form Messages */}
          {message && (
            <p
              className={`text-center mt-2 ${message.includes("Please select") ? "text-red-400" : "text-[#7E8C54]"}`}
            >
              {message}
            </p>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            className="bg-[#7E8C54] hover:bg-[#8E9E84] text-white font-medium p-3 rounded-lg mt-4 transition duration-200"
          >
            Sign Up
          </button>

          {/* Login Redirect */}
          <p className="text-center text-[#B8B0A8] mt-4 text-sm">
            Already have an account?
            <Link
              to="/signin"
              className="text-[#7E8C54] ml-2 font-medium hover:underline"
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
