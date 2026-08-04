import React, { useState } from "react";
import ProgressTracker from "./ProgressTracker";

const MentorshipProgramCard = ({
  program,
  onNextStep,
  onPrevStep,
  onRemoveStudent,
  onUndoRemove,
  onSave,
  onDelete,
}) => {
  const [showStudents, setShowStudents] = useState(false);
  const {
    title,
    duration,
    status,
    step,
    savedStep = 0,
    mentees = [],
    removedMentees = [],
  } = program;

  const hasUnsavedChanges = step !== savedStep;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow mb-6">
      {/* Program Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{duration}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
              step === 2
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}
          >
            {status}
          </span>
          {step === 0 && onDelete && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to remove this mentorship program? This action cannot be undone.")) {
                  onDelete(program.id);
                }
              }}
              className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors"
            >
              Remove Mentorship
            </button>
          )}
        </div>
      </div>

      {/* Aligned Progress Tracker */}
      <div className="mt-4 px-2">
        <ProgressTracker currentStep={step} />
      </div>

      {/* Step Controls */}
      <div className="flex justify-end gap-3 mt-2 mb-4">
        <button
          onClick={onPrevStep}
          disabled={step <= savedStep}
          className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          &larr; Previous Step
        </button>
        <button
          onClick={onNextStep}
          disabled={step === 2 || hasUnsavedChanges}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 border border-transparent rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next Step &rarr;
        </button>
      </div>

      {/* Finalize / Save Banner when there are unsaved changes */}
      {hasUnsavedChanges && (
        <div className="mb-4 mt-2 flex flex-col sm:flex-row items-center justify-between bg-yellow-50 border border-yellow-200 p-4 rounded-lg animate-fadeIn">
          <p className="text-sm text-yellow-800 font-medium mb-2 sm:mb-0">
            {step === 2
              ? "This program has reached completion. Save to move it to your history."
              : "You have unsaved progress. Save and update to proceed."}
          </p>
          <button
            onClick={() => onSave(step)}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-bold rounded shadow-sm transition-colors whitespace-nowrap"
          >
            {step === 2 ? "Save & Finalize" : "Save Changes"}
          </button>
        </div>
      )}

      {/* Accordion Toggle for Students */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <button
          onClick={() => setShowStudents(!showStudents)}
          className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors focus:outline-none"
        >
          {showStudents
            ? "Hide Enrolled Students"
            : `View Enrolled Students (${mentees.length})`}
          <svg
            className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
              showStudents ? "rotate-180" : ""
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

        {/* Expandable Mentees Section */}
        {showStudents && (
          <div className="mt-4 animate-fadeIn">
            {removedMentees.length > 0 && (
              <div className="mb-4 flex items-center justify-between bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg text-sm">
                <span>{removedMentees.length} student(s) removed.</span>
                <button
                  onClick={onUndoRemove}
                  className="font-bold hover:underline focus:outline-none"
                >
                  Undo Last Removal
                </button>
              </div>
            )}

            {mentees.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                No students currently enrolled.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentees.map((mentee, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-between relative group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                          {mentee.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">
                            {mentee.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {mentee.program}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 italic border-l-2 border-indigo-200 pl-2 mt-2 pr-8">
                        "{mentee.message}"
                      </p>
                    </div>
                    {/* Remove Student Button */}
                    <button
                      onClick={() => onRemoveStudent(idx)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-600 p-1 rounded transition-colors focus:outline-none"
                      title="Remove Student"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipProgramCard;
