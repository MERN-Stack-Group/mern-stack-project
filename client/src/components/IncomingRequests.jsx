import React from "react";

const IncomingRequestsTable = ({ requests, onAccept, onReject }) => {
  if (requests.length === 0) {
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
            <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">
              Mentee
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">
              Program & Topic
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">
              Message
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-text-secondary uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-text-secondary uppercase tracking-wider">
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
                  {request.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-text-primary">{request.topic}</div>
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
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onAccept(request)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-primary hover:bg-primary-hover mr-2 transition-colors focus:outline-none"
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
