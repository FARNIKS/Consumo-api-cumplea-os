import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import * as apiService from "../../services/apiService";
import useNewEmployeeMailSettings from "../../hooks/useNewEmployeeMailSettings";
import { useNewEmployeeMonday } from "../../hooks/useNewEmployeeMonday";
import { useNewEmployeeFriday } from "../../hooks/useNewEmployeeFriday";
import NewEmployeeSettingsForm from "../../components/NewEmployeeMailSettings/NewEmployeeSettingsForm/NewEmployeeSettingsForm";
import NewEmployeeMailPreview from "../../components/NewEmployeeMailSettings/NewEmployeeMailPreview/NewEmployeeMailPreview";
import ManualSendButton from "../../components/ManualSendButton/ManualSendButton";
import "./NewEmployeeMailSettings.css";

const NewEmployeeMailSettings = () => {
  const [newEmployeesCount, setNewEmployeesCount] = useState(null);

  const {
    activeTab,
    setActiveTab,
    loading,
    currentConfig,
    updateConfig,
    handleUpdate,
    handleReset,
  } = useNewEmployeeMailSettings();

  const mondayService = useNewEmployeeMonday();
  const fridayService = useNewEmployeeFriday();

  const isFridayTab = activeTab === "friday-with" || activeTab === "friday-no";
  const service = isFridayTab ? fridayService : mondayService;

  const fetchCount = useCallback(async () => {
    try {
      const response = await apiService.genericService.getNewEmployeesCount();

      const count = response.data?.data?.count ?? 0;

      setNewEmployeesCount(count);
    } catch (error) {
      console.error("Error cargando el conteo:", error);
      setNewEmployeesCount(0);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchCount();
    };

    loadData();
  }, [fetchCount]);

  const handleUpdateAndRefresh = async () => {
    await handleUpdate();
    fetchCount();
  };

  const handleManualSendWithCheck = async () => {
    const requiresValidation = activeTab === "general";

    if (requiresValidation && newEmployeesCount === 0) {
      Swal.fire({
        icon: "info",
        title: "Sin ingresos pendientes",
        text: "Actualmente no hay nuevos empleados en la lista para enviar comunicados.",
        confirmButtonColor: "#1e3a8a",
      });
      return;
    }

    await service.runManualSend();

    if (requiresValidation) {
      fetchCount();
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando configuraciones...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content-wrapper">
          <div>
            <h2 className="dashboard-title">Ajustes de Nuevos Empleados</h2>
            <div className="dashboard-header-meta">
              <p className="dashboard-subtitle">
                Gestiona los comunicados de ingresos y reportes
              </p>
              {newEmployeesCount !== null && (
                <span className="count-text">
                  Hay <strong>{newEmployeesCount}</strong> nuevos empleados
                  pendiente de procesar.
                </span>
              )}
            </div>
          </div>

          <div className="header-actions-group">
            <ManualSendButton
              onClick={handleManualSendWithCheck}
              isProcessing={service.isProcessingManual}
            />
            <div
              className={`status-control-card ${service.isPaused ? "is-paused" : "is-active"}`}
            >
              <div className="status-info">
                <span className="status-dot"></span>
                <span className="status-label">
                  {service.isPaused ? "Servicio Pausado" : "Servicio Activo"}
                </span>
              </div>
              <button
                onClick={service.handleTogglePause}
                disabled={service.loadingPause}
                className="status-toggle-button"
              >
                {service.loadingPause ? (
                  <div className="btn-spinner-dark"></div>
                ) : (
                  <i
                    className={`bi ${service.isPaused ? "bi-play-circle-fill" : "bi-pause-circle-fill"}`}
                  ></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-card">
        <div className="tabs-container">
          <ul className="nav-tabs-custom">
            {[
              { id: "general", label: "📢 Bienvenida" },
              { id: "friday-with", label: "💼 Con Ingresos" },
              { id: "friday-no", label: "📭 Sin Novedades" },
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-content-area" style={{ padding: "20px" }}>
          <div className="settings-main-grid">
            <div className="settings-column-form">
              <NewEmployeeSettingsForm
                activeTab={activeTab}
                config={currentConfig}
                onConfigChange={updateConfig}
                onSave={handleUpdateAndRefresh}
                onReset={handleReset}
              />
            </div>
            <div className="preview-wrapper">
              <NewEmployeeMailPreview
                activeTab={activeTab}
                config={currentConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmployeeMailSettings;
