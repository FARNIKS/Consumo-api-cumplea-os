import React, { useState } from "react";
import Swal from "sweetalert2";
import { useUsers } from "../../hooks/useUsers";
import "./UserFormModal.css";

const UserFormModal = ({ user, onClose, onRefresh }) => {
  const { createUser, updateUser } = useUsers();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    alias: user?.alias || "",
    email: user?.email || "",
    role: user?.role || "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        await updateUser(user.id, formData);
      } else {
        await createUser(formData);
      }

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: `Usuario ${user ? "actualizado" : "registrado"} correctamente`,
        timer: 1500,
        showConfirmButton: false,
      });

      onRefresh();
      onClose();
    } catch (error) {
      const status = error.response?.status;
      let errorTitle = "Error";
      let serverMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Error al procesar los datos";

      if (status === 403) {
        errorTitle = "Acceso Denegado";
        serverMsg =
          "No tienes permisos de administrador para realizar esta acción.";
      } else if (status === 422) {
        errorTitle = "Datos Inválidos";
        const errors = error.response?.data?.errors;
        serverMsg = errors
          ? Object.values(errors).flat().join("\n")
          : "Revisa los campos.";
      }

      Swal.fire(errorTitle, serverMsg, "error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-custom animate__animated animate__fadeInDown">
        <h3 className="modal-title">
          {user ? "Editar Perfil" : "Nuevo Usuario"}
        </h3>

        <form onSubmit={handleSubmit} className="form-container-grid">
          <div className="form-group full-width">
            <label>Nombre Completo</label>
            <input
              className="form-input"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                className="form-input"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Alias / Usuario</label>
              <input
                className="form-input"
                type="text"
                required
                value={formData.alias}
                onChange={(e) =>
                  setFormData({ ...formData, alias: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Rol</label>
            <select
              className="form-input"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {user ? "Actualizar" : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
