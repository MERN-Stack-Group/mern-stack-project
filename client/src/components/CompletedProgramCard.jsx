import React, { useState } from "react";

const CompletedProgramCard = ({
  title,
  duration,
  mentees = [],
  reviews = [],
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-surface rounded border border-border p-8 shadow-sm hover:shadow transition-all duration-200 mb-6 relative">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary mt-1">{duration}</p>
        </div>
        <span className="px-3 py-1 rounded text-xs font-semibold uppercase bg-surface-hover text-text-secondary border border-border">
          Completed
        </span>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
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

        {showDetails && (
          <div className="mt-6 animate-fadeIn space-y-6">
            <div>
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                Participated Students ({mentees.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mentees.map((mentee, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-surface-hover rounded border border-border"
                  >
                    <div className="w-8 h-8 bg-surface text-primary rounded-full flex items-center justify-center font-bold text-xs border border-border">
                      {mentee.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">
                        {mentee.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {mentee.program}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                Program Reviews ({reviews.length})
              </h4>
              {reviews.length === 0 ? (
                <p className="text-sm text-text-secondary italic">
                  No reviews submitted yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {reviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-surface-hover rounded border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-text-primary">
                          {review.author}
                        </span>
                        <div className="text-accent text-sm">
                          {"★".repeat(review.rating)}
                          <span className="text-border">
                            {"★".repeat(5 - review.rating)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary italic">
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
