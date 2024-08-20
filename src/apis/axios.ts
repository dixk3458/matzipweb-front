import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
