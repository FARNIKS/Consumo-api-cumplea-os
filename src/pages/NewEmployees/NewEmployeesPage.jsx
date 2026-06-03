import React, { useState, useEffect } from "react";
import { useNewEmployeeManagement } from "../../hooks/useNewEmployeeManagement";
import EmployeeList from "./uicomponents/EmployeeList";
import HistoryList from "./uicomponents/HistoryList";
import Swal from "sweetalert2";
import "./NewEmployeesPage.css";

const NewEmployeesPage = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const { employees, history, fetchData, syncEmployees, loading, syncing } =
    useNewEmployeeManagement();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSyncClick = async () => {
    const cuestionario = await Swal.fire({
      title: "¿Deseas iniciar la sincronización?",
      text: "El sistema consultará los nuevos ingresos registrados en AX durante la última semana. Este proceso puede tardar unos segundos debido a la conexión de red.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, sincronizar ahora",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!cuestionario.isConfirmed) {
      return;
    }

    const result = await syncEmployees();

    if (result.success) {
      const match = result.output.match(/Se añadieron (\d+) empleados/);
      const cantidadAnadidos = match ? parseInt(match[1], 10) : 0;

      if (cantidadAnadidos === 0) {
        Swal.fire({
          title: "Sincronización Completada",
          text: "No se registran nuevos ingresos en el sistema.",
          icon: "info",
          confirmButtonColor: "#1e3a8a",
          confirmButtonText: "Entendido",
        });
      } else {
        Swal.fire({
          title: "¡Sincronización Exitosa!",
          text: `Se lograron registrar ${cantidadAnadidos} nuevos empleados en la sala de espera.`,
          icon: "success",
          confirmButtonColor: "#1e3a8a",
          confirmButtonText: "Excelente",
        });
      }
    } else {
      Swal.fire({
        title: "Error de Sincronización",
        text: result.message,
        icon: "error",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content-wrapper">
          <div className="dashboard-header-meta">
            <h2 className="dashboard-title">Gestión de Nuevos Ingresos</h2>
            <p className="dashboard-subtitle">
              Administración de ingresos y registros históricos vinculados con
              AX
            </p>
          </div>
          <div className="header-actions-group">
            <button
              className="btn-sync-custom"
              onClick={handleSyncClick}
              disabled={syncing || loading}
            >
              {syncing ? (
                <span className="sync-btn-content">
                  <span className="spinner-sync"></span>
                  Sincronizando...
                </span>
              ) : (
                <span className="sync-btn-content">
                  <i className="bi bi-arrow-repeat"></i> Sincronizar Ahora
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="tab-content-area">
          <div className="nav-tabs-custom">
            <button
              className={activeTab === "pending" ? "active" : ""}
              onClick={() => setActiveTab("pending")}
            >
              Nuevos Ingresos
            </button>
            <button
              className={activeTab === "history" ? "active" : ""}
              onClick={() => setActiveTab("history")}
            >
              Historial
            </button>
          </div>

          <div className="tab-panel-container">
            {activeTab === "pending" ? (
              <EmployeeList employees={employees || []} isLoading={loading} />
            ) : (
              <HistoryList history={history || []} isLoading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmployeesPage;
