import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";

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
    <div className="">
      <nav className="">
        <div className="">
          <span className="">
            {/* Icono Mundo Latinoamérica */}
            <i className="bi bi-globe-americas me-2"></i>
            <span>EL ORBE</span>
          </span>

          <div className="">
            <button onClick={handleLogout} className="">
              <i className=""></i>Salir
            </button>
          </div>
        </div>
      </nav>

      <main className="">{children}</main>

      <footer className="">
        <div className="">
          <p className="">
            © 2026 <strong>OBGROUP SYSTEM</strong> • Gestión Corporativa Global
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
