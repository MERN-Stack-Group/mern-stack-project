import React from "react";

function IncomingRequests() {
  const requests = [
    {
      id: 1,
      student: "John",
      topic: "Web Development",
    },
    {
      id: 2,
      student: "Sarah",
      topic: "Python Programming",
    },
  ];

  return (
    <div className="incoming-requests">
      <h2>Incoming Requests</h2>

      {requests.map((request) => (
        <div key={request.id} className="request-card">
          <h3>{request.student}</h3>
          <p>Interested in: {request.topic}</p>

          <button>Accept</button>
          <button>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default IncomingRequests;