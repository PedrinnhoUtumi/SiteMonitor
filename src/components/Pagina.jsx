import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { DataContext } from "../context/DataContext";
import menuIcon from "/src/assets/menu-hamburguer.png";
import logoSite from "../assets/metab&p.png";

export function Pagina(props) {
  // Acessando o contexto DataContext
  const { data, name, instituicao, cargo, inicio, adicionarInicio, fim, adicionarFim } = useContext(DataContext);
  
  // Estado para o menu e data/hora
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("start");

  // Log inicial para depuração
  console.log("Renderizando componente Pagina");
  console.log("Estado Inicial: isMenuOpen", isMenuOpen);

  // Função de toggle do menu
  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      console.log('Toggle menu, estado anterior:', prev);
      return !prev;
    });
  };

  // Variáveis de estilo para os botões
  const estiloBotao = "text-white flex flex-row justify-center items-center";

  // Roteamento da navegação
  const rotaParaValor = { "/TempoReal": 1, "/Tecnico": 2, "/User": 3 };
  const valorParaRota = { 1: "/TempoReal", 2: "/Tecnico", 3: "/User" };

  const location = useLocation();
  const navigate = useNavigate();
  const [estado, setEstado] = useState(rotaParaValor[location.pathname] || 1);

  useEffect(() => {
    console.log('useEffect - mudança de rota: ', location.pathname);
    const novo = rotaParaValor[location.pathname];
    if (novo !== undefined && novo !== estado) {
      setEstado(novo);
    }
  }, [location.pathname]);

  // Função de manipulação da mudança de rota
  function handleChange(event) {
    const v = Number(event.target.value);
    console.log('Mudando para rota:', v, 'Nova rota:', valorParaRota[v]);
    setEstado(v);
    navigate(valorParaRota[v]);
  }

  // Função para abrir o DatePicker
  const openPicker = mode => {
    console.log(`Abrindo picker para: ${mode}`);
    setPickerMode(mode);
    setShowPicker(true);
  };

  // Função de seleção da data
  const handleSelect = date => {
    console.log('Data selecionada: ', date);
    if (pickerMode === "start") {
      console.log('Adicionando data de início');
      adicionarInicio(date);  // Atualiza a data de início
    } else {
      console.log('Adicionando data de fim');
      adicionarFim(date);  // Atualiza a data de fim
    }
    setShowPicker(false);
  };

  // Função para marcar como "indeterminado"
  const setIndeterminado = () => {
    console.log('Marcando como indeterminado');
    adicionarInicio(null);
    adicionarFim(null);
  };

  return (
    <div className="relative flex flex-col flex-1">
      {/* Header */}
      <header className="flex flex-row justify-between items-center px-5 h-16 border-b bg-fundo_azul_escuro_elegante text-branco">
        <div className="flex items-center w-72">
          <img src={logoSite} alt="Logo METAB&P" className="h-50" />
        </div>
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <img src={menuIcon} alt="Abrir menu" className="h-auto w-8" />
        </button>
        <div className={`flex-col md:flex-row md:flex gap-4 absolute md:static bg-fundo_azul_escuro_elegante md:bg-transparent p-4 md:p-0 rounded-lg top-16 right-1 z-50 ${isMenuOpen ? "flex" : "hidden"}`}>
          <NavLink to="/TempoReal" className={estiloBotao}>Tempo Real</NavLink>
          <NavLink to="/Tecnico" className={estiloBotao}>Técnico</NavLink>
          {cargo === "Administrador" && <NavLink to="/Cadastro" className={estiloBotao}>Cadastrar</NavLink>}
          <NavLink to="/User" className={estiloBotao}>{name}</NavLink>

          {/* Botões de data/hora */}
          <button onClick={() => openPicker("start")} className="bg-azul_claro px-3 py-1 rounded text-black">
            {inicio ? format(inicio, "yyyy-MM-dd HH:mm:ss") : "Início"}
          </button>
          <button onClick={() => openPicker("end")} className="bg-azul_claro px-3 py-1 rounded text-black">
            {fim ? format(fim, "yyyy-MM-dd HH:mm:ss") : "Fim"}
          </button>
          <button onClick={setIndeterminado} className="bg-azul_claro px-3 py-1 rounded text-black">
            Indeterminado
          </button>
        </div>

        {/* DatePicker Modal */}
        {showPicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <DatePicker
                selected={pickerMode === "start" ? inicio : fim}
                onChange={handleSelect}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm:ss"
                inline
              />
              <div className="mta-4 text-right">
                <button onClick={() => setShowPicker(false)} className="bg-red-500 text-white px-4 py-1 rounded">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-start flex-1 text-base text-branco bg-azul_bebe">
        {console.log('Renderizando children da página')}
        {props.children}
      </main>
    </div>
  );
}
