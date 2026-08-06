import React from "react";
import { Link } from "react-router-dom";

const ReviewCard = ({
  studentName,
  programTitle,
  duration,
  rating,
  description,
  reviewerId,
}) => {
  return (
    <div className="bg-slate-200 dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-xl flex flex-col justify-between h-full transition-colors">
      <div>
        <div className="flex justify-between items-start mb-2 gap-2">
          <div>
            {reviewerId ? (
              <Link to={`/profile/${reviewerId}`} className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline line-clamp-1">
                {studentName}
              </Link>
            ) : (
              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                {studentName}
              </h4>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-300 mt-0.5 line-clamp-1">
              {programTitle}
            </p>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mt-0.5">
              {duration}
            </p>
          </div>
          <div
            className="text-amber-400 text-xs flex-shrink-0 tracking-widest"
            title={`${rating} out of 5 stars`}
          >
            {"★".repeat(rating)}
            <span className="text-slate-300 dark:text-slate-700">{"★".repeat(5 - rating)}</span>
          </div>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 italic line-clamp-4 relative mt-3 leading-relaxed">
          "{description}"
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
