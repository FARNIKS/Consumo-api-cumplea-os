import React, { useEffect, useRef } from "react";
import $ from "jquery";
import Swal from "sweetalert2";
import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-table/dist/bootstrap-table.min.js";
import "bootstrap-table/dist/bootstrap-table-locale-all.js";

import { useUsers } from "../../../hooks/useUsers";
import "../../../styles/CustomTable.css";
import "./UserList.css";

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
        e.preventDefault(); // Evita el cambio visual inmediato

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

            if (status === 403) {
              // Esta es la validación importante que viene del servidor
              Swal.fire({
                icon: "error",
                title: "Acción bloqueada",
                text: "No puedes desactivar tu propia cuenta.",
                confirmButtonColor: "#1e3a8a",
              });
            } else {
              Swal.fire("Error", "No se pudo procesar la solicitud.", "error");
            }
          } finally {
            refreshTable();
          }
        } else {
          refreshTable();
        }
      },

      "click .btn-edit": (e, value, row) => {
        onEdit(row);
      },
    };

    $el.bootstrapTable({
      locale: "es-ES",
      search: true,
      pagination: true,
      classes: "table table-striped table-hover",
      showLoading: true,
      formatLoadingMessage: () =>
        '<span class="custom-loading-text">Consultando empleados...</span>',
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
