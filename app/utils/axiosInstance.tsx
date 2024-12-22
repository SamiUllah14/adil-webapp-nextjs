// /app/utils/axiosInstance.ts
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5151/api', // Replace with your actual backend API URL
});

// Add a request interceptor to include the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    // Access the jwtToken from localStorage
    const jwtToken = localStorage.getItem('jwtToken'); // Updated to 'jwtToken'
    if (jwtToken && config.headers) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
