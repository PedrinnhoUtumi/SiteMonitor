import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";

import { DataContext } from "../context/DataContext";
import menuIcon from "/src/assets/menu-hamburguer.png";
import logoSite from "../assets/metab&p.png";

export function Pagina(props) {
  const { data, name, instituicao, cargo } = useContext(DataContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("start"); // "start" ou "end"

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const estiloBotao = "text-white flex flex-row justify-center items-center";

  const rotaParaValor = { "/TempoReal": 1, "/Tecnico": 2, "/User": 3 };
  const valorParaRota = { 1: "/TempoReal", 2: "/Tecnico", 3: "/User" };

  const location = useLocation();
  const navigate = useNavigate();
  const [estado, setEstado] = useState(rotaParaValor[location.pathname] || 1);

  useEffect(() => {
    const novo = rotaParaValor[location.pathname];
    if (novo !== undefined && novo !== estado) setEstado(novo);
  }, [location.pathname]);

  function handleChange(event) {
    const v = Number(event.target.value);
    setEstado(v);
    navigate(valorParaRota[v]);
  }

  // Abre o modal para iniciar ou terminar
  const openPicker = mode => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  // Seleção de data/hora
  const handleSelect = date => {
    if (pickerMode === "start") setStartDateTime(date);
    else setEndDateTime(date);
    setShowPicker(false);
  };

  // Limpar para indeterminado
  const setIndeterminado = () => {
    setStartDateTime(null);
    setEndDateTime(null);
  };

  async function enviarDatas() {
    if (!startDateTime || !endDateTime) return;

    const inicio = format(startDateTime, "yyyy-MM-dd HH:mm:ss");
    const fim = format(endDateTime, "yyyy-MM-dd HH:mm:ss");

    const body = {
      start: inicio,
      end: fim,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/t", body);
      console.log("Resposta:", response.data);
    } catch (err) {
      console.error("Erro:", err);
    }
}

  return (
    <div className="relative flex flex-col flex-1">
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
          {/* Botões de data/hora e indeterminado */}
          <button onClick={() => openPicker("start")} className="bg-azul_claro px-3 py-1 rounded text-black">
            {startDateTime ? format(startDateTime, "dd/MM/yyyy HH:mm") : "Início"}
          </button>
          <button onClick={() => openPicker("end")} className="bg-azul_claro px-3 py-1 rounded text-black">
            {endDateTime ? format(endDateTime, "dd/MM/yyyy HH:mm") : "Fim"}
          </button>
          <button onClick={setIndeterminado} className="bg-azul_claro px-3 py-1 rounded text-black">
            Indeterminado
          </button>
        </div>
      </header>

      <main className="flex flex-col items-start flex-1 text-base text-branco bg-azul_bebe">
        {props.children}
      </main>

      {showPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <DatePicker
              selected={pickerMode === "start" ? startDateTime : endDateTime}
              onChange={handleSelect}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd/MM/yyyy HH:mm"
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
    </div>
  );
}
