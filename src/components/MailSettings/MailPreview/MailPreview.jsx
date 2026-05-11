import React, { useState, useEffect } from "react";
import "./MailPreview.css";

const MailPreview = ({ activeTab, config }) => {
  const [imageError, setImageError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [prevUrl, setPrevUrl] = useState(config.banner_url);

  if (config.banner_url !== prevUrl) {
    setPrevUrl(config.banner_url);
    const isEmpty = !config.banner_url || config.banner_url.trim() === "";
    setImageError(isEmpty);
    setIsTyping(!isEmpty);
  }

  useEffect(() => {
    if (!config.banner_url || config.banner_url.trim() === "") return;

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

      img.src = config.banner_url;
    }, 500);

    return () => clearTimeout(timer);
  }, [config.banner_url]);

  return (
    <section className="preview-column">
      <div className="preview-label">Vista Previa</div>
      <div className="email-browser-frame">
        <div className="email-content-wrapper">
          {activeTab === "birthday" ? (
            <>
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

              <p className="blade-text-intro">{config.intro_text}</p>

              <div className="country-section">
                <h3 className="company-header">📍 Costa Rica - EL ORBE:</h3>
                <ul className="employee-list">
                  <li className="employee-item">🎂 Usuario de Prueba</li>
                </ul>
              </div>

              <div className="birthday-main-body">
                <p>{config.main_body}</p>
                <p>
                  <strong>{config.closing_text}</strong>
                </p>
              </div>

              <div className="birthday-phrase-box">
                <p>"Frase célebre de ejemplo"</p>
              </div>
            </>
          ) : (
            <>
              <p className="blade-text-intro">{config.intro_text}</p>
              <div className="no-birthday-phrase-box">
                <span className="phrase-title-preview">{config.main_body}</span>
                <p className="phrase-text-preview">
                  "Frase célebre de ejemplo"
                </p>
              </div>
              <p className="closing-text-preview">{config.closing_text}</p>
            </>
          )}

          <div className="footer-preview">
            <p>
              Atentamente,
              <br />
              <strong>{config.sign_off}</strong>
              <br />© {new Date().getFullYear()} OBGROUP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MailPreview;
