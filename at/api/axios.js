
import axios from "axios";



const axiosInstance = axios.create({
 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for centralized error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        console.error("Not found");
      } else if (error.response.status === 401) {
        console.error("Unauthorized");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
