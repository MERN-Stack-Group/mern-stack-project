import React from "react";

function ProgressTracker() {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm mb-4">

      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Mentorship Progress
      </h3>

      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Started</span>
        <span>In Progress</span>
        <span>Completed</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: "60%" }}
        ></div>
      </div>

      <p className="text-sm text-gray-500 mt-3">
        Current mentorship progress: 60%
      </p>

    </div>
  );
}

export default ProgressTracker;