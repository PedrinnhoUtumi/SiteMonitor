import { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

export function Pagina(props) {
  const estiloBotao = "text-white flex flex-row justify-center items-center";

  const opcoes = {
    1: "Tempo Real",
    2: "Configuração",
    3: "Técnico",
    4: "Relatórios",
    5: "Usuário"
  };
  
  const rotaParaValor = {
    "/TempoReal": 1,
    "/Configuracao": 2,
    "/Tecnico": 3,
    "/Relatorios": 4,
    "/User": 5, 
  };
  
  const valorParaRota = {
    1: "/TempoReal",
    2: "/Configuracao",
    3: "/Tecnico",
    4: "/Relatorios",
    5: "/User", 
  };
  

  const location = useLocation();
  const navigate = useNavigate();
  const [estado, setEstado] = useState(rotaParaValor[location.pathname] || 1);

  useEffect(() => {
    const novoEstado = rotaParaValor[location.pathname];
    if (novoEstado !== undefined && novoEstado !== estado) {
      setEstado(novoEstado);
    }
  }, [location.pathname]);

  function handleChange(event) {
    const value = Number(event.target.value);
    setEstado(value);
    navigate(valorParaRota[value]);
  }

  return (
    <div className="flex flex-col flex-1">
      <header className="flex flex-row justify-between items-center px-5 h-16 border-b bg-fundo_azul_escuro_elegante text-branco">
        <div className="ml-4">
          <h1>Nome Lugar</h1>
        </div>

        <div className="flex flex-row items-center mr-15 p-9">
          <div>
            <select
              value={estado}
              onChange={handleChange}
              className="rounded-md p-1 bg-fundo_azul_escuro_elegante text-branco mr-5"
            >
              {Object.entries(opcoes).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="mx-4">
            <h2>modelo</h2>
          </div>

          <div className="mx-4">
            <h2>intituição</h2>
          </div>

          <nav className="mx-4">
            <NavLink to="/User" className={estiloBotao}>
              João Reni
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-start flex-1 text-base text-branco bg-azul_bebe">
        {props.children}
      </main>
    </div>
  );
}
