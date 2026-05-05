import React, { useEffect, useRef } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-table/dist/bootstrap-table.min.js";
import { useUsers } from "../../../hooks/useUsers";
import "../../../styles/CustomTable.css";

const UserList = ({ onEdit, refreshTrigger }) => {
  const tableRef = useRef(null);
  const { fetchUsers, toggleStatus } = useUsers();

  const refreshTable = () => {
    if (tableRef.current) $(tableRef.current).bootstrapTable("refresh");
  };

  useEffect(() => {
    refreshTable();
  }, [refreshTrigger]);

  useEffect(() => {
    const $el = $(tableRef.current);

    window.actionEvents = {
      "click .switch-input": async function (e, value, row) {
        // Detenemos el cambio visual del checkbox inmediatamente
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem("user"));
        const currentUserId = storedUser?.id;
        const currentUserRole = storedUser?.role;

        // 1. VALIDACIÓN: Solo administradores pueden usar el toggle
        if (currentUserRole !== "admin") {
          Swal.fire({
            icon: "error",
            title: "Acceso Denegado",
            text: "No tienes permisos de administrador para cambiar el estado.",
            confirmButtonColor: "#1e3a8a",
          });
          refreshTable(); // Forzar render para resetear el switch visual
          return;
        }

        // 2. VALIDACIÓN: No desactivarse a sí mismo
        if (row.id == currentUserId) {
          Swal.fire({
            icon: "error",
            title: "Operación no permitida",
            text: "No puedes desactivar tu propia cuenta mientras estás en sesión.",
            confirmButtonColor: "#1e3a8a",
          });
          refreshTable();
          return;
        }

        const action = row.is_active == 1 ? "desactivar" : "activar";

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
          } catch (error) {
            const status = error.response?.status;
            let errorTitle = "Error";
            let serverMsg = error.response?.data?.message || "Error de red.";

            if (status === 403) {
              errorTitle = "Acceso Denegado";
              serverMsg = "No tienes permisos de administrador en el servidor.";
            }

            Swal.fire(errorTitle, serverMsg, "error");
          } finally {
            refreshTable();
          }
        } else {
          refreshTable(); // Resetear visualmente si cancela
        }
      },

      "click .btn-edit": (e, value, row) => {
        onEdit(row); // La validación de rol ya la hace UserPage en handleOpenModal
      },
    };

    $el.bootstrapTable({
      search: true,
      pagination: true,
      classes: "table table-striped table-hover",
      columns: [
        { field: "name", title: "Nombre Completo", sortable: true },
        { field: "email", title: "Email", sortable: true },
        { field: "role", title: "Rol", align: "center" },
        {
          field: "is_active",
          title: "Estado",
          align: "center",
          events: window.actionEvents,
          formatter: (value) => `
            <div class="btn-status-container">
              <label class="switch">
                <input type="checkbox" class="switch-input" ${value == 1 ? "checked" : ""}>
                <span class="slider-round"></span>
              </label>
            </div>`,
        },
        {
          title: "Gestión",
          align: "center",
          events: window.actionEvents,
          formatter: () => `
            <button class="btn-edit-custom btn-edit">
              <i class="bi bi-pencil-fill me-2"></i>Editar
            </button>`,
        },
      ],
      ajax: async (params) => {
        try {
          const data = await fetchUsers();
          params.success(data);
        } catch (e) {
          params.error(e);
        }
      },
    });

    return () => {
      if ($el.data("bootstrap.table")) $el.bootstrapTable("destroy");
      delete window.actionEvents;
    };
  }, []);

  return (
    <div className="table-container-custom">
      <table ref={tableRef}></table>
    </div>
  );
};

export default UserList;
