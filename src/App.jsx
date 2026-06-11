import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./styles/dashboard-global.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import NewEmployeesPage from "./pages/NewEmployees/NewEmployeesPage";
import Settings from "./pages/MailSettings/MailSettings";
import NewEmployeeMailSettings from "./pages/NewEmployeeMailSettings/NewEmployeeMailSettings";
import Login from "./pages/Login/Login";
import UserPage from "./pages/UserPage/UserPage";
import HelpPage from "./pages/HelpPage/HelpPage";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLoginSuccess={handleLoginSuccess} />}
      />

      <Route
        path="/"
        element={
          <Layout user={user}>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/users"
        element={
          <Layout user={user}>
            <UserPage />
          </Layout>
        }
      />

      <Route
        path="/new-employees"
        element={
          <Layout user={user}>
            <NewEmployeesPage />
          </Layout>
        }
      />

      <Route
        path="/settings"
        element={
          <Layout user={user}>
            <Settings />
          </Layout>
        }
      />

      <Route
        path="/settings/new-employees"
        element={
          <Layout user={user}>
            <NewEmployeeMailSettings />
          </Layout>
        }
      />

      <Route
        path="/ayuda"
        element={
          <Layout user={user}>
            <HelpPage />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
