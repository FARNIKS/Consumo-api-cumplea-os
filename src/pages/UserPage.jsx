import React, { useState } from "react";
import UserList from "../componentsui/UserList";
import Swal from "sweetalert2";
import UserFormModal from "../components/UserFormModal/UserFormModal";
import "../styles/UserPage.css";

const UserPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Obtenemos el usuario de la sesión
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleOpenModal = (user = null) => {
    // Si no es admin, no permitimos abrir el modal de creación/edición
    if (currentUser?.role !== "admin") {
      return Swal.fire({
        icon: "error",
        title: "Acceso Denegado",
        text: "Solo los administradores pueden gestionar usuarios.",
        confirmButtonColor: "#1e3a8a",
      });
    }
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="dashboard-container">
      <div
        className="dashboard-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2 className="dashboard-title">Gestión de Usuarios</h2>
          <p className="dashboard-subtitle">
            Administración de accesos y roles
          </p>
        </div>

        <button
          className="btn-edit-custom"
          style={{
            background: "#1e3a8a",
            color: "white",
            padding: "10px 20px",
            borderRadius: "50px",
          }}
          onClick={() => handleOpenModal()}
        >
          <i className="bi bi-person-plus me-2"></i> Nuevo Usuario
        </button>
      </div>

      <div className="dashboard-card">
        <div className="tab-content-area">
          <UserList onEdit={handleOpenModal} refreshTrigger={refreshKey} />
        </div>
      </div>

      {showModal && (
        <UserFormModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
};

export default UserPage;
