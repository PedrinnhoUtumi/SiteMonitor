import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import menuIcon from "/src/assets/menu-hamburguer.png";
import logoSite from "../assets/metab&p.png";

export function Pagina(props) {
  const { data, name, instituicao, cargo } = useContext(DataContext);
  const myUser = data.filter((item) => item.__tabela === "MYUSER");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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

  return (
    <nav className="flex flex-col flex-1">
      <header className="flex flex-row justify-between items-center px-5 h-16 border-b bg-fundo_azul_escuro_elegante text-branco">
        <header className="flex items-center justify-between  ">
          <div className="flex items-center w-72">
            <img src={logoSite} alt="Logo METAB&P" className="h-50" />
          </div>
        </header>

        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <img src={menuIcon} alt="Abrir menu" className="h-auto w-8" />
        </button>

        <div
          className={`flex-col md:flex-row md:flex gap-4 absolute md:static bg-fundo_azul_escuro_elegante md:bg-transparent p-4 md:p-0 rounded-lg top-16 right-1 z-50  ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <NavLink to="/TempoReal" className={estiloBotao}>
            Tempo Real
          </NavLink>
          <NavLink to="/Tecnico" className={estiloBotao}>
            Técnico
          </NavLink>
          {cargo === "Administrador" && (
            <div>
              <NavLink to="/Cadastro" className={estiloBotao}>
                Cadastrar
              </NavLink>
            </div>
          )}
          <NavLink to="/User" className={estiloBotao}>
            {name}
          </NavLink>
        </div>
      </header>
      {/* <header className="flex flex-row justify-between items-center px-5 h-16 border-b bg-fundo_azul_escuro_elegante text-branco">
        <div className="ml-4">
          <h1>Monitor de Energia Educere</h1>
        </div>

          
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
      </header> */}

      <main className="flex flex-col items-start flex-1 text-base text-branco bg-azul_bebe">
        {props.children}
      </main>
    </nav>
  );
}
