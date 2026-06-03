import React, { useState, useEffect } from "react";
import { genericService } from "../../services/apiService";
import EmployeeList from "./ui-components/EmployeeList";
import BranchList from "./ui-components/BranchList";
import "./Home.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");

  const [employees, setEmployees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const [resEmployees, resBranches] = await Promise.all([
          genericService.getEmployees(),
          genericService.getBranches(),
        ]);

        const dataEmp =
          resEmployees?.data?.data || resEmployees?.data || resEmployees || [];
        const dataBra =
          resBranches?.data?.data || resBranches?.data || resBranches || [];

        setEmployees(dataEmp);
        setBranches(dataBra);
      } catch (error) {
        console.error(
          "Error al cargar los datos del panel administrativo:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* --- ENCABEZADO --- */}
      <div className="dashboard-header">
        <div className="header-content-wrapper">
          <div className="dashboard-header-meta">
            <h2 className="dashboard-title">Panel Administrativo</h2>
            <p className="dashboard-subtitle">
              Control de cumpleaños corporativo
            </p>
          </div>
          <div className="header-actions-group"></div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="nav-tabs-custom">
          <button
            className={`tab-button ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            <i className="bi bi-people me-2"></i>Empleados
          </button>
          <button
            className={`tab-button ${activeTab === "branches" ? "active" : ""}`}
            onClick={() => setActiveTab("branches")}
          >
            <i className="bi bi-geo-alt me-2"></i>Sucursales
          </button>
        </div>

        <div className="tab-content-area">
          <div
            style={{ display: activeTab === "employees" ? "block" : "none" }}
          >
            <EmployeeList employees={employees} isLoading={loading} />
          </div>
          <div style={{ display: activeTab === "branches" ? "block" : "none" }}>
            <BranchList branches={branches} isLoading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
