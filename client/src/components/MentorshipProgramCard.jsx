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
    <div className="bg-surface rounded border border-border p-8 shadow-sm transition-colors mb-6 relative">
      {/* Program Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary mt-1">{duration}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-widest border w-max ${
              step === 2
                ? "bg-surface-hover text-text-secondary border-border"
                : "bg-surface text-primary border-primary"
            }`}
          >
            {status}
          </span>
          {step === 0 && onDelete && (
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to remove this mentorship program? This action cannot be undone.",
                  )
                ) {
                  onDelete(program.id);
                }
              }}
              className="text-xs font-semibold text-danger hover:text-danger/80 hover:underline transition-colors focus:outline-none"
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
      <div className="flex justify-end gap-3 mt-4 mb-4">
        <button
          onClick={onPrevStep}
          disabled={step <= savedStep}
          className="px-4 py-2 text-xs font-semibold text-text-secondary bg-surface border border-border rounded hover:bg-surface-hover hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none"
        >
          &larr; Previous Step
        </button>
        <button
          onClick={onNextStep}
          disabled={step === 2 || hasUnsavedChanges}
          className="px-4 py-2 text-xs font-bold text-white bg-primary border border-transparent rounded hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none"
        >
          Next Step &rarr;
        </button>
      </div>

      {/* Finalize / Save Banner when there are unsaved changes */}
      {hasUnsavedChanges && (
        <div className="mb-5 mt-2 flex flex-col sm:flex-row items-center justify-between bg-surface-hover border border-border p-5 rounded animate-fadeIn">
          <p className="text-sm text-text-primary font-semibold mb-3 sm:mb-0">
            {step === 2
              ? "This program has reached completion. Save to move it to your history."
              : "You have unsaved progress. Save and update to proceed."}
          </p>
          <button
            onClick={() => onSave(step)}
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover border border-transparent text-white text-sm font-bold rounded transition-colors whitespace-nowrap focus:outline-none"
          >
            {step === 2 ? "Save & Finalize" : "Save Changes"}
          </button>
        </div>
      )}

      {/* Accordion Toggle for Students */}
      <div className="mt-4 border-t border-border pt-4">
        <button
          onClick={() => setShowStudents(!showStudents)}
          className="flex items-center text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
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
              <div className="mb-4 flex items-center justify-between bg-surface-hover border border-border text-text-secondary px-4 py-3 rounded text-sm font-medium">
                <span>{removedMentees.length} student(s) removed.</span>
                <button
                  onClick={onUndoRemove}
                  className="font-bold text-text-primary hover:underline focus:outline-none"
                >
                  Undo Last Removal
                </button>
              </div>
            )}

            {mentees.length === 0 ? (
              <p className="text-sm text-text-secondary italic">
                No students currently enrolled.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentees.map((mentee, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-surface-hover rounded border border-border flex flex-col justify-between relative group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-surface text-text-secondary rounded flex items-center justify-center font-bold text-sm border border-border">
                          {mentee.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-text-primary">
                            {mentee.name}
                          </h4>
                        </div>
                      </div>
                      {mentee.message && (
                        <p className="text-xs text-text-secondary italic border-l-2 border-border pl-3 mt-3 pr-8">
                          "{mentee.message}"
                        </p>
                      )}
                    </div>
                    {/* Remove Student Button */}
                    <button
                      onClick={() => onRemoveStudent(idx)}
                      className="absolute top-4 right-4 text-text-secondary hover:text-danger p-1 rounded transition-colors focus:outline-none"
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
