import React, { useState } from "react";
import EmployeeList from "../componentsui/EmployeeList";
import BranchList from "../componentsui/BranchList";
import "../styles/Dashboard.css"; // Importación del CSS

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div className="dashboard-container">
      {/* Cabecera del Panel */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">Panel Administrativo</h2>
        <p className="dashboard-subtitle">Control de cumpleaños corporativo</p>
      </div>

      {/* Tarjeta Principal (Glass Card) */}
      <div className="dashboard-card">
        {/* BARRA DE PESTAÑAS */}
        <div className="tabs-container">
          <ul className="nav-tabs-custom">
            <li className="nav-item-custom">
              <button
                className={`tab-button ${activeTab === "employees" ? "active" : ""}`}
                onClick={() => setActiveTab("employees")}
              >
                <i className="bi bi-people me-2"></i>Empleados
              </button>
            </li>
            <li className="nav-item-custom">
              <button
                className={`tab-button ${activeTab === "branches" ? "active" : ""}`}
                onClick={() => setActiveTab("branches")}
              >
                <i className="bi bi-geo-alt me-2"></i>Sucursales
              </button>
            </li>
          </ul>
        </div>

        {/* Área de Contenido de la Tabla */}
        <div className="tab-content-area">
          {activeTab === "employees" && <EmployeeList key="tab-emp" />}
          {activeTab === "branches" && <BranchList key="tab-bra" />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
