import React from "react";
import { CircleHelp } from "lucide-react";
import "./HelpPage.css";

const HelpPage = () => {
  const pdfPath = "/Manual_Uso_Portal_Gestion_CorreosCorporativos.pdf";

  return (
    <div className="dashboard-container">
      {/* Cabecera idéntica a tus otras vistas */}
      <div className="dashboard-header">
        <div className="header-content-wrapper">
          <div className="dashboard-header-meta">
            <h2 className="dashboard-title">Ayuda y Soporte</h2>
            <p className="dashboard-subtitle">
              Manual de usuario oficial del sistema
            </p>
          </div>
          <div className="header-actions-group">
            <a
              href={pdfPath}
              download="Manual_Uso_Portal_Gestion_CorreosCorporativos.pdf"
              className="btn-register-custom"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <i className="bi bi-download me-2"></i> Descargar PDF
            </a>
          </div>
        </div>
      </div>

      {/* Contenedor de la tarjeta del Dashboard adaptado para el visor */}
      <div className="dashboard-card pdf-card-container">
        <div className="pdf-viewer-wrapper">
          <object
            data={pdfPath}
            type="application/pdf"
            width="100%"
            height="100%"
            className="pdf-object-fallback"
          >
            <div className="pdf-error-message">
              <CircleHelp size={48} className="mb-3" />
              <h3>¿Tu navegador no puede previsualizar el PDF?</h3>
              <p>
                No te preocupes, puedes descargarlo directamente para verlo en
                tu equipo.
              </p>
              <a href={pdfPath} download className="btn-register-custom mt-2">
                Descargar Manual
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
