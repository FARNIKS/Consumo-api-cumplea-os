import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-table/dist/bootstrap-table.min.js";
import { genericService } from "../services/apiService";
import Loading from "../components/Loading"; // Asegúrate de que el nombre del archivo coincida
import "../styles/CustomTable.css";

const EmployeeList = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const $el = $(tableRef.current);

    $el.bootstrapTable({
      search: true,
      pagination: true,
      pageSize: 10,
      classes: "table table-striped table-hover",
      columns: [
        { field: "name", title: "Nombre Completo", sortable: true },
        { field: "company", title: "Empresa", sortable: true },
        { field: "country", title: "País", sortable: true },
        { field: "branch_code", title: "Sucursal", align: "center" },
        {
          field: "birthday",
          title: "Cumple",
          align: "center",
          formatter: (v) =>
            v
              ? new Date(v).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })
              : "-",
        },
      ],
      ajax: async (params) => {
        try {
          const res = await genericService.getEmployees();
          params.success(res.data.data || []);
          setLoading(false);
        } catch (e) {
          params.error(e);
          setLoading(false);
        }
      },
    });

    return () => {
      if ($el && $el.data("bootstrap.table")) {
        $el.bootstrapTable("destroy");
      }
    };
  }, []);

  return (
    <div className="table-container-custom">
      {loading && <Loading message="Sincronizando empleados..." />}

      {/* El div rodea la tabla para controlar el scroll en móviles */}
      <div className="">
        <table ref={tableRef}></table>
      </div>
    </div>
  );
};

export default EmployeeList;
