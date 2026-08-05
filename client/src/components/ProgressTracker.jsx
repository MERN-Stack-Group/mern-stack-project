import React from "react";

const ProgressTracker = ({ currentStep = 0 }) => {
  const steps = ["Enrollment", "Started", "Completed"];

  return (
    <div className="w-full pt-4 pb-8">
      <div className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={index}
              className={`flex items-center ${!isLast ? "flex-1" : ""}`}
            >
              {/* Step Circle & Label Wrapper */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors z-10 ${
                    isCompleted
                      ? "bg-primary border-primary text-white"
                      : isActive
                        ? "bg-surface border-primary text-primary"
                        : "bg-surface border-border text-text-secondary"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                {/* Absolute Positioned Label so it doesn't break flex layout */}
                <span
                  className={`absolute top-10 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap ${
                    isCompleted || isActive
                      ? "text-text-primary"
                      : "text-text-secondary"
                  }`}
                >
                  {step}
                </span>
              </div>

              {/* Connecting Line (Flex-1 makes it fill empty space) */}
              {!isLast && (
                <div className="flex-1 h-[2px] mx-2 bg-border">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: isCompleted ? "100%" : "0%" }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
