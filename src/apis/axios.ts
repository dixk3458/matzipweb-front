import axios from 'axios';
import { refreshToken } from './auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
});

export default axiosInstance;
