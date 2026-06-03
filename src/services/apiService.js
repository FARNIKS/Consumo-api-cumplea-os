import apiClient from "../api/client";

export const genericService = {
  getProfile: () => apiClient.get("/user"),

  getUsers: () => apiClient.get("/users"),
  registerUser: (data) => apiClient.post("/register", data),
  updateUser: (id, data) => apiClient.patch(`/users/${id}`, data),
  toggleUserStatus: (id) => apiClient.patch(`/users/status/${id}`),

  getEmployees: () => apiClient.get("/employees"),
  getBranches: () => apiClient.get("/branches"),
  getCountries: () => apiClient.get("/countries"),
  getDepartments: () => apiClient.get("departments"),

  getNewEmployees: () => apiClient.get("/new-employees"),
  getNewEmployeesCount: () => apiClient.get("/new-employees/count"),
  getHistoryEmployees: () => apiClient.get("/history-employees"),
  syncNewEmployeesNow: () => apiClient.post("/new-employees/sync"),

  getMailStatus: () => apiClient.get("/settings/status"),
  toggleMailPause: () => apiClient.post("/settings/toggle-pause"),
  runManualBirthdaySend: () => apiClient.post("/settings/run-manual-send"),

  getBirthdayConfig: () => apiClient.get("/settings/birthday"),
  updateBirthdayConfig: (data) => apiClient.put("/settings/birthday", data),
  restoreBirthdayConfig: () => apiClient.post("/settings/birthday/restore"),

  getNoBirthdayConfig: () => apiClient.get("/settings/no-birthday"),
  updateNoBirthdayConfig: (data) =>
    apiClient.put("/settings/no-birthday", data),
  restoreNoBirthdayConfig: () =>
    apiClient.post("/settings/no-birthday/restore"),

  getFridayReportStatus: () =>
    apiClient.get("/settings/new-employees-friday-status"),
  toggleFridayReport: () =>
    apiClient.post("/settings/new-employees-friday/toggle"),
  runFridayReportManual: () =>
    apiClient.post("/settings/new-employees-friday/run"),

  getMondayProcessStatus: () =>
    apiClient.get("/settings/new-employees-monday-status"),
  toggleMondayProcess: () =>
    apiClient.post("/settings/new-employees-monday/toggle"),
  runMondayProcessManual: () =>
    apiClient.post("/settings/new-employees-monday/run"),

  getNewEmployeeReportConfig: () =>
    apiClient.get("/settings/new-employee-report"),
  updateNewEmployeeReportConfig: (data) =>
    apiClient.put("/settings/new-employee-report", data),
  restoreNewEmployeeReportConfig: () =>
    apiClient.post("/settings/new-employee-report/restore"),

  getNewEmployeeReportRhConfig: () =>
    apiClient.get("/settings/new-employee-report-rh"),
  updateNewEmployeeReportRhConfig: (data) =>
    apiClient.put("/settings/new-employee-report-rh", data),
  restoreNewEmployeeReportRhConfig: () =>
    apiClient.post("/settings/new-employee-report-rh/restore"),

  getNoNewEmployeeReportRhConfig: () =>
    apiClient.get("/settings/no-new-employee-report-rh"),
  updateNoNewEmployeeReportRhConfig: (data) =>
    apiClient.put("/settings/no-new-employee-report-rh", data),
  restoreNoNewEmployeeReportRhConfig: () =>
    apiClient.post("/settings/no-new-employee-report-rh/restore"),
};
