import { Navigate, Outlet } from "react-router-dom";

export function RotaProtegida() {
  const usuarioLogado = localStorage.getItem("usuario");

  // Verifica se realmente tem informação
  const estaAutenticado = usuarioLogado !== null && usuarioLogado !== "";

  if (!estaAutenticado) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
