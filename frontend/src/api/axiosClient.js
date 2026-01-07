import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

// add token if available
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("cousify_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
