import React from "react";
import "./SettingsForm.css";

const SettingsForm = ({
  activeTab,
  config,
  onConfigChange,
  onSave,
  onReset,
  isAdmin, // Nueva prop
}) => {
  const handleChange = (field, value) => {
    // Si no es admin, no permitimos el cambio en el estado local
    if (!isAdmin) return;
    onConfigChange({ ...config, [field]: value });
  };

  return (
    <aside className="form-column">
      <div className="glass-card" key={activeTab}>
        <h3>
          {activeTab === "birthday" ? "Editar Cumpleaños" : "Editar Frase"}
        </h3>

        {activeTab === "birthday" && (
          <div className="input-field">
            <label>URL Banner</label>
            <input
              type="text"
              disabled={!isAdmin}
              value={config.banner_url || ""}
              onChange={(e) => handleChange("banner_url", e.target.value)}
            />
          </div>
        )}

        <div className="input-field">
          <label>Introducción</label>
          <textarea
            rows="3"
            disabled={!isAdmin}
            value={config.intro_text || ""}
            onChange={(e) => handleChange("intro_text", e.target.value)}
          />
        </div>

        <div className="input-field">
          <label>
            {activeTab === "birthday"
              ? "Cuerpo del mensaje"
              : "Título de la frase"}
          </label>
          <input
            type="text"
            disabled={!isAdmin}
            value={config.main_body || ""}
            onChange={(e) => handleChange("main_body", e.target.value)}
          />
        </div>

        <div className="input-field">
          <label>Despedida (Cierre)</label>
          <input
            type="text"
            disabled={!isAdmin}
            value={config.closing_text || ""}
            onChange={(e) => handleChange("closing_text", e.target.value)}
          />
        </div>

        <div className="input-field">
          <label>Firma</label>
          <input
            type="text"
            disabled={!isAdmin}
            value={config.sign_off || ""}
            onChange={(e) => handleChange("sign_off", e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            className="btn-save-config"
            onClick={onSave}
            disabled={!isAdmin}
            style={{ cursor: !isAdmin ? "not-allowed" : "pointer" }}
          >
            Guardar Cambios
          </button>
          <button
            className="btn-reset-config"
            onClick={onReset}
            disabled={!isAdmin}
            style={{ cursor: !isAdmin ? "not-allowed" : "pointer" }}
          >
            Restaurar Defecto
          </button>
        </div>

        {!isAdmin && (
          <p
            style={{
              color: "#ff4d4f",
              fontSize: "12px",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            * Solo lectura: No tienes permisos para editar.
          </p>
        )}
      </div>
    </aside>
  );
};

export default SettingsForm;
