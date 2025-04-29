const API_BASE_URL = "http://localhost:5000";

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  if (!response.ok) {
    localStorage.clear(); // Clear tokens if refresh fails
    window.location.href = "/login"; // Redirect to login page
    throw new Error("Session expired. Please log in again.");
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.accessToken);
  return data.accessToken;
};

// Wrapper function for fetch with auto-refresh logic
const fetchWithAuth = async (url, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");

  // Attach Authorization header
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(`${API_BASE_URL}${url}`, options);

  // If unauthorized, try refreshing the token
  if (response.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken();
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(`${API_BASE_URL}${url}`, options); // Retry request
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  }

  return response;
};

export default fetchWithAuth;
