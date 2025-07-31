import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isValid } from "date-fns";
import { DataContext } from "../context/DataContext";
import logoSite from "../assets/metab&p.png";
import { Menu } from "lucide-react"; 


export function Pagina(props) {
  const { data, name, instituicao, cargo, inicio, adicionarInicio, fim, adicionarFim } = useContext(DataContext);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("start");

  const [tempDate, setTempDate] = useState(new Date());

  useEffect(() => {
    setTempDate(pickerMode === "start" ? inicio : fim || new Date());
  }, [showPicker]);

  const isTempDateComplete = () => {
    return tempDate instanceof Date && isValid(tempDate);
};

  const confirmarData = () => {
    if (!isTempDateComplete()) return;

    if (pickerMode === "start") {
      adicionarInicio(tempDate);  
    } else {
      adicionarFim(tempDate);
    }
    setShowPicker(false);
  };


  const toggleMenu = () => {
    setIsMenuOpen(prev => { 
      ('Toggle menu, estado anterior:', prev);
      return !prev;
    });
  };

  const estiloBotao = "text-white flex flex-row justify-center items-center";

  const rotaParaValor = { "/TempoReal": 1, "/Tecnico": 2, "/User": 3 };
  const valorParaRota = { 1: "/TempoReal", 2: "/Tecnico", 3: "/User" };

  const location = useLocation();
  const navigate = useNavigate();
  const [estado, setEstado] = useState(rotaParaValor[location.pathname] || 1);
  const [selectedDate, setSelectedDate] = useState(null);


  useEffect(() => {
    const novo = rotaParaValor[location.pathname];
    if (novo !== undefined && novo !== estado) {
      setEstado(novo);
    }
  }, [location.pathname]);

  function handleChange(event) {
    const v = Number(event.target.value);
    setEstado(v);
    navigate(valorParaRota[v]);
  }

  const openPicker = mode => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  const handleSelect = date => {
    if (pickerMode === "start") {
      adicionarInicio(date);  
    } else {
      adicionarFim(date);  
    }
    setShowPicker(false);
  };

  const setIndeterminado = () => {
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
          <Menu className="h-auto w-8" />
        </button>
        <div className={`flex-col md:flex-row md:flex gap-4 absolute md:static bg-fundo_azul_escuro_elegante md:bg-transparent p-4 md:p-0 rounded-lg top-16 right-1 z-50 ${isMenuOpen ? "flex" : "hidden"}`}>
          <NavLink to="/TempoReal" className={estiloBotao}>Tempo Real</NavLink>
          <NavLink to="/Tecnico" className={estiloBotao}>Técnico</NavLink>
          {cargo === "Administrador" && <NavLink to="/Cadastro" className={estiloBotao}>Cadastrar</NavLink>}
          <NavLink to="/User" className={estiloBotao}>{name}</NavLink>

          {/* Botões de data/hora */}
          <button onClick={() => openPicker("start")} className="bg-fundo_azul_escuro_elegante  pl-1 rounded text-white">
            {inicio ? format(inicio, "yyyy-MM-dd HH:mm:ss") : "Início"}
          </button>
          <button onClick={() => openPicker("end")} className="bg-fundo_azul_escuro_elegante  pl-1 rounded text-white">
            {fim ? format(fim, "yyyy-MM-dd HH:mm:ss") : "Fim"}
          </button>
          {/* <button onClick={setIndeterminado} className="bg-fundo_azul_escuro_elegante  pl-1 rounded text-white">
            Indeterminado
          </button> */}
        </div>  

        {/* DatePicker Modal */}
        {showPicker && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
              <h2 className="text-lg font-semibold mb-4 text-black">Selecione data e hora</h2>

              <div className="space-y-4">
                {/* Calendário */}
                <DatePicker
                  selected={tempDate}
                  onChange={(date) => {
                    const updated = new Date(tempDate);
                    updated.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                    setTempDate(updated);
                  }}
                  inline
                  calendarClassName="text-black"
                />

                {/* Campo de hora */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="horaInput" className="text-black text-sm font-medium">
                    Hora (HH:mm)
                  </label>
                  <input
                    id="horaInput"
                    type="time"
                    value={format(tempDate, "HH:mm")}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":");
                      const updated = new Date(tempDate);
                      updated.setHours(parseInt(hours), parseInt(minutes));
                      setTempDate(updated);
                    }}
                    className="border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowPicker(false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarData}
                  disabled={!isTempDateComplete()}
                  className={`px-4 py-1 rounded ${
                    isTempDateComplete()
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}


      </header>

      {/* Main Content */}
      <main className="flex flex-col items-start flex-1 text-base text-branco bg-azul_bebe">
        {props.children}
      </main>
    </div>
  );
}
