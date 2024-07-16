import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "http://localhost:5000",
});

instanceAxios.interceptors.request.use(
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

export default instanceAxios;
