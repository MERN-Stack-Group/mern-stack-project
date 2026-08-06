import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProgressTracker from "./ProgressTracker";
import { ChevronDown, Trash2 } from "lucide-react";

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
    <div className="bg-white dark:bg-[#111622] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm dark:shadow-xl mb-6 transition-colors">
      {/* Program Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{duration}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
              step === 2
                ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50"
                : "bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800/50"
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
              className="text-xs font-semibold text-red-400 hover:text-red-300 transition cursor-pointer"
            >
              Remove Mentorship
            </button>
          )}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="mt-4 px-2">
        <ProgressTracker currentStep={step} />
      </div>

      {/* Step Controls */}
      <div className="flex justify-end gap-3 mt-2 mb-4">
        <button
          onClick={onPrevStep}
          disabled={step <= savedStep}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#161d2b] border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-[#1f2838] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
        >
          &larr; Previous Step
        </button>
        <button
          onClick={onNextStep}
          disabled={step === 2 || hasUnsavedChanges}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 border border-transparent rounded-xl hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-md shadow-sky-600/20"
        >
          Next Step &rarr;
        </button>
      </div>

      {/* Finalize / Save Banner */}
      {hasUnsavedChanges && (
        <div className="mb-4 mt-2 flex flex-col sm:flex-row items-center justify-between bg-amber-950/40 border border-amber-800/50 p-4 rounded-xl">
          <p className="text-xs text-amber-300 font-medium mb-2 sm:mb-0">
            {step === 2
              ? "This program has reached completion. Save to move it to your history."
              : "You have unsaved progress. Save and update to proceed."}
          </p>
          <button
            onClick={() => onSave(step)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer whitespace-nowrap"
          >
            {step === 2 ? "Save & Finalize" : "Save Changes"}
          </button>
        </div>
      )}

      {/* Accordion Toggle for Students */}
      <div className="mt-4 border-t border-slate-200 dark:border-slate-800/80 pt-4">
        <button
          onClick={() => setShowStudents(!showStudents)}
          className="flex items-center text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline transition cursor-pointer"
        >
          {showStudents
            ? "Hide Enrolled Students"
            : `View Enrolled Students (${mentees.length})`}
          <ChevronDown
            size={16}
            className={`ml-1 transform transition-transform duration-200 ${
              showStudents ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expandable Mentees Section */}
        {showStudents && (
          <div className="mt-4 space-y-4">
            {removedMentees.length > 0 && (
              <div className="flex items-center justify-between bg-amber-950/40 border border-amber-800/50 text-amber-300 px-4 py-2 rounded-xl text-xs">
                <span>{removedMentees.length} student(s) removed.</span>
                <button
                  onClick={onUndoRemove}
                  className="font-bold hover:underline cursor-pointer"
                >
                  Undo Last Removal
                </button>
              </div>
            )}

            {mentees.length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                No students currently enrolled.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentees.map((mentee, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 dark:bg-[#161d2b] rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between relative group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50 rounded-full flex items-center justify-center font-bold text-xs">
                          {mentee.name.charAt(0)}
                        </div>
                        <div>
                          <Link to={`/profile/${mentee.id}`} className="hover:underline">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition">
                              {mentee.name}
                            </h4>
                          </Link>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {mentee.program}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic border-l-2 border-sky-600/50 pl-2 mt-2 pr-8">
                        "{mentee.message}"
                      </p>
                    </div>
                    {/* Remove Student Button */}
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove this student from the program?")) {
                          onRemoveStudent(idx);
                        }
                      }}
                      className="absolute top-4 right-4 text-slate-500 hover:text-red-400 p-1 transition cursor-pointer"
                      title="Remove Student"
                    >
                      <Trash2 size={16} />
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
