import axios from "axios";
import router from "../router";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерцептор для обработки ошибок
httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(message);
  }
);

const authHttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const authInterceptor = (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

authHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        router.push("/auth");

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
authHttpClient.interceptors.request.use(authInterceptor);

export { httpClient, authHttpClient };
