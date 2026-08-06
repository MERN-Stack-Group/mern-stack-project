import React from "react";

/**
 * Premium Loading Screen Component
 * Features a glowing infinity symbol tracing animation to match the sleek sky/slate theme.
 */
export default function LoadingScreen({ fullScreen = true, message = "Loading..." }) {
  const containerClass = fullScreen
    ? "min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0b0f17] transition-colors duration-500 fixed inset-0 z-[100]"
    : "w-full py-24 flex flex-col items-center justify-center bg-transparent";

  return (
    <div className={containerClass}>
      <div className="relative flex flex-col items-center justify-center">
        {/* Ambient Back Glow */}
        <div className="absolute w-32 h-32 bg-sky-400/20 dark:bg-sky-500/20 rounded-full blur-[40px] animate-pulse"></div>
        
        {/* Infinity SVG Container */}
        <div className="relative w-24 h-12 flex items-center justify-center">
          <svg
            className="w-full h-full drop-shadow-[0_0_8px_rgba(2,132,199,0.3)] dark:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]"
            viewBox="0 0 100 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Faint Track */}
            <path
              d="M 25 25 C 25 10, 45 10, 50 25 C 55 40, 75 40, 75 25 C 75 10, 55 10, 50 25 C 45 40, 25 40, 25 25 Z"
              stroke="currentColor"
              strokeWidth="3"
              className="text-slate-200 dark:text-slate-800"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Animated Glowing Tracer */}
            <path
              d="M 25 25 C 25 10, 45 10, 50 25 C 55 40, 75 40, 75 25 C 75 10, 55 10, 50 25 C 45 40, 25 40, 25 25 Z"
              stroke="currentColor"
              strokeWidth="3"
              className="text-sky-600 dark:text-sky-400 animate-[infinity-trace_2s_linear_infinite]"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: "150",
                strokeDashoffset: "150",
              }}
            />
          </svg>
        </div>

        {/* Loading Text */}
        <p className="mt-8 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-[0.3em] animate-pulse">
          {message}
        </p>
      </div>

      <style>{`
        @keyframes infinity-trace {
          0% {
            stroke-dashoffset: 150;
          }
          100% {
            stroke-dashoffset: -150;
          }
        }
      `}</style>
    </div>
  );
}
