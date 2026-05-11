import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-table/dist/bootstrap-table.min.js";
import { genericService } from "../../../services/apiService";
import "../../../styles/CustomTable.css";

const BranchList = () => {
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
        '<span class="custom-loading-text">Consultando sedes...</span>',
      columns: [
        { field: "code", title: "Código", align: "center", sortable: true },
        { field: "company_name", title: "Empresa", sortable: true },
        { field: "country_name", title: "País", sortable: true },
      ],
      ajax: async (params) => {
        try {
          const res = await genericService.getBranches();
          params.success(res.data.data || res.data);
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

export default BranchList;
