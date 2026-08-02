import React from "react";

const ProgressTracker = ({ currentStep = 0 }) => {
  const steps = ["Posted", "Enrollment", "Started", "Completed"];

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
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 z-10 bg-white ${
                    isCompleted || isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-gray-300 text-gray-400"
                  } ${isActive ? "ring-4 ring-blue-50" : ""} ${isCompleted ? "bg-blue-600 text-white" : ""}`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                {/* Absolute Positioned Label so it doesn't break flex layout */}
                <span
                  className={`absolute top-10 text-xs font-semibold whitespace-nowrap ${
                    isCompleted || isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>

              {/* Connecting Line (Flex-1 makes it fill empty space) */}
              {!isLast && (
                <div className="flex-1 h-1 mx-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-blue-600 rounded transition-all duration-500"
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
