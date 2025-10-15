import axios from "axios";
const clearBrowserStorage = {
  removeUserRef() {
    sessionStorage.clear();
    localStorage.clear();
  },
};
export { clearBrowserStorage };
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config:any) => {
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;

