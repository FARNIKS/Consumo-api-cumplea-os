import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "bootstrap-table/dist/bootstrap-table.min.css";
import "bootstrap-table/dist/bootstrap-table.min.js";
import "bootstrap-table/dist/bootstrap-table-locale-all.js";
import "./CustomBootstrapTable.css";

const CustomBootstrapTable = ({
  columns,
  loadingMessage = "Cargando datos...",
  data = null,
  ajaxMethod = null,
  actionEvents = null,
  refreshTrigger = null,
  isLoading = false,
}) => {
  const tableRef = useRef(null);

  useEffect(() => {
    const $el = $(tableRef.current);

    const mappedColumns = columns.map((col) => {
      if (col.title === "Acciones" && actionEvents) {
        return { ...col, events: actionEvents };
      }
      return col;
    });

    const tableOptions = {
      locale: "es-ES",
      search: true,
      pagination: true,
      classes: "table table-striped table-hover",
      showLoading: true,
      formatLoadingMessage: () =>
        `<span class="custom-loading-text">${loadingMessage}</span>`,
      columns: mappedColumns,
    };

    if (ajaxMethod) {
      tableOptions.ajax = async (params) => {
        try {
          const res = await ajaxMethod();
          const finalData = res?.data?.data || res?.data || res || [];
          params.success(finalData);
        } catch (e) {
          params.error(e);
        }
      };
    } else if (data) {
      tableOptions.data = data;
    }

    $el.bootstrapTable(tableOptions);

    if (isLoading || ajaxMethod) {
      $el.bootstrapTable("showLoading");
    }

    return () => {
      if ($el.data("bootstrap.table")) {
        $el.bootstrapTable("destroy");
      }
    };
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      const $el = $(tableRef.current);
      if ($el.data("bootstrap.table")) {
        if (isLoading) {
          $el.bootstrapTable("showLoading");
        } else {
          $el.bootstrapTable("hideLoading");
        }
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (tableRef.current) {
      const $el = $(tableRef.current);
      if ($el.data("bootstrap.table")) {
        $el.bootstrapTable("load", data || []);

        if (data && !isLoading) {
          $el.bootstrapTable("hideLoading");
        }
      }
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (
      refreshTrigger !== null &&
      refreshTrigger !== undefined &&
      tableRef.current
    ) {
      const $el = $(tableRef.current);
      if ($el.data("bootstrap.table")) {
        $el.bootstrapTable("refresh");
      }
    }
  }, [refreshTrigger]);

  return (
    <div className="table-container-custom">
      <table ref={tableRef}></table>
    </div>
  );
};

export default CustomBootstrapTable;
