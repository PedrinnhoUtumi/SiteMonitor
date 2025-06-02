import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { DataContext } from "../context/DataContext";

export function Pagina(props) {
  const { data, name, instituicao, cargo } = useContext(DataContext);
  const myUser = data.filter(item => item.__tabela === "MYUSER")


  const estiloBotao = "text-white flex flex-row justify-center items-center";

  const opcoes = {
    1: "Tempo Real",
    2: "Técnico",
    3: "Usuário",
  };
  
  const rotaParaValor = {
    "/TempoReal": 1,
    "/Tecnico": 2,
    "/User": 3,
  };
  
  const valorParaRota = {
    1: "/TempoReal",
    2: "/Tecnico",
    3: "/User", 
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
  console.log("cargo", cargo)

  return (
    <div className="flex flex-col flex-1">
      <header className="flex flex-row justify-between items-center px-5 h-16 border-b bg-fundo_azul_escuro_elegante text-branco">
        <div className="ml-4">
          <h1>Monitor de Energia Educere</h1>
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
          
          
          
          {cargo === "Administrador" && (
            <div className="mx-4">
              <NavLink to="/Cadastro" className={estiloBotao}>
                Cadastrar
              </NavLink>
            </div> 
          )}

          <div className="mx-4">
            <h2>{instituicao}</h2>
          </div>

          <nav className="mx-4">
            <NavLink to="/User" className={estiloBotao}>
              {name}
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

