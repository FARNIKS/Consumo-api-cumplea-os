import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  House,
  Mail,
  LogOut,
  Menu,
  ChevronLeft,
  Users,
  UserCheck,
  BriefcaseBusiness,
} from "lucide-react";
import { useAuthUser } from "../../../hooks/useAuthUser.js";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed, onLogout }) => {
  const user = useAuthUser();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <span className="brand">
            <i className="bi bi-globe-americas"> OBGROUP</i>
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

        {isAdmin && (
          <>
            <Link to="/new-employees" className="nav-item">
              <UserCheck size={22} />
              {!collapsed && <span>Nuevos Ingresos</span>}
            </Link>

            <Link to="/settings" className="nav-item">
              <Mail size={22} />
              {!collapsed && <span>Correos Cumpleaños</span>}
            </Link>

            <Link to="/settings/new-employees" className="nav-item">
              <BriefcaseBusiness size={22} />
              {!collapsed && <span>Correos de Ingreso</span>}
            </Link>

            <Link to="/users" className="nav-item">
              <Users size={22} />
              {!collapsed && <span>Usuarios Sistema</span>}
            </Link>
          </>
        )}
      </nav>

      <div className="sidebar-user">
        <div className="user-badge">
          <div className="avatar">{user?.initials || "U"}</div>
          {!collapsed && (
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
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
