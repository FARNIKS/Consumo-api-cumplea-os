import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-table/dist/bootstrap-table.min.js";
import "bootstrap-table/dist/bootstrap-table-locale-all.js";
import { genericService } from "../../../services/apiService";
import "../../../styles/CustomTable.css";

// ... (imports iguales)
const EmployeeList = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    const $el = $(tableRef.current);
    $el.bootstrapTable({
      locale: "es-ES",
      search: true,
      pagination: true,
      classes: "table table-striped table-hover",
      showLoading: true,
      formatLoadingMessage: () =>
        '<span class="custom-loading-text">Consultando empleados...</span>',
      columns: [
        { field: "Nombre", title: "Nombre Completo", sortable: true },
        { field: "company", title: "Empresa", sortable: true },
        { field: "country", title: "País", sortable: true },
        { field: "Empresa", title: "Cod. Sede", align: "center" },
        {
          field: "Cumple",
          title: "Cumpleaños",
          align: "center",
          formatter: (v) => {
            if (!v) return "-";
            return new Date(v).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            });
          },
        },
      ],
      ajax: async (params) => {
        try {
          const res = await genericService.getEmployees();
          params.success(res.data.data || []);
        } catch (e) {
          params.error(e);
        }
      },
    });

    return () => {
      if ($el.data("bootstrap.table")) $el.bootstrapTable("destroy");
    };
  }, []);

  return (
    <div className="table-container-custom">
      <table ref={tableRef}></table>
    </div>
  );
};

export default EmployeeList;
