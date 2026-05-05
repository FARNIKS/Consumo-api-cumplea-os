import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/client";
import Sidebar from "./Sliderbar/Sidebar";
import Footer from "./Footer/Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("access_token");
      navigate("/login");
      await apiClient.post("/logout");
    } catch (e) {
      console.error("Error during logout:", e);
    }
  };

  return (
    <div className="admin-wrapper">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={handleLogout}
      />

      <div className="main-area">
        <main className="content-container">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
