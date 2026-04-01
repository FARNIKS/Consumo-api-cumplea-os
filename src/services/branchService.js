// src/services/branchService.js
import apiClient from "../api/client"; // Cambiado a ../api/client

export const branchService = {
  // Obtener todas las sucursales (Tu ruta en Laravel es /v1/branches)
  getAll: () => apiClient.get("/branches"),

  // Guardar nueva sucursal
  store: (data) => apiClient.post("/branches", data),

  // Actualizar (usando el 'code' como PK)
  update: (code, data) => apiClient.put(`/branches/${code}`, data),

  // Desactivar (Tu controller usa el método destroy que cambia el estado a false)
  delete: (code) => apiClient.delete(`/branches/${code}`),

  // Helper para cargar selects en el formulario (Trae países y empresas)
  getFormDependencies: async () => {
    try {
      const [countries, companies] = await Promise.all([
        apiClient.get("/countries"),
        apiClient.get("/companies"),
      ]);
      return {
        countries: countries.data.data, // Laravel Resource envuelve en 'data'
        companies: companies.data.data,
      };
    } catch (error) {
      console.error("Error cargando dependencias:", error);
      return { countries: [], companies: [] };
    }
  },
};
