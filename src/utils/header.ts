import axiosInstance from '../apis/axios';

function setHeader(key: string, accessToken: string) {
  axiosInstance.defaults.headers.common[key] = accessToken;
}

function removeHeader(key: string) {
  const common = axiosInstance.defaults.headers.common;

  if (!common[key]) {
    return;
  }

  delete common[key];
}

export { setHeader, removeHeader };
