import axios from "axios";
const clearBrowserStorage = {
  removeUserRef() {
    sessionStorage.clear();
    localStorage.clear();
  },
};
export { clearBrowserStorage };
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config:any) => {
    config.headers["Authorization"] = localStorage.getItem("accessToken")
      ? `Bearer ${localStorage.getItem("accessToken")}`
      : null;
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;
