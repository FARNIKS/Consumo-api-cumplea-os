import React, { useState, useEffect } from "react";
import "./MailPreview.css";

const MailPreview = ({ activeTab, config }) => {
  const [imageError, setImageError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [prevUrl, setPrevUrl] = useState(config.banner_url);

  // Sincronización de estado durante el renderizado para evitar errores de performance
  if (config.banner_url !== prevUrl) {
    setPrevUrl(config.banner_url);
    const isEmpty = !config.banner_url || config.banner_url.trim() === "";
    setImageError(isEmpty);
    setIsTyping(!isEmpty);
  }

  useEffect(() => {
    if (!config.banner_url || config.banner_url.trim() === "") return;

    // Debounce para evitar peticiones excesivas mientras el usuario escribe
    const timer = setTimeout(() => {
      const img = new Image();

      // Timeout de 3 segundos para abortar si el servidor no responde
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

      img.src = config.banner_url;
    }, 500);

    return () => clearTimeout(timer);
  }, [config.banner_url]);

  return (
    <section className="preview-column">
      <div className="preview-label">Vista Previa (Diseño Blade)</div>
      <div className="email-browser-frame">
        <div className="email-content-wrapper">
          {activeTab === "birthday" ? (
            <>
              {/* Manejo de estados de la imagen (Validando / Error / Renderizado) */}
              {isTyping ? (
                <div className="blade-img-placeholder">
                  <span>🔍 Validando URL...</span>
                </div>
              ) : imageError || !config.banner_url ? (
                <div className="blade-img-placeholder">
                  <span>🖼️ Imagen no disponible o error de red</span>
                </div>
              ) : (
                <img
                  src={config.banner_url}
                  alt="Banner"
                  className="blade-img-banner"
                  onError={() => setImageError(true)}
                />
              )}

              <p
                className="blade-text-intro"
                style={{ whiteSpace: "pre-line" }}
              >
                {config.intro_text}
              </p>

              <div className="country-section">
                <h3 className="company-header">📍 Costa Rica - EL ORBE:</h3>
                <ul className="employee-list">
                  <li className="employee-item">🎂 Usuario de Prueba</li>
                </ul>
              </div>

              <div style={{ marginTop: "25px" }}>
                <p style={{ whiteSpace: "pre-line" }}>{config.main_body}</p>
                <p>
                  <strong>{config.closing_text}</strong>
                </p>
              </div>

              <div className="birthday-phrase-box">
                <p style={{ margin: 0, color: "#856404" }}>
                  "Frase célebre de ejemplo"
                </p>
              </div>
            </>
          ) : (
            <>
              <p
                className="blade-text-intro"
                style={{ whiteSpace: "pre-line" }}
              >
                {config.intro_text}
              </p>
              <div className="no-birthday-phrase-box">
                <span className="phrase-title-preview">{config.main_body}</span>
                <p className="phrase-text-preview">
                  "La persistencia es el camino al éxito."
                </p>
              </div>
              <p style={{ whiteSpace: "pre-line" }}>{config.closing_text}</p>
            </>
          )}

          <div className="footer-preview">
            <p>
              Atentamente,
              <br />
              <strong>{config.sign_off}</strong>
              <br />
              &copy; {new Date().getFullYear()} OBGROUP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MailPreview;
