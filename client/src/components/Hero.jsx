import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="pt-12 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-[#132226] border border-emerald-200 dark:border-[#1e3a34] text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
            University Alumni & Student Mentorship
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Connect with real alumni who have{" "}
            <span className="text-sky-600 dark:text-sky-400 font-extrabold">
              been in your shoes
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
            Get authentic career guidance, resume feedback, and project advice directly from university graduates working in top companies and research institutions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-slate-2000 text-white font-medium px-6 py-3 rounded-xl transition duration-200 shadow-lg shadow-sky-600/20"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/signin"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-200 dark:bg-[#161c27] hover:bg-slate-200 dark:hover:bg-[#1f2838] border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium px-6 py-3 rounded-xl transition duration-200 shadow-sm"
            >
              Sign In to Your Account
            </Link>
          </div>

          {/* Mentor Avatars & Stats */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white dark:border-[#0b0f17] flex items-center justify-center text-[10px] font-bold text-white">
                DS
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-600 border-2 border-white dark:border-[#0b0f17] flex items-center justify-center text-[10px] font-bold text-white">
                ML
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-600 border-2 border-white dark:border-[#0b0f17] flex items-center justify-center text-[10px] font-bold text-white">
                SE
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-slate-200">500+ verified mentors</span> available across faculties
            </p>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-200 dark:bg-slate-900 aspect-[4/3] lg:aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Students collaborating"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 dark:from-[#0b0f17]/40 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="mt-16 bg-slate-200 dark:bg-[#111622] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-md dark:shadow-none">
        <div className="space-y-1 md:border-r border-slate-200 dark:border-slate-800/80 last:border-r-0">
          <div className="text-2xl md:text-3xl font-bold text-sky-600 dark:text-sky-400 flex items-center justify-center gap-2">
            <span className="text-slate-400 text-lg">👥</span> 1,200+
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Verified Alumni</p>
        </div>

        <div className="space-y-1 md:border-r border-slate-200 dark:border-slate-800/80 last:border-r-0">
          <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2">
            <span className="text-slate-400 text-lg">📖</span> 450+
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Research Topics</p>
        </div>

        <div className="space-y-1 md:border-r border-slate-200 dark:border-slate-800/80 last:border-r-0">
          <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-2">
            <span className="text-slate-400 text-lg">💼</span> 300+
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Opportunities</p>
        </div>

        <div className="space-y-1">
          <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2">
            <span className="text-slate-400 text-lg">🏅</span> 98%
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Satisfaction Rate</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
