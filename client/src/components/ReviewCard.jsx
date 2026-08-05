import React from "react";

const ReviewCard = ({
  studentName,
  programTitle,
  duration,
  rating,
  description,
}) => {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Subtle top border highlight on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div>
        <div className="flex justify-between items-start mb-2 gap-2">
          <div>
            <h4 className="text-sm font-bold text-text-primary line-clamp-1">
              {studentName}
            </h4>
            <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
              {programTitle}
            </p>
            <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide mt-0.5">
              {duration}
            </p>
          </div>
          <div
            className="text-accent text-sm flex-shrink-0"
            title={`${rating} out of 5 stars`}
          >
            {"★".repeat(rating)}
            <span className="text-border">{"★".repeat(5 - rating)}</span>
          </div>
        </div>
        <p className="text-sm text-text-secondary italic line-clamp-4 relative mt-3">
          "{description}"
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
