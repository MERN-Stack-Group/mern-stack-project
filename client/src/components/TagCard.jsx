import React from "react";

const TagCard = ({ topic, skills }) => {
  return (
    <div className="w-full bg-surface rounded border border-border p-6 shadow-sm">
      {/* Topic Title */}
      <h2 className="text-text-primary text-lg font-bold mb-4 tracking-wide">
        {topic}
      </h2>

      {/* Skills Container */}
      <div className="flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-1 border border-border rounded bg-surface-hover text-text-primary text-xs font-semibold transition-colors hover:text-primary hover:border-primary"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-text-secondary italic">
            No skills or interests added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default TagCard;
