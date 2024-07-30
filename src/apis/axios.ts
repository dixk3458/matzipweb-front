import axios from 'axios';
import { getLocalStorage } from '../utils/localStorage';
import { storageKeys } from '../constants';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getLocalStorage(storageKeys.ACCESS_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('JWT 토큰:', token); // 토큰이 포함되어 있는지 확인
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
