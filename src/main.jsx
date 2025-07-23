import React, { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { DataProvider } from './context/DataContext.jsx';
import './index.css'  // onde está o @tailwind base, components, utilities
import LoadingPage from './loadingPage.jsx';


// Lazy imports (code splitting)
const Login = lazy(() => import('./pages/Login.jsx'));
const Cadastro = lazy(() => import('./pages/Cadastro.jsx'));
const TempoReal = lazy(() => import('./pages/TempoReal.jsx'));
const Tecnico = lazy(() => import('./pages/Tecnico.jsx'));
const User = lazy(() => import('./pages/User.jsx'));
const RotaProtegida = lazy(() => import('./components/RotaProtegida.jsx'));

// Definindo as rotas normalmente com lazy nas páginas
const rotas = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="Cadastro" element={<Cadastro />} />
      <Route path="TempoReal" element={<TempoReal />} />
      <Route path="Tecnico" element={<Tecnico />} />
      <Route element={<RotaProtegida />}>
        <Route path="User" element={<User />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider> {/* contexto ativo para toda a app */}
      {/* Suspense só envolve o RouterProvider para lazy loading das páginas */}
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={rotas} />
      </Suspense>
    </DataProvider>
  </StrictMode>
);
