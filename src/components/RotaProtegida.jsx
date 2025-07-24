import { Navigate, Outlet } from "react-router-dom";

export default function RotaProtegida() {
  const usuarioLogado = localStorage.getItem("usuario");

  const estaAutenticado = usuarioLogado !== null && usuarioLogado !== "";

  if (!estaAutenticado) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
