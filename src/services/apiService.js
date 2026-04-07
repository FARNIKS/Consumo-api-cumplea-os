import apiClient from "../api/client"; // Asegúrate de usar el nombre correcto del archivo

export const genericService = {
  getEmployees: () => apiClient.get("/employees"),
  getBranches: () => apiClient.get("/branches"),
  getCountries: () => apiClient.get("/countries"),
  // getCompanies eliminado porque ahora es un campo de texto en Branch
};
