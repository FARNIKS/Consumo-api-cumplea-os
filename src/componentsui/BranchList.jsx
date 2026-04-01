import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-table/dist/bootstrap-table.min.js";
import { genericService } from "../services/apiService";
import Loading from "../components/Loading";
import "../styles/CustomTable.css";

const BranchList = () => {
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
        { field: "code", title: "Código", align: "center", sortable: true },
        { field: "companyName", title: "Empresa", sortable: true },
        { field: "countryName", title: "País", sortable: true },
      ],
      ajax: async (params) => {
        try {
          const res = await genericService.getBranches();
          params.success(res.data.data || res.data);
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
      {loading && <Loading message="Cargando sucursales..." />}
      <table ref={tableRef}></table>
    </div>
  );
};

export default BranchList;
