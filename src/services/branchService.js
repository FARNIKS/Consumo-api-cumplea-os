import api from "../api/client"; // Usa el nombre del archivo real y el export default

export const branchService = {
  getAll: () => api.get("/branches"),

  // Asegúrate de que 'data' coincida con las reglas de tu Request en Laravel
  store: (data) => api.post("/branches", data),

  // Para SQL Server, usamos el 'code' (ej: ATISa) como identificador en la URL
  update: (code, data) => api.put(`/branches/${code}`, data),

  delete: (code) => api.delete(`/branches/${code}`),

  getFormDependencies: async () => {
    try {
      const response = await api.get("/countries");
      return {
        countries: response.data.data || [],
        companies: [],
      };
    } catch (error) {
      console.error("Error en dependencias:", error);
      return { countries: [] };
    }
  },
};
