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
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300 z-10 ${
                    isCompleted || isActive
                      ? "border-sky-500 bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400"
                      : "border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-[#161d2b] text-slate-400 dark:text-slate-500"
                  } ${isActive ? "ring-4 ring-sky-500/20" : ""} ${
                    isCompleted ? "bg-sky-600 text-white border-sky-600" : ""
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                {/* Step Label */}
                <span
                  className={`absolute top-10 text-xs font-semibold whitespace-nowrap ${
                    isCompleted || isActive ? "text-slate-900 dark:text-white" : "text-slate-500"
                  }`}
                >
                  {step}
                </span>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div className="flex-1 h-1 mx-2 bg-slate-200 dark:bg-slate-800 rounded">
                  <div
                    className="h-full bg-sky-500 rounded transition-all duration-500"
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
