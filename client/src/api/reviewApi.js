const API_URL = "http://localhost:5000/api/reviews";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
};

// Get all reviews (optionally filtered by type: "job","internship","mentorship","event","course")
export const getReviews = async (token, type = null) => {
  const url = type ? `${API_URL}?type=${type}` : API_URL;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

// Get reviews belonging to the logged-in user (as reviewer)
export const getMyReviews = async (token) => {
  const response = await fetch(`${API_URL}/user/my-reviews`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

// Get a single review by its MongoDB _id
export const getReviewById = async (reviewId, token) => {
  const response = await fetch(`${API_URL}/${reviewId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

// Get reviews for a specific company (companyId), optionally filtered by type
export const getCompanyReviews = async (companyId, token, type = null) => {
  const url = type
    ? `${API_URL}/company/${companyId}?type=${type}`
    : `${API_URL}/company/${companyId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};

// Create a new review (User/Student/Alumni only)
// payload: { type, companyId, companyName, rating, reviewText }
export const createReview = async (payload, token) => {
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

// Update an existing review (only by the author)
export const updateReview = async (reviewId, updates, token) => {
  // updates: { rating, reviewText }
  const response = await fetch(`${API_URL}/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  return handleResponse(response);
};

// Delete a review — only allowed by the author or admin (assuming token implies author)
export const deleteReview = async (reviewId, token) => {
  const response = await fetch(`${API_URL}/${reviewId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  return handleResponse(response);
};
