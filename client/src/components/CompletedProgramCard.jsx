import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const CompletedProgramCard = ({
  title,
  duration,
  mentees = [],
  reviews = [],
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm dark:shadow-xl mb-6 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{duration}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          Completed
        </span>
      </div>

      {/* Accordion Toggle */}
      <div className="mt-4 border-t border-slate-200 dark:border-slate-800/80 pt-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
        >
          {showDetails ? "Hide Program Details" : "View Students & Reviews"}
          <ChevronDown
            size={16}
            className={`ml-1 transform transition-transform duration-200 ${
              showDetails ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expandable Content */}
        {showDetails && (
          <div className="mt-6 space-y-6">
            {/* Section: Enrolled Students */}
            <div>
              <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Participated Students ({mentees.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mentees.map((mentee, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#161d2b] rounded-xl border border-slate-200 dark:border-slate-800"
                  >
                    <div className="w-8 h-8 bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50 rounded-full flex items-center justify-center font-bold text-xs">
                      {mentee.name.charAt(0)}
                    </div>
                    <div>
                      <Link to={`/profile/${mentee.id}`} className="hover:underline">
                        <p className="text-xs font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition">
                          {mentee.name}
                        </p>
                      </Link>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{mentee.program}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Reviews */}
            <div>
              <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Program Reviews ({reviews.length})
              </h4>
              {reviews.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  No reviews submitted yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {reviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 dark:bg-[#161d2b] rounded-xl border border-slate-200 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {review.author}
                        </span>
                        <div className="text-amber-400 text-xs tracking-widest">
                          {"★".repeat(review.rating)}
                          <span className="text-slate-300 dark:text-slate-700">
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                        "{review.description}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedProgramCard;
