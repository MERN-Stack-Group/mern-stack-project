import React from "react";

const TagCard = ({ topic, skills }) => {
  return (
    <div className="w-full bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm dark:shadow-none text-left transition-colors">
      {/* Topic Title */}
      <h2 className="text-slate-900 dark:text-white text-xl font-bold mb-4 font-sans tracking-wide">
        {topic}
      </h2>

      {/* Skills Container */}
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-100 dark:bg-[#161d2b] text-slate-700 dark:text-slate-300 text-xs font-medium"
          >
            {skill}
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-xs text-slate-500">No skills or interests listed.</p>
        )}
      </div>
    </div>
  );
};

export default TagCard;
