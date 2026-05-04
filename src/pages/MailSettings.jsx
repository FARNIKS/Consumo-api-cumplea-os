import React from "react";
import { useMailSettings } from "../hooks/useMailSettings";
import SettingsForm from "../components/MailSettings/SettingsForm/SettingsForm";
import MailPreview from "../components/MailSettings/MailPreview/MailPreview";
import Swal from "sweetalert2"; // Importante para el mensaje
import "../styles/MailSettings.css";

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

  // Obtenemos el usuario para validar el rol
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser?.role === "admin";

  // Función de guardado protegida
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

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title">Configuración de Correos</h2>
        <p className="dashboard-subtitle">
          Personaliza los comunicados automáticos de OBGROUP
        </p>
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
                onSave={protectedSave} // Usamos la versión protegida
                onReset={handleReset}
                isAdmin={isAdmin} // Pasamos esto para bloquear los inputs
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
