import React from "react";
import { Link } from "react-router-dom";
import { House, Mail, LogOut, Menu, ChevronLeft, Users } from "lucide-react"; // 1. Importamos Users
import { useAuthUser } from "../../../hooks/useAuthUser.js";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed, onLogout }) => {
  const user = useAuthUser();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <span className="brand">
            <i className="bi bi-globe-americas"> EL ORBE</i>
          </span>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="toggle-btn">
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">
          <House size={22} />
          {!collapsed && <span>Inicio</span>}
        </Link>

        <Link to="/settings" className="nav-item">
          <Mail size={22} />
          {!collapsed && <span>Configurar Correos</span>}
        </Link>
      </nav>

      <div className="sidebar-user">
        <div className="user-badge">
          <div className="avatar">{user.initials}</div>
          {!collapsed && (
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className={`user-role role-${user?.role || "user"}`}>
                {(user?.role || "user").toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="btn-logout-sidebar">
          <LogOut size={22} />
          {!collapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
