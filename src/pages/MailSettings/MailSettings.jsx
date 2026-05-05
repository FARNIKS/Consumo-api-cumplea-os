import React from "react";
import { useMailSettings } from "../../hooks/useMailSettings";
import { useMailPause } from "../../hooks/useMailPause";
import SettingsForm from "../../components/MailSettings/SettingsForm/SettingsForm";
import MailPreview from "../../components/MailSettings/MailPreview/MailPreview";
import Swal from "sweetalert2";
import "./MailSettings.css";

const MailSettings = () => {
  const {
    activeTab,
    setActiveTab,
    loading,
    currentConfig,
    updateConfig,
    handleUpdate,
    handleReset,
  } = useMailSettings();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser?.role === "admin";

  const { isPaused, handleTogglePause, loadingPause } = useMailPause(isAdmin);

  const protectedSave = () => {
    if (!isAdmin) {
      return Swal.fire({
        icon: "error",
        title: "Acceso Denegado",
        text: "Solo los administradores pueden modificar la configuración de correos.",
        confirmButtonColor: "#1e3a8a",
      });
    }
    handleUpdate();
  };

  // Loading sencillo
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando configuración...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content-wrapper">
          <div>
            <h2 className="dashboard-title">Configuración de Correos</h2>
            <p className="dashboard-subtitle">
              Personaliza los comunicados automáticos de OBGROUP
            </p>
          </div>

          <div
            className={`status-control-card ${isPaused ? "is-paused" : "is-active"}`}
          >
            <div className="status-info">
              <span className="status-dot"></span>
              <span className="status-label">
                {isPaused ? "Servicio Pausado" : "Servicio Activo"}
              </span>
            </div>
            <button
              onClick={handleTogglePause}
              disabled={loadingPause}
              className="status-toggle-button"
            >
              {loadingPause ? (
                <div className="btn-spinner-dark"></div>
              ) : isPaused ? (
                "Reanudar"
              ) : (
                "Pausar"
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-card">
        <div className="tabs-container">
          <ul className="nav-tabs-custom">
            <li>
              <button
                className={`tab-button ${activeTab === "birthday" ? "active" : ""}`}
                onClick={() => setActiveTab("birthday")}
              >
                🎂 Cumpleaños
              </button>
            </li>
            <li>
              <button
                className={`tab-button ${activeTab === "no-birthday" ? "active" : ""}`}
                onClick={() => setActiveTab("no-birthday")}
              >
                💡 No cumpleaños
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content-area" style={{ padding: "20px" }}>
          <div className="settings-main-grid">
            <div className="settings-column-form">
              <SettingsForm
                activeTab={activeTab}
                config={currentConfig}
                onConfigChange={updateConfig}
                onSave={protectedSave}
                onReset={handleReset}
                isAdmin={isAdmin}
              />
            </div>

            <div className="preview-wrapper">
              <div className="preview-content-limiter">
                <MailPreview activeTab={activeTab} config={currentConfig} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailSettings;
