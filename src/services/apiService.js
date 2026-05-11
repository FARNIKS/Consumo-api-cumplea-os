import apiClient from "../api/client";

export const genericService = {
  getProfile: () => apiClient.get("/user"),

  getMailStatus: () => apiClient.get("/settings/status"),
  toggleMailPause: () => apiClient.post("/settings/toggle-pause"),
  runManualBirthdaySend: () => apiClient.post("/settings/run-manual-send"),

  getUsers: () => apiClient.get("/users"),
  registerUser: (data) => apiClient.post("/register", data),
  updateUser: (id, data) => apiClient.patch(`/users/${id}`, data),
  toggleUserStatus: (id) => apiClient.patch(`/users/status/${id}`),

  getEmployees: () => apiClient.get("/employees"),
  getBranches: () => apiClient.get("/branches"),
  getCountries: () => apiClient.get("/countries"),

  getBirthdayConfig: () => apiClient.get("/settings/birthday"),
  updateBirthdayConfig: (data) => apiClient.put("/settings/birthday", data),
  restoreBirthdayConfig: () => apiClient.post("/settings/birthday/restore"),

  getNoBirthdayConfig: () => apiClient.get("/settings/no-birthday"),
  updateNoBirthdayConfig: (data) =>
    apiClient.put("/settings/no-birthday", data),
  restoreNoBirthdayConfig: () =>
    apiClient.post("/settings/no-birthday/restore"),
};
