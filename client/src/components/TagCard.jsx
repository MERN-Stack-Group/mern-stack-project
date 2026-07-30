import React from "react";

const TagCard = ({ topic, skills }) => {
  return (
    <div className="w-full border-l bg-white rounded-lg border border-gray-300 p-6 shadow-sm">
      {/* Topic Title */}
      <h2 className="text-[#0A2540] text-xl font-bold mb-4 font-sans tracking-wide">
        {topic}
      </h2>

      {/* Skills Container */}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 border border-gray-200 rounded-md bg-[#FBFCFD] text-[#0A2540] text-sm font-mono tracking-tight"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagCard;
