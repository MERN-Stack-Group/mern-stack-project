import React, { useState } from "react";

const CompletedProgramCard = ({
  title,
  duration,
  mentees = [],
  reviews = [],
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow mb-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{duration}</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-gray-100 text-gray-700 border border-gray-200">
          Completed
        </span>
      </div>

      {/* Accordion Toggle */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors focus:outline-none"
        >
          {showDetails ? "Hide Program Details" : "View Students & Reviews"}
          <svg
            className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
              showDetails ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Expandable Content */}
        {showDetails && (
          <div className="mt-6 animate-fadeIn space-y-6">
            {/* Section: Enrolled Students */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Participated Students ({mentees.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mentees.map((mentee, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs">
                      {mentee.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {mentee.name}
                      </p>
                      <p className="text-xs text-gray-500">{mentee.program}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Reviews */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Program Reviews ({reviews.length})
              </h4>
              {reviews.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  No reviews submitted yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {reviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-yellow-50/50 rounded-lg border border-yellow-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-900">
                          {review.author}
                        </span>
                        <div className="text-yellow-400 text-sm">
                          {"★".repeat(review.rating)}
                          <span className="text-gray-300">
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 italic">
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
