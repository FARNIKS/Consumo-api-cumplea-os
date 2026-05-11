import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <p className="text-footer">
        © {new Date().getFullYear()} <strong>OBGROUP SYSTEM</strong> • Gestión
        Corporativa Global
      </p>
    </footer>
  );
};

export default Footer;
