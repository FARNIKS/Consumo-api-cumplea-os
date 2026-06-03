import React from "react";
import CustomBootstrapTable from "../../../components/CustomBootstrapTable/CustomBootstrapTable";

const COLUMNS_CONFIG = [
  { field: "nombre", title: "Nombre", sortable: true },
  { field: "cedula", title: "Cedula", sortable: true, align: "center" },
  { field: "departamento", title: "Depto", sortable: true, align: "center" },
  {
    field: "empresa.codigo",
    title: "Empresa",
    sortable: true,
    align: "center",
  },
  {
    field: "fecha_ingreso",
    title: "fecha de ingreso",
    sortable: true,
    align: "center",
  },
  {
    field: "fecha_envio",
    title: "Fecha Envío",
    sortable: true,
    align: "center",
  },
];

const HistoryList = ({ history, isLoading }) => {
  return (
    <CustomBootstrapTable
      columns={COLUMNS_CONFIG}
      data={history}
      loadingMessage="Consultando historial..."
      isLoading={isLoading}
    />
  );
};

export default HistoryList;
