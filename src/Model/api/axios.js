import axios from "axios";
import store from "../../controller/store";

export const API_URL = "https://vvcompany-server.ru/api";

axios.defaults.withCredentials = true;

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 403 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("accessToken", response.data.accessToken);
        return api.request(originalRequest);
      } catch (err) {
        console.error("Не авторизован");
      }
    } else {
      store.setError(error.response);
    }
    throw error;
  }
);

export default api;
