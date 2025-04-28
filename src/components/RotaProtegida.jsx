// RotaProtegida.jsx
import { Navigate, Outlet } from "react-router-dom";

export function RotaProtegida() {
  const usuarioLogado = localStorage.getItem("usuario"); // ou sessionStorage, token, etc.

  if (!usuarioLogado) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // renderiza as rotas "filhas"
}
