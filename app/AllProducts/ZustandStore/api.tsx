import axios from 'axios';

const API_BASE_URL = 'http://localhost:5151/api'; // Replace with your backend URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
