import React, { useState } from "react";
import Swal from "sweetalert2";
import { genericService } from "../../services/apiService";
import "./ManualSendButton.css";

const ManualSendButton = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExecuteCommand = async () => {
    const result = await Swal.fire({
      title: "¿Ejecutar envío masivo?",
      text: "Se procesarán los cumpleaños de hoy y se enviarán los correos a OBGROUP.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e3a8a",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Sí, ejecutar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setIsProcessing(true);
      try {
        const response = await genericService.runManualBirthdaySend();

        Swal.fire({
          icon: response.data.status === "success" ? "success" : "info",
          title: "Resultado",
          text: response.data.message,
          confirmButtonColor: "#1e3a8a",
        });
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Error de servidor",
          text: "No se pudo contactar con el servicio de correos.",
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <button
      className="btn-manual-send"
      onClick={handleExecuteCommand}
      disabled={isProcessing}
    >
      <i
        className={`bi ${isProcessing ? "bi-arrow-repeat spin" : "bi-send-fill"}`}
      ></i>
      <span className="text-send-button">
        {isProcessing ? "Enviando..." : "Enviar ahora"}
      </span>
    </button>
  );
};

export default ManualSendButton;
