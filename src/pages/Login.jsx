import React, { useState } from "react";
import apiClient from "../api/client";

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
      // Petición a tu controlador AuthController@login
      const response = await apiClient.post("/login", credentials);

      // La API devuelve: { access_token, token_type, user }
      onLoginSuccess(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div
        className=""
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <div className="">
          <h2 className="">Bienvenido</h2>
          <p className="">Ingresa al sistema de gestión</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className=""
              placeholder="nombre@empresa.com"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="">
            <label className="">Contraseña</label>
            <input
              type="password"
              name="password"
              className=""
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="" disabled={loading}>
            {loading ? (
              <span className="" role="status"></span>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
