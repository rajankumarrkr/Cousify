import axios from "axios";
console.log("API URL",import.meta.env.VITE_API_URL)
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Important for cookies (refresh token)
});

// Add token if available
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("cousify_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401 errors
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await axios.get(
          "http://localhost:5000/api/auth/refresh",
          { withCredentials: true }
        );

        const { token, user } = response.data;
        localStorage.setItem("cousify_token", token);
        localStorage.setItem("cousify_user", JSON.stringify(user));

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem("cousify_token");
        localStorage.removeItem("cousify_user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
