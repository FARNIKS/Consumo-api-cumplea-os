import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Ajusta a tu URL real
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// INTERCEPTOR: Inyecta el token en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// INTERCEPTOR: Maneja errores globales (ej: 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login"; // Redirigir si el token no sirve
    }
    return Promise.reject(error);
  },
);

export default api;
