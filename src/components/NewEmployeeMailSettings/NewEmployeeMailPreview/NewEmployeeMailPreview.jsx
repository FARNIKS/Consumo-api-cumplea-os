import React, { useState, useEffect } from "react";
import "./NewEmployeeMailPreview.css";

const NewEmployeeMailPreview = ({ activeTab, config }) => {
  const currentUrl = config?.banner_url || "";

  const [imageError, setImageError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const isEmpty = !currentUrl || currentUrl.trim() === "";

    setTimeout(() => {
      if (isEmpty) {
        setImageError(true);
        setIsTyping(false);
        return;
      }

      setIsTyping(true);
      setImageError(false);

      const timer = setTimeout(() => {
        const img = new Image();

        const timeoutFallback = setTimeout(() => {
          img.src = "";
          setImageError(true);
          setIsTyping(false);
        }, 3000);

        img.onload = () => {
          clearTimeout(timeoutFallback);
          setImageError(false);
          setIsTyping(false);
        };

        img.onerror = () => {
          clearTimeout(timeoutFallback);
          setImageError(true);
          setIsTyping(false);
        };

        img.src = currentUrl;
      }, 500);

      return () => clearTimeout(timer);
    }, 0);
  }, [currentUrl]);

  if (!config) {
    return (
      <p style={{ padding: "20px", color: "#64748b" }}>
        Cargando previsualización...
      </p>
    );
  }

  return (
    <section className="preview-column">
      <div className="preview-title">Vista Previa del Correo Electrónico</div>

      <div className="mail-body-preview-container">
        <div className="mail-preview-card">
          {activeTab === "general" && (
            <>
              {isTyping ? (
                <div className="mail-preview-banner-placeholder">
                  <span>🔍 Validando URL del banner corporativo...</span>
                </div>
              ) : imageError || !currentUrl ? (
                <div className="mail-preview-banner-placeholder">
                  <span>🖼️ Imagen no disponible o error de carga de red</span>
                </div>
              ) : (
                <img
                  src={currentUrl}
                  alt="Bienvenida OBGROUP"
                  className="mail-preview-banner"
                  onError={() => setImageError(true)}
                />
              )}

              <div className="mail-preview-content">
                <div className="mail-preview-intro">
                  <p className="mail-preview-intro-bold">
                    {config.intro_text || "Texto de introducción de ejemplo..."}
                  </p>
                  <p className="mail-preview-intro-body">
                    {config.main_body ||
                      "Cuerpo principal del mensaje para la organización..."}
                  </p>
                </div>

                <div className="mail-preview-country-section">
                  <div className="mail-preview-company-group">
                    <h3 className="mail-preview-company-header">
                      🌐 COSTA RICA › EL ORBE
                    </h3>
                    <ul className="mail-preview-employee-list">
                      <li className="mail-preview-employee-item">
                        <span className="mail-preview-emp-name">Usuario 1</span>
                        <span className="mail-preview-dept-tag">
                          Se incorpora al departamento de Tecnología
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mail-preview-closing">
                  <p className="mail-preview-closing-text">
                    {config.closing_text ||
                      "Texto de cierre y despedida masiva..."}
                  </p>
                </div>

                <div className="mail-preview-phrase-box">
                  <p className="mail-preview-phrase-text">
                    "Frase célebre de ejemplo"
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === "friday-with" && (
            <>
              <div className="mail-preview-header-gradient">
                <h2>
                  {config.title || "REPORTE DE NUEVOS INGRESOS SEMANALES"}
                </h2>
                <div className="mail-preview-header-date">
                  Reporte Consolidado Semanal •{" "}
                  {new Date().toLocaleDateString("es-ES")}
                </div>
              </div>

              <div className="mail-preview-content">
                <div className="mail-preview-summary-box">
                  <div className="mail-preview-summary-text">
                    {config.intro_text ||
                      "Estimado equipo de RH, a continuación se detallan los ingresos..."}
                  </div>
                </div>

                <div className="mail-preview-company-group">
                  <div className="mail-preview-employee-item">
                    <span className="mail-preview-count-pill">1 INGRESO</span>
                    <span className="mail-preview-emp-name">
                      🌐 COLOMBIA › OBGROUP
                    </span>
                  </div>
                  <div className="mail-preview-employee-item">
                    <span className="mail-preview-dept-tag mail-preview-dept-tag-uppercase">
                      Se incorpora al departamento de Tecnología
                    </span>
                    <span className="mail-preview-emp-name">Usuario 1</span>
                  </div>
                </div>

                <div className="mail-preview-alert-box">
                  <div className="mail-preview-alert-icon">⚠️</div>
                  <div className="mail-preview-alert-text">
                    <strong>Nota de control:</strong>{" "}
                    {config.closing_text ||
                      "Texto aclaratorio de control para RH..."}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "friday-no" && (
            <>
              <div className="mail-preview-header-gradient">
                <h2>
                  {config.title || "REPORTE DE NUEVOS INGRESOS SEMANALES"}
                </h2>
                <div className="mail-preview-header-date">
                  Reporte Consolidado Semanal •{" "}
                  {new Date().toLocaleDateString("es-ES")}
                </div>
              </div>

              <div className="mail-preview-content">
                <div className="mail-preview-status-container">
                  <div className="mail-preview-status-badge">Sin Novedades</div>
                </div>

                <div className="mail-preview-summary-box">
                  <div className="mail-preview-summary-text">
                    {config.intro_text ||
                      "Informativo semanal para Gestión Humana afirmando que no se registran ingresos..."}
                  </div>
                </div>

                <div className="mail-preview-alert-box">
                  <div className="mail-preview-alert-icon">⚠️</div>
                  <div className="mail-preview-alert-text">
                    <strong>Nota de control:</strong>{" "}
                    {config.closing_text ||
                      "Texto aclaratorio de control para RH..."}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="mail-preview-footer">
            {activeTab === "general" ? (
              <p className="mail-preview-footer-text">
                Atentamente,
                <br />
                <strong>{config.sign_off || "Talento Humano"}</strong>
                <br />
                &copy; {new Date().getFullYear()} OBGROUP
              </p>
            ) : (
              <>
                <span className="mail-preview-footer-brand">
                  {config.sign_off || "Gestión Humana"}
                </span>
                <br />
                Este es un reporte automático generado para el departamento de
                Recursos Humanos.
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewEmployeeMailPreview;
