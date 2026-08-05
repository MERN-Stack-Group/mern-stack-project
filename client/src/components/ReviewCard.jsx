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
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-2 gap-2">
          <div>
            {reviewerId ? (
              <Link to={`/profile/${reviewerId}`} className="text-sm font-bold text-blue-600 hover:underline line-clamp-1">
                {studentName}
              </Link>
            ) : (
              <h4 className="text-sm font-bold text-gray-900 line-clamp-1">
                {studentName}
              </h4>
            )}
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
              {programTitle}
            </p>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mt-0.5">
              {duration}
            </p>
          </div>
          <div
            className="text-yellow-400 text-sm flex-shrink-0"
            title={`${rating} out of 5 stars`}
          >
            {"★".repeat(rating)}
            <span className="text-gray-200">{"★".repeat(5 - rating)}</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 italic line-clamp-4 relative mt-3">
          "{description}"
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
