import React, { useState } from "react";
import apiClient from "../api/client";
import "../styles/Login.css";

const Login = ({ onLoginSuccess }) => {
  // Cambiamos 'email' por 'alias' para que coincida con el backend
  const [credentials, setCredentials] = useState({ alias: "", password: "" });
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
      // Enviamos el objeto con { alias, password }
      const response = await apiClient.post("/login", credentials);

      // Guardamos el token (según la lógica de tu interceptor)
      localStorage.setItem("access_token", response.data.access_token);

      onLoginSuccess(response.data);
    } catch (err) {
      console.error(err);
      // El backend devuelve el error en la propiedad 'error' según tu catch en PHP
      setError(err.response?.data?.error || "Error al iniciar sesión");
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
          <p className="login-subtitle">Ingresa con tu usuario corporativo</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Alias / Usuario</label>
            <input
              type="text"
              name="alias" // Debe ser 'alias'
              className="form-input"
              placeholder="Ej: mjimenez"
              value={credentials.alias}
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
