import { Link } from "react-router-dom";
import { ArrowLeft, Clock, ShieldAlert } from "lucide-react";
import logoImg from "../assets/gradbridge_logo.png";

/**
 * Under Approval Page
 * Shown when an alumni with a pending unapproved account attempts to log in.
 */
function UnderApproval() {
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
        <div className="bg-slate-200 dark:bg-[#111622] w-full max-w-md p-8 rounded-2xl border border-slate-200 dark:border-sky-900/40 shadow-xl dark:shadow-2xl space-y-6 transition-colors text-center">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center space-y-2 mb-4">
            <img
              src={logoImg}
              alt="GradBridge Logo"
              className="h-14 w-auto object-contain"
            />
          </div>

          <div className="flex justify-center mb-2">
            <div className="bg-amber-100 dark:bg-amber-500/10 p-4 rounded-full border border-amber-200 dark:border-amber-500/30">
              <Clock size={40} className="text-amber-500" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Account Under Review
          </h2>
          
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Thank you for registering as an Alumni! Your account is currently pending approval by the administration team to verify your credentials.
          </p>

          <div className="bg-slate-300/50 dark:bg-[#161d2b] p-4 rounded-xl border border-slate-200 dark:border-slate-800/90 text-left flex items-start gap-3 mt-4">
            <ShieldAlert size={20} className="text-sky-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 dark:text-slate-400">
              To ensure the safety and quality of our mentorship network, all alumni accounts must be manually verified. You will receive an email once your account has been approved.
            </p>
          </div>

          <Link
            to="/signin"
            className="w-full inline-block bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 rounded-xl transition duration-200 shadow-lg shadow-sky-600/20 text-sm mt-6 cursor-pointer"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnderApproval;
