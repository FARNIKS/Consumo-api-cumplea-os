import React from "react";

const Loading = ({ message = "Cargando datos..." }) => (
  <div className="">
    <div className="">
      <div className=""></div>
      <div className="">{message}</div>
      <div className="">Sincronizando con EL ORBE Global</div>
    </div>
  </div>
);

// ESTA LÍNEA ES LA QUE FALTA Y CAUSA EL ERROR:
export default Loading;
