import React from "react";
import { Link } from "react-router-dom";

const IncomingRequestsTable = ({ requests = [], onAccept, onReject }) => {
  if (!Array.isArray(requests) || requests.length === 0) {
    return (
      <div className="bg-surface border border-border rounded p-8 text-center text-text-secondary">
        No pending mentorship requests at the moment.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-surface border border-border rounded shadow-sm">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-surface-hover">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">
              Mentee
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">
              Program &amp; Topic
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">
              Message
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold text-text-secondary uppercase tracking-widest">
              Date
            </th>
            <th className="px-6 py-4 text-right text-xs font-bold text-text-secondary uppercase tracking-widest">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-surface divide-y divide-border">
          {requests.map((request) => (
            <tr
              key={request.id}
              className="hover:bg-surface-hover transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-semibold text-text-primary">
                  {request.requesterId &&
                  request.requesterId !== "undefined" ? (
                    <Link
                      to={`/profile/${request.requesterId}`}
                      className="hover:text-primary transition-colors hover:underline"
                    >
                      {request.name}
                    </Link>
                  ) : (
                    <span>{request.name}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-text-primary mb-0.5">
                  {request.topic}
                </div>
                <div className="text-xs text-text-secondary">
                  {request.program}
                </div>
              </td>
              <td className="px-6 py-4">
                <div
                  className="text-sm text-text-secondary line-clamp-2 max-w-xs"
                  title={request.message}
                >
                  {request.message}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                {request.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                <button
                  onClick={() => onAccept(request)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary hover:bg-primary-hover transition-colors focus:outline-none"
                >
                  Accept
                </button>
                <button
                  onClick={() => onReject(request.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-border text-xs font-medium rounded text-text-secondary bg-surface hover:bg-surface-hover hover:text-danger hover:border-danger transition-colors focus:outline-none"
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
