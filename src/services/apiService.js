import apiClient from "../api/client";

export const genericService = {
  // Empleados (usará tu EmployeeResource)
  getEmployees: () => apiClient.get("/employees"),
  // Sucursales
  getBranches: () => apiClient.get("/branches"),
  // Empresas
  getCompanies: () => apiClient.get("/companies"),
  // Países
  getCountries: () => apiClient.get("/countries"),
};
