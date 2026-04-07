import React, { useState } from "react";
import apiClient from "../api/client";
import "../styles/Login.css"; // Importación del CSS

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/login", credentials);
      onLoginSuccess(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <i className="bi bi-globe-americas"> EL ORBE</i>
          </div>
          <h2 className="login-title">Bienvenido</h2>
          <p className="login-subtitle">Ingresa al sistema de gestión</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="nombre@empresa.com"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="login-error" role="alert">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              ></span>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>© 2026 EL ORBE Global Solutions</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
