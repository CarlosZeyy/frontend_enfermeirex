import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 ||
        error.response?.status === 403 ||
        error.response?.status === 500) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken: localStorage.getItem("refreshToken"),
        });

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);

        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
