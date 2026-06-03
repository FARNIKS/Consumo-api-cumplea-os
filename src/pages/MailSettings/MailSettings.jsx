import React, { useState, useCallback } from "react";
import Swal from "sweetalert2";
import * as apiService from "../../services/apiService";
import { useMailSettings } from "../../hooks/useMailSettings";
import { useMailPause } from "../../hooks/useMailPause";
import SettingsForm from "../../components/MailSettings/SettingsForm/SettingsForm";
import MailPreview from "../../components/MailSettings/MailPreview/MailPreview";
import ManualSendButton from "../../components/ManualSendButton/ManualSendButton";
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

  const [isProcessingManual, setIsProcessingManual] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser?.role === "admin";

  const { isPaused, handleTogglePause, loadingPause } = useMailPause(isAdmin);

  const protectedSave = () => {
    handleUpdate();
  };

  const handleManualSendWithCheck = useCallback(async () => {
    const result = await Swal.fire({
      title: "¿Confirmar envío masivo?",
      text: "Se procesarán y enviarán los correos de felicitación de cumpleaños a toda la empresa correspondientes al día de hoy. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Sí, enviar comunicados",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setIsProcessingManual(true);

      await apiService.genericService.runManualBirthdaySend();

      Swal.fire({
        icon: "success",
        title: "Envío completado",
        text: "Los comunicados de cumpleaños han sido procesados y enviados con éxito.",
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error durante el envío manual de cumpleaños:", error);
      Swal.fire({
        icon: "error",
        title: "Error de procesamiento",
        text: "No se pudo completar el envío de correos. Inténtalo de nuevo más tarde o revisa los logs del servidor.",
        confirmButtonColor: "#1e3a8a",
      });
    } finally {
      setIsProcessingManual(false);
    }
  }, []);

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

          <div className="header-actions-group">
            {isAdmin && (
              <ManualSendButton
                onClick={handleManualSendWithCheck}
                isProcessing={isProcessingManual}
              />
            )}

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
                  <i className="bi bi-play-circle-fill" title="Reanudar"></i>
                ) : (
                  <i className="bi bi-pause-circle-fill" title="Pausar"></i>
                )}
              </button>
            </div>
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
