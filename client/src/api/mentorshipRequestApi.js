const API_URL = "http://localhost:5000/api/mentorship-requests";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
};

// Get pending requests for programs currently in enrollment (Alumni only)
export const getPendingRequests = async (token) => {
  const response = await fetch(`${API_URL}/pending`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

// Create a new mentorship request (Student only)
export const createMentorshipRequest = async (mentorshipId, message, token) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ mentorshipId, message }),
  });

  return handleResponse(response);
};

// Accept a mentorship request (Alumni only)
export const acceptRequest = async (requestId, token) => {
  const response = await fetch(`${API_URL}/${requestId}/accept`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

// Reject a mentorship request (Alumni only)
export const rejectRequest = async (requestId, token) => {
  const response = await fetch(`${API_URL}/${requestId}/reject`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};
