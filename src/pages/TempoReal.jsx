import { Pagina } from "../components/Pagina";
import { Cabecalho } from "../components/Cabecalho";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";

export function TempoReal() {
  const { data, adicionarDados, name, adicionarNomes, email, adicionarEmail, adicionarInstituicao, cargo, adicionarCargo} = useContext(DataContext);
  const [usuario, setUsuario] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [negocioDoUsuario, setNegocioDoUsuario] = useState([]);
  const [mostrarTensoes, setMostrarTensoes] = useState(false);
  const [mostrarTensao, setMostrarTensao] = useState(true);
  const [mostrarCorrente, setMostrarCorrente] = useState(true);
  const [mostrarPotencia, setMostrarPotencia] = useState(true);
  const [mostrarConsumo, setMostrarConsumo] = useState(true);
  const [mostrarGeracao, setMostrarGeracao] = useState(true);
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setLarguraTela(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    if (data && data.length > 0) {
      const myUser = data.filter((item) => item.__tabela === "MYUSER");
      const userBusiness = data.filter(
        (item) => item.__tabela === "USER_BUSINESS"
      );
      const business = data.filter((item) => item.__tabela === "BUSINESS");

      const listaUsuarios = myUser.map((usuario) => ({
        id: usuario.ID,
        nome: usuario.NAME,
        email: usuario.EMAIL,
        role: usuario.ROLE,
        senha: usuario.SENHA,
        account: usuario.ACCOUNT,
      }));

      const listaNegocios = business.map((negocio) => ({
        id: negocio.ID,
        nome: negocio.NAME,
      }));

      const listaRelacao = userBusiness.map((relacao) => ({
        userId: relacao.USERID,
        businessId: relacao.BUSINESSID,
      }));

      setUsuario(listaUsuarios);
      setNegocios(listaNegocios);
      setNegocioDoUsuario(listaRelacao);
    }
  }, [data]);

  const usuarioEncontrado = usuario.find((user) => user.email === email);
  const toggleTensoes = () => {
    setMostrarTensoes(!mostrarTensoes);
  };

  const toggleTensao = () => setMostrarTensao(!mostrarTensao);
  const toggleCorrente = () => setMostrarCorrente(!mostrarCorrente);
  const togglePotencia = () => setMostrarPotencia(!mostrarPotencia);
  const toggleConsumo = () => setMostrarConsumo(!mostrarConsumo);
  const toggleGeracao = () => setMostrarGeracao(!mostrarGeracao);

  if (!usuarioEncontrado) {
    return (
      <Pagina>
        <div className="text-white p-10 text-center">
          Carregando perfil do usuário...
        </div>
      </Pagina>
    );
  }

  const relacao = negocioDoUsuario.find(
    (negocio) => negocio.userId === usuarioEncontrado.id
  );
  const negocio = negocios.find(
    (negocio) => negocio.id === relacao?.businessId
  );
  adicionarInstituicao(negocio?.nome || "Fundação Educere");
  adicionarCargo(usuarioEncontrado.account || "Não trabalha");


  const estiloContainerGrafico2 =
  "bg-fundo_azul_escuro_elegante w-screen max-sm:w-[95vw] sm:w-2/3 md:w-1/3 h-36 p-4 m-2 rounded-2xl shadow-md flex flex-col justify-between items-center";

  const estiloContainerGrafico3 =
    "bg-fundo_azul_escuro_elegante w-full sm:w-2/3 lg:w-1/2 h-[60vh] m-2 p-4 rounded-2xl shadow-md flex justify-center items-center";

  const estiloTitulo =
    "bg-fundo_azul_escuro_elegante h-16 w-sceen flex justify-center items-center text-2xl font-bold border-b-2 border-amber-400 rounded-2xl m-2 text-fonte_elegante_amarelo shadow-sm cursor-pointer";

  const estiloTituloContainerConsumo =
    "text-2xl sm:text-3xl text-fonte_elegante_amarelo font-semibold text-center";

  const estiloInformacoesContainerConsumo =
    "flex justify-center items-end h-20 text-5xl sm:text-6xl font-light text-fonte_elegante_amarelo text-center";

  const estiloTituloContainerGeracao =
    "text-2xl sm:text-3xl text-fonte_elegante_amarelo font-semibold text-center";

  const estiloInformacoesContainerGeracao =
    "flex justify-center items-end h-20 text-5xl sm:text-6xl font-light text-fonte_elegante_amarelo text-center";

  const estiloTituloContainerCorrente =
    "text-2xl sm:text-3xl text-fonte_elegante_amarelo font-semibold text-center";

  const estiloInformacoesContainerCorrente =
    "flex justify-center items-end h-20 text-5xl sm:text-6xl font-light text-fonte_elegante_amarelo text-center";

  const estiloTituloContainerPotencia =
    "text-2xl sm:text-3xl text-amber-400 font-semibold text-center";

  const estiloInformacoesContainerPotencia =
    "flex justify-center items-end h-20 text-5xl sm:text-6xl font-light text-amber-400 text-center";
  
  const estiloContainerWrapper = 
    "flex flex-col md:flex-row flex-wrap justify-center items-center ";


  const potenciaAtiva = data.filter((item) => item.__tabela === "ACTIVEPOWER");
  const corrente = data.filter((item) => item.__tabela === "CURRENT");
  const consumo = data.filter((item) => item.__tabela === "CONSUMPTION");
  const tensao = data.filter((item) => item.__tabela === "VOLTAGE");
  const geracao = data.filter((item) => item.__tabela === "GENERATION");

  const ultimaLeituraPotenciaAtiva =
    potenciaAtiva[0] || {};
  const ultimaLeituraCorrente = corrente[0] || {};
  const ultimaLeituraTensao = tensao[0] || {};
  const ultimaLeituraGeracao = geracao[0] || {};
  const ultimaLeituraConsumo = consumo[0] || {};

  const phaseA = ultimaLeituraPotenciaAtiva.PHASEA || 0.0;
  const phaseB = ultimaLeituraPotenciaAtiva.PHASEB || 0.0;
  const phaseC = ultimaLeituraPotenciaAtiva.PHASEC || 0.0;
  const phaseT = ultimaLeituraPotenciaAtiva.PHASET || 0.0;

  const phaseATensao = ultimaLeituraTensao.PHASEA || 0.0;
  const phaseBTensao = ultimaLeituraTensao.PHASEB || 0.0;
  const phaseCTensao = ultimaLeituraTensao.PHASEC || 0.0;
  const phaseTTensao = ultimaLeituraTensao.PHASET || 0.0;

  const phaseACorrente = ultimaLeituraCorrente.PHASEA || 0.0;
  const phaseBCorrente = ultimaLeituraCorrente.PHASEB || 0.0;
  const phaseCCorrente = ultimaLeituraCorrente.PHASEC || 0.0;

  const hojeConsumo = ultimaLeituraConsumo.TODAY || 0.0;
  const semanaConsumo = ultimaLeituraConsumo.WEEK || 0.0;
  const mesAtualConsumo = ultimaLeituraConsumo.MONTHNOW || 0.0;
  const mesPassadoConsumo = ultimaLeituraConsumo.LASTMONTH || 0.0;

  const hojeGeracao = ultimaLeituraGeracao.TODAY || 0.0;
  const semanaGeracao = ultimaLeituraGeracao.WEEK || 0.0;
  const mesAtualGeracao = ultimaLeituraGeracao.MONTHNOW || 0.0;
  const mesPassadoGeracao = ultimaLeituraGeracao.LASTMONTH || 0.0;

  console.clear();

  return (
    <Pagina>
      {larguraTela>=600 && <Cabecalho/>}
      <div className="w-full h-full flex flex-col bg-fundo_azul_claro_elegante">

        <header className={estiloTitulo} onClick={toggleTensao}>
          <h1 className="text-fonte_elegante_amarelo text-xl">Tensão [V]</h1>
        </header>
        {mostrarTensao && (
          <div className={estiloContainerWrapper}>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerCorrente}>Fase A</h1>
              <div className={estiloInformacoesContainerCorrente}>
                {phaseATensao || "0.0"}V
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerCorrente}>Fase B</h1>
              <div className={estiloInformacoesContainerCorrente}>
                {phaseBTensao || "0.0"}V
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerCorrente}>Fase C</h1>
              <div className={estiloInformacoesContainerCorrente}>
                {phaseCTensao || "0.0"}V
              </div>
            </div>
          </div>
        )}

        {/* Corrente */}
        <header className={estiloTitulo} onClick={toggleCorrente}>
          <h1 className="text-fonte_elegante_amarelo">Corrente [A]</h1>
        </header>
        {mostrarCorrente && (
          <div className={estiloContainerWrapper}>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerCorrente}>Fase A</h1>
              <div className={estiloInformacoesContainerCorrente}>
                {phaseACorrente || "0.0"}A
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerCorrente}>Fase B</h1>
              <div className={estiloInformacoesContainerCorrente}>
                {phaseBCorrente || "0.0"}A
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerCorrente}>Fase C</h1>
              <div className={estiloInformacoesContainerCorrente}>
                {phaseCCorrente || "0.0"}A
              </div>
            </div>
          </div>
        )}

        {/* Potência Ativa */}
        <header className={estiloTitulo} onClick={togglePotencia}>
          <h1 className="text-fonte_elegante_amarelo">Potência Ativa [W]</h1>
        </header>
        {mostrarPotencia && (
          <div className={estiloContainerWrapper}>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerPotencia}>Fase A</h1>
              <div className={estiloInformacoesContainerPotencia}>
                {phaseA || "0.00"}W
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerPotencia}>Fase B</h1>
              <div className={estiloInformacoesContainerPotencia}>
                {phaseB || "0.00"}W
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerPotencia}>Fase C</h1>
              <div className={estiloInformacoesContainerPotencia}>
                {phaseC || "0.00"}W
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerPotencia}>Total</h1>
              <div className={estiloInformacoesContainerPotencia}>
                {(parseFloat(phaseA) + parseFloat(phaseB) + parseFloat(phaseC)).toFixed(2) || "0.00"}W
              </div>
            </div>
          </div>
        )}

        {/* Consumo */}
        <header className={estiloTitulo} onClick={toggleConsumo}>
          <h1 className="text-fonte_elegante_amarelo">Consumo [kWh]</h1>
        </header>
        {mostrarConsumo && (
          <div className={estiloContainerWrapper}>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerConsumo}>Hoje</h1>
              <div className={estiloInformacoesContainerConsumo}>
                {hojeConsumo || "0.00"}kWh
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerConsumo}>Semana Atual</h1>
              <div className={estiloInformacoesContainerConsumo}>
                {semanaConsumo || "0.00"}kWh
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerConsumo}>Mês Atual</h1>
              <div className={estiloInformacoesContainerConsumo}>
                {mesAtualConsumo || "0.00"}kWh
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerConsumo}>Mês Anterior</h1>
              <div className={estiloInformacoesContainerConsumo}>
                {mesPassadoConsumo || "0.00"}kWh
              </div>
            </div>
          </div>
        )}

        {/* Geração */}
        <header className={estiloTitulo} onClick={toggleGeracao}>
          <h1 className="text-fonte_elegante_amarelo">Geração [kWh]</h1>
        </header>
        {mostrarGeracao && (
          <div className={estiloContainerWrapper}>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerGeracao}>Hoje</h1>
              <div className={estiloInformacoesContainerGeracao}>
                {hojeGeracao || "0.00"}kWh
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerGeracao}>Semana Atual</h1>
              <div className={estiloInformacoesContainerGeracao}>
                {semanaGeracao || "0.00"}kWh
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerGeracao}>Mês Atual</h1>
              <div className={estiloInformacoesContainerGeracao}>
                {mesAtualGeracao || "0.00"}kWh
              </div>
            </div>
            <div className={estiloContainerGrafico2}>
              <h1 className={estiloTituloContainerGeracao}>Mês Anterior</h1>
              <div className={estiloInformacoesContainerGeracao}>
                {mesPassadoGeracao || "0.00"}kWh
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col m-2 lg:flex-row justify-around items-center gap-6">
          <div className={estiloContainerGrafico3}>
            <ResponsiveContainer width="90%" height={380}>
              <LineChart data={potenciaAtiva} margin={{ top: 24, right: 30, left: 40, bottom: 20 }}>
                  <text x="50%" y={10} textAnchor="middle" dominantBaseline="central" style={{ fill: 'white', fontSize: 18 }}>
                      Potência Ativa
                  </text>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis domain={[0, 10]} tick={{fill: 'white'}} label={{value:"Quantidade de Informações", offset:-2, position:"insideBottom" }} />
                  <YAxis
                    domain={([dataMin, dataMax]) => {
                        const range = dataMax - dataMin;
                        const margin = Math.ceil(range * 0.15); 
                        return [0, dataMax + margin];
                    }}
                    tick={{ fill: 'white' }}
                    tickFormatter={(value) => Math.floor(value)}
                    label={{
                        value: 'Watts (W)',
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                    }}
                  />
                  <Line type="bump" dataKey="PHASEA" stroke="#f5af33" dot={false} strokeWidth={2} />
                  <Line type="bump" dataKey="PHASEB" stroke="#ffaa00" dot={false} strokeWidth={2} />
                  <Line type="bump" dataKey="PHASEC" stroke="#ffcc00" dot={false} strokeWidth={2} />
                  <Tooltip />
                  <Legend wrapperStyle={{ color: 'white' }} verticalAlign="top"  height={44} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className={estiloContainerGrafico3}>
            <ResponsiveContainer width="90%" height={380}>
              <LineChart data={corrente} margin={{ top: 24, right: 30, left: 40, bottom: 20 }}>
                  <text x="50%" y={10} textAnchor="middle" dominantBaseline="central" style={{ fill: 'white', fontSize: 18 }}>
                      Corrente
                  </text>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis domain={[0, 10]} tick={{fill: 'white'}} label={{value:"Quantidade de Informações", offset:-2, position:"insideBottom" }} />
                  <YAxis
                    domain={([dataMin, dataMax]) => {
                        const range = dataMax - dataMin;
                        const margin = Math.ceil(range * 0.15); 
                        return [0, dataMax + margin];
                    }}
                    tick={{ fill: 'white' }}
                    tickFormatter={(value) => value.toFixed(1)}
                    label={{
                        value: 'Ampere (A)',
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                    }}
                  />
                  <Line type="bump" dataKey="PHASEA" stroke="#f5af33" dot={false} strokeWidth={2} />
                  <Line type="bump" dataKey="PHASEB" stroke="#ffaa00" dot={false} strokeWidth={2} />
                  <Line type="bump" dataKey="PHASEC" stroke="#ffcc00" dot={false} strokeWidth={2} />
                  <Tooltip />
                  <Legend wrapperStyle={{ color: 'white' }} verticalAlign="top"  height={44} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Pagina>
  );
}
