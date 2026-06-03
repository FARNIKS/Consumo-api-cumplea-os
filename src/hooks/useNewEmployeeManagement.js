import { useState, useCallback } from "react";
import { genericService } from "../services/apiService";

export const useNewEmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [history, setHistory] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [empRes, histRes, branchRes] = await Promise.allSettled([
        genericService.getNewEmployees(),
        genericService.getHistoryEmployees(),
        genericService.getBranches(),
      ]);

      if (empRes.status === "fulfilled") {
        const empData = empRes.value?.data?.data || empRes.value?.data || [];
        setEmployees(Array.isArray(empData) ? empData : []);
      }

      if (histRes.status === "fulfilled") {
        const histData = histRes.value?.data?.data || histRes.value?.data || [];
        setHistory(Array.isArray(histData) ? histData : []);
      }

      if (branchRes.status === "fulfilled") {
        const branchData =
          branchRes.value?.data?.data || branchRes.value?.data || [];
        setBranches(Array.isArray(branchData) ? branchData : []);
      }
    } catch (error) {
      console.error("Error crítico en el hook:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const syncEmployees = async () => {
    setSyncing(true);
    try {
      const response = await genericService.syncNewEmployeesNow();
      const status = response.data?.status;
      const message = response.data?.message;
      const output = response.data?.output || "";

      if (status === "success") {
        await fetchData();
        return { success: true, message, output };
      }

      return { success: false, message: message || "Respuesta inesperada." };
    } catch (error) {
      console.error("Error en sincronización manual:", error);
      const errMsg =
        error.response?.data?.message || "No se pudo conectar con el servidor.";
      return { success: false, message: errMsg };
    } finally {
      setSyncing(false);
    }
  };

  return {
    employees,
    history,
    branches,
    loading,
    syncing,
    fetchData,
    syncEmployees,
  };
};
