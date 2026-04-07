import React from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    navigate("/login");
    try {
      await apiClient.post("/logout");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="layout-wrapper">
      <nav className="navbar-custom">
        <div className="navbar-container">
          <span className="navbar-brand">
            <i className="bi bi-globe-americas me-2"></i>
            <span className="brand-text">EL ORBE</span>
          </span>

          <div className="navbar-actions">
            {/* type="button" evita comportamientos extraños de formularios */}
            <button type="button" onClick={handleLogout} className="btn-logout">
              <i className="bi bi-box-arrow-right me-2"></i>
              Salir
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">{children}</main>

      <footer className="footer-custom">
        <div className="footer-container">
          <p className="footer-text">
            © 2026 <strong>OBGROUP SYSTEM</strong> • Gestión Corporativa Global
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
