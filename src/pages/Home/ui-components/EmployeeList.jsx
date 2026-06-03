import React from "react";
import CustomBootstrapTable from "../../../components/CustomBootstrapTable/CustomBootstrapTable";

const EmployeeList = ({ employees, isLoading }) => {
  const columns = [
    { field: "Nombre", title: "Nombre Completo", sortable: true },
    { field: "Departamento", title: "Departamento", sortable: true },
    { field: "Empresa", title: "Cod. Sede", align: "center" },
    {
      field: "Cumple",
      title: "Cumpleaños",
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
  ];

  return (
    <CustomBootstrapTable
      columns={columns}
      loadingMessage="Consultando empleados..."
      data={employees}
      isLoading={isLoading}
    />
  );
};

export default EmployeeList;
