import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Settings from "./pages/MailSettings/MailSettings";
import Login from "./pages/Login/Login";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  const [user, setUser] = useState(null);
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
        path="/settings"
        element={
          <Layout user={user}>
            <Settings />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
