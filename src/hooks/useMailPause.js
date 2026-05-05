import { useState, useEffect } from "react";
import { genericService } from "../services/apiService";
import Swal from "sweetalert2";

export const useMailPause = (isAdmin) => {
  const [isPaused, setIsPaused] = useState(false);
  const [loadingPause, setLoadingPause] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await genericService.getMailStatus();
        setIsPaused(response.data.is_paused);
      } catch (error) {
        console.error("Error al obtener estado de pausa:", error);
      }
    };
    fetchStatus();
  }, []);

  const handleTogglePause = async () => {
    if (!isAdmin) {
      return Swal.fire({
        icon: "error",
        title: "Acceso Denegado",
        text: "Solo los administradores pueden pausar o reanudar el servicio.",
        confirmButtonColor: "#1e3a8a",
      });
    }

    const action = isPaused ? "REANUDAR" : "PAUSAR";

    const result = await Swal.fire({
      title: `¿Confirmar ${action}?`,
      text: `El envío de correos programado a las 07:00 AM se verá afectado.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isPaused ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setLoadingPause(true);
      try {
        const response = await genericService.toggleMailPause();
        setIsPaused(response.data.is_paused);

        Swal.fire({
          icon: "success",
          title: response.data.is_paused
            ? "Servicio Pausado"
            : "Servicio Activo",
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error al cambiar estado de pausa:", error);
        Swal.fire(
          "Error",
          "No se pudo cambiar el estado del servicio",
          "error",
        );
      } finally {
        setLoadingPause(false);
      }
    }
  };

  return { isPaused, handleTogglePause, loadingPause };
};
