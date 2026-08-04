const API_URL = "http://localhost:5000/api/mentorships";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
};

// Get all mentorships (optionally filtered by stage: "enrollment","active","completed")
export const getMentorships = async (token, stage = "enrollment") => {
  const url = stage ? `${API_URL}?stage=${stage}` : API_URL;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

// Get mentorships belonging to the logged-in alumni
export const getMyMentorships = async (token) => {
  const response = await fetch(`${API_URL}/alumni/my-programs`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

// Get a single mentorship by its MongoDB _id
export const getMentorshipById = async (mentorshipId, token) => {
  const response = await fetch(`${API_URL}/${mentorshipId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

// Create a new mentorship program (Alumni only)
// payload: { title, description, durationInWeeks }
export const createMentorship = async (payload, token) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

// Progress the mentorship stage (Alumni only)
// stage: "enrollment" ,"active", "completed"
export const progressMentorshipStage = async (mentorshipId, stage, token) => {
  const response = await fetch(`${API_URL}/${mentorshipId}/stage`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ stage }),
  });

  return handleResponse(response);
};

// Delete a mentorship program — only allowed while in "enrollment" stage (Alumni only)
export const deleteMentorship = async (mentorshipId, token) => {
  const response = await fetch(`${API_URL}/${mentorshipId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

// Remove a student from a mentorship program (Alumni only)
export const removeStudentFromMentorship = async (
  mentorshipId,
  studentId,
  token,
) => {
  const response = await fetch(
    `${API_URL}/${mentorshipId}/students/${studentId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return handleResponse(response);
};
