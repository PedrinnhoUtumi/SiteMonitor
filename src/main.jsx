import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Login.jsx'
import { TempoReal } from './pages/TempoReal.jsx'
import { Relatorios } from './pages/Relatorios.jsx'
import { Configuracao } from './pages/Configuracao.jsx'
import { Tecnico } from './pages/Tecnico.jsx'
import { User } from './pages/User.jsx'
import './index.css'

const rotas = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="TempoReal" element={<TempoReal />} />
      <Route path="Relatorios" element={<Relatorios />} />
      <Route path="Configuracao" element={<Configuracao />} />
      <Route path="Tecnico" element={<Tecnico />} />
      <Route path="User" element={<User />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
