import React from "react";
import { Link } from "react-router-dom";

const IncomingRequestsTable = ({ requests = [], onAccept, onReject }) => {
  if (!Array.isArray(requests) || requests.length === 0) {
    return (
      <div className="bg-slate-200 dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-600 dark:text-slate-400 text-sm transition-colors">
        No pending mentorship requests at the moment.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-slate-200 dark:bg-[#111622] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-xl transition-colors">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800/80">
        <thead className="bg-slate-300 dark:bg-[#161d2b]">
          <tr>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Mentee
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Program & Topic
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Message
            </th>
            <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-slate-200 dark:bg-[#111622] divide-y divide-slate-200 dark:divide-slate-800/80">
          {requests.map((request) => (
            <tr key={request.id} className="hover:bg-slate-300 dark:hover:bg-[#161d2b]/60 transition">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/profile/${request.requesterId}`} className="hover:underline">
                  <div className="font-semibold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition">
                    {request.name}
                  </div>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{request.topic}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{request.program}</div>
              </td>
              <td className="px-6 py-4">
                <div
                  className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 max-w-xs"
                  title={request.message}
                >
                  {request.message}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                {request.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                <button
                  onClick={() => onAccept(request)}
                  className="inline-flex items-center px-3.5 py-1.5 border border-transparent text-xs font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 mr-2 transition cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reject this request?")) {
                      onReject(request.id);
                    }
                  }}
                  className="inline-flex items-center px-3.5 py-1.5 border border-slate-300 dark:border-slate-700 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-[#161d2b] hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomingRequestsTable;
