import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Network,
  ArrowUpRight,
} from "lucide-react";

function InfoSection() {
  return (
    <section className="pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Cards Row: Student Bank & Alumni Bank */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Students Card */}
        <div className="bg-slate-200 dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-md dark:shadow-none">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800/50 flex items-center justify-center text-sky-600 dark:text-sky-400">
                <GraduationCap size={24} />
              </div>
              <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase bg-slate-200 dark:bg-slate-800/60 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700/50">
                STUDENT BANK
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Current Students
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Seek career guidance, code & project feedback, research collaborations, and exclusive internship opportunities from experienced seniors and verified alumni.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["#MachineLearning", "#SoftwareEngineering", "#Internships", "#Research"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-[#17202e] border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Link
            to="/search/mentors"
            className="w-full bg-slate-200 dark:bg-[#161c27] hover:bg-slate-300 dark:hover:bg-[#1f2838] border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-200 text-sm"
          >
            Find a Mentor
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Seniors & Alumni Card */}
        <div className="bg-slate-200 dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-md dark:shadow-none">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Network size={24} />
              </div>
              <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase bg-slate-200 dark:bg-slate-800/60 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700/50">
                ALUMNI BANK
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Seniors & Alumni
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Give back to your alma mater by offering 1-on-1 mentorship, sharing domain & research insights, and referring top student talents to your network.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["#Mentorship", "#IndustryInsights", "#Referrals", "#PeerReview"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-[#17202e] border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Link
            to="/signup"
            className="w-full bg-slate-200 dark:bg-[#161c27] hover:bg-slate-300 dark:hover:bg-[#1f2838] border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition duration-200 text-sm"
          >
            Become a Mentor
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Feature Cards Row */}
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<ShieldCheck size={22} />}
          iconColor="text-sky-600 dark:text-sky-400"
          iconBg="bg-slate-200 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800/40"
          title="Verified Alumni Credentials"
          text="Admin-verified university profiles ensure authentic connections and trusted academic credentials."
        />
        <FeatureCard
          icon={<Briefcase size={22} />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/40"
          title="Opportunity Board"
          text="Access curated internships, research grants, entry-level job posts, and project collaborations."
        />
        <FeatureCard
          icon={<Network size={22} />}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/40"
          title="Mentorship Pipeline"
          text="Structured stages from initial mentorship request to application completion and review."
        />
      </div>
    </section>
  );
}

function FeatureCard({ icon, iconColor, iconBg, title, text }) {
  return (
    <div className="bg-slate-200 dark:bg-[#111622] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-slate-700 transition shadow-sm dark:shadow-none">
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${iconBg} ${iconColor}`}>
        {icon}
      </div>

      <h3 className="text-slate-900 dark:text-white font-semibold text-base mb-2">
        {title}
      </h3>

      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
        {text}
      </p>
    </div>
  );
}

export default InfoSection;