import React from "react";
import CustomBootstrapTable from "../../../components/CustomBootstrapTable/CustomBootstrapTable";

const BranchList = ({ branches, isLoading }) => {
  const columns = [
    { field: "code", title: "Código", align: "center", sortable: true },
    {
      field: "company_name",
      title: "Empresa",
      align: "center",
      sortable: true,
    },
    { field: "country_name", title: "País", align: "center", sortable: true },
  ];

  return (
    <CustomBootstrapTable
      columns={columns}
      loadingMessage="Consultando sedes..."
      data={branches}
      isLoading={isLoading}
    />
  );
};

export default BranchList;
