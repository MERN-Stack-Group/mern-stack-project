import React from "react";

export const MentorshipCard = ({
  programName,
  duration,
  status,
  menteeName,
  menteeRole,
  introduction,
}) => {
  const isCompleted = status.toLowerCase() === "completed";

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header: Program Name, Status, and Duration */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2 sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {programName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{duration}</p>
        </div>

        {/* Dynamic Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide w-max sm:self-start ${
            isCompleted
              ? "bg-gray-100 text-gray-600 border border-gray-200"
              : "bg-emerald-100 text-emerald-700 border border-emerald-200"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Introduction / Description Section */}
      <div className="mb-5">
        <p className="text-sm text-gray-700 leading-relaxed">{introduction}</p>
      </div>

      {/* Mentee Details Footer */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Mentee
        </h4>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-400 rounded-full flex-shrink-0 flex items-center justify-center text-xs text-white font-bold shadow-sm">
            IMG
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 hover:text-blue-700 hover:underline cursor-pointer">
              {menteeName}
            </h4>
            <p className="text-xs text-gray-600 line-clamp-1">{menteeRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
