import React from "react";
import Swal from "sweetalert2";
import { useUsers } from "../../../hooks/useUsers";
import CustomBootstrapTable from "../../../components/CustomBootstrapTable/CustomBootstrapTable";

const UserList = ({ onEdit, refreshTrigger, onRefresh }) => {
  const { fetchUsers, toggleStatus } = useUsers();

  const actionEvents = {
    "click .switch-input": async function (e, value, row) {
      e.preventDefault();

      const isActive = row.is_active == 1 || row.is_active === true;
      const action = isActive ? "desactivar" : "activar";
      const targetCheckbox = e.currentTarget;

      const result = await Swal.fire({
        title: `¿Confirmar acción?`,
        text: `Vas a ${action} al usuario ${row.name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1e3a8a",
        cancelButtonColor: "#ef4444",
        confirmButtonText: `Sí, ${action}`,
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        try {
          await toggleStatus(row.id);

          Swal.fire({
            icon: "success",
            title: "Estado actualizado",
            timer: 1500,
            showConfirmButton: false,
          });

          if (onRefresh) {
            onRefresh();
          }
        } catch (error) {
          targetCheckbox.checked = isActive;

          if (error.response?.status === 403) {
            Swal.fire({
              icon: "error",
              title: "Acción bloqueada",
              text: "No puedes desactivar tu propia cuenta.",
              confirmButtonColor: "#1e3a8a",
            });
          } else {
            Swal.fire("Error", "No se pudo procesar la solicitud.", "error");
          }
        }
      } else {
        targetCheckbox.checked = isActive;
      }
    },
    "click .btn-edit": (e, value, row) => onEdit(row),
  };

  const columns = [
    { field: "name", title: "Nombre Completo", sortable: true },
    { field: "email", title: "Email", sortable: true },
    { field: "role", title: "Rol", align: "center" },
    {
      field: "is_active",
      title: "Estado",
      align: "center",
      events: actionEvents,
      formatter: (value) => {
        const checked = value == 1 || value === true ? "checked" : "";
        return `
          <div class="btn-status-container">
            <label class="switch">
              <input type="checkbox" class="switch-input" ${checked}>
              <span class="slider-round"></span>
            </label>
          </div>`;
      },
    },
    {
      title: "Acciones",
      align: "center",
      events: actionEvents,
      formatter: () =>
        `<button class="btn-edit-custom btn-edit"><i class="bi bi-pencil-fill me-2"></i>Editar</button>`,
    },
  ];

  return (
    <CustomBootstrapTable
      columns={columns}
      loadingMessage="Consultando usuarios..."
      ajaxMethod={fetchUsers}
      actionEvents={actionEvents}
      refreshTrigger={refreshTrigger}
    />
  );
};

export default UserList;
