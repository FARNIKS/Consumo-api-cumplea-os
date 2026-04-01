import React, { useState } from "react";
import EmployeeList from "../componentsui/EmployeeList";
import BranchList from "../componentsui/BranchList";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <>
      {/* Contenedor con ancho limitado para que no se estire de más */}
      <div className="">
        {/* Cabecera del Panel */}
        <div className="">
          <div>
            <h2 className="" style={{ letterSpacing: "-1px" }}>
              Panel Administrativo
            </h2>
            <p className="">Control de cumpleaños</p>
          </div>
        </div>

        {/* Tarjeta Principal (Glass Card) */}
        <div className="">
          {/* BARRA DE PESTAÑAS DINÁMICA: Cambia de color según el modo */}
          <div className="">
            <ul className="">
              {["employees", "branches"].map((tab) => (
                <li className="" key={tab}>
                  <button
                    className=""
                    onClick={() => setActiveTab(tab)}
                    style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
                  >
                    {tab === "employees" && (
                      <>
                        <i className="bi bi-people me-2"></i>Empleados
                      </>
                    )}
                    {tab === "branches" && (
                      <>
                        <i className="bi bi-geo-alt me-2"></i>Sucursales
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Área de Contenido de la Tabla */}
          <div className="">
            <div className="">
              {activeTab === "employees" && <EmployeeList key="tab-emp" />}
              {activeTab === "branches" && <BranchList key="tab-bra" />}
            </div>
          </div>
        </div>

        {/* Espaciador inferior para que el footer no quede pegado */}
        <div className=""></div>
      </div>
    </>
  );
};

export default Dashboard;
