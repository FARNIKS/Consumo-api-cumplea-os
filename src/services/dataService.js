import apiClient from "../api/apiClient";

export const branchService = {
  // Obtener todas las sucursales
  getAll: () => apiClient.get("/employees"), // Ajusta al endpoint correcto

  // Guardar nueva sucursal
  store: (data) => apiClient.post("/branches", data),

  // Actualizar (usando el 'code' como PK)
  update: (code, data) => apiClient.put(`/branches/${code}`, data),

  // Desactivar
  delete: (code) => apiClient.delete(`/branches/${code}`),

  // Helper para cargar selects en el formulario
  getFormDependencies: async () => {
    const [countries, companies] = await Promise.all([
      apiClient.get("/countries"),
      apiClient.get("/companies"),
    ]);
    return {
      countries: countries.data.data,
      companies: companies.data.data,
    };
  },
};
