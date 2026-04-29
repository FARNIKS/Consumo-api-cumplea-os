import { useState, useEffect } from "react";
import apiClient from "../api/client";

// Función para obtener Nombre y Apellido (ej: Miguel Jimenez)
function getShortName(fullName) {
  if (!fullName || fullName === "Cargando...") return fullName;
  const parts = fullName.split(" ").filter(Boolean);
  if (parts.length >= 3) return `${parts[0]} ${parts[2]}`;
  if (parts.length === 2) return `${parts[0]} ${parts[1]}`;
  return parts[0];
}

// Función para obtener iniciales del nombre corto (ej: Miguel Jimenez -> MJ)
function getShortInitials(shortName) {
  if (!shortName || shortName === "Cargando...") return "??";
  return shortName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export const useAuthUser = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const userData = parsed.data || parsed;
        const shortName = getShortName(userData.name);
        return {
          name: shortName,
          role: userData.role || "user",
          username: userData.username,
          initials: getShortInitials(shortName), // MJ
        };
      } catch (e) {
        console.error(e);
      }
    }
    return { name: "Cargando...", role: "user", initials: "??" };
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user.name !== "Cargando...") return;
      try {
        const response = await apiClient.get("/user");
        const rawData = response.data.data || response.data;

        const shortName = getShortName(rawData.name);
        const cleanUser = {
          name: shortName,
          role: rawData.role || "user",
          username: rawData.username,
        };

        localStorage.setItem("user", JSON.stringify(cleanUser));
        setUser({ ...cleanUser, initials: getShortInitials(shortName) });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, [user.name]);

  return user;
};
