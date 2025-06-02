import { Pagina } from "../components/Pagina";
import { Cabecalho } from "../components/Cabecalho";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";

export function TempoReal() {
  const { data, adicionarDados, name, adicionarNomes, email, adicionarEmail, adicionarInstituicao, cargo, adicionarCargo} = useContext(DataContext);
  const [usuario, setUsuario] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [negocioDoUsuario, setNegocioDoUsuario] = useState([]);
  const [mostrarTensoes, setMostrarTensoes] = useState(false);

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


  const estiloContainerGrafico =
    "bg-fundo_azul_escuro_elegante w-1/3 h-48 m-1 rounded-md flex justify-center ";
  const estiloContainerGrafico2 =
    "bg-fundo_azul_escuro_elegante w-1/3 h-36 m-1 rounded-md p-4";
  const estiloContainerGrafico3 =
    "bg-fundo_azul_escuro_elegante w-1/2 h-[50vh] m-1 rounded-md flex justify-center items-center";
  const estiloTitulo =
    "bg-fundo_azul_escuro_elegante h-16 flex justify-center items-center text-2xl m-1 rounded-md font-bold border-b-2";
  const estiloTituloContainerConsumo =
    "text-3xl text-fonte_elegante_amarelo font-bold";
  const estiloInformacoesContainerConsumo =
    "flex justify-center items-end h-20 text-7xl font-thin text-fonte_elegante_amarelo";
  const estiloTituloContainerGeracao =
    "text-3xl text-fonte_elegante_amarelo font-bold";
  const estiloInformacoesContainerGeracao =
    "flex justify-center items-end h-20 text-7xl font-thin text-fonte_elegante_amarelo";
  const estiloTituloContainerCorrente =
    "text-3xl text-fonte_elegante_amarelo font-bold";
  const estiloInformacoesContainerCorrente =
    "flex justify-center items-end h-20 text-7xl font-thin text-fonte_elegante_amarelo";
  const estiloTituloContainerPotencia = "text-3xl text-amber-500 font-bold";
  const estiloInformacoesContainerPotencia =
    "flex justify-center items-end h-20 text-7xl font-thin text-amber-500";
  const potenciaAtiva = data.filter((item) => item.__tabela === "ACTIVEPOWER");
  const corrente = data.filter((item) => item.__tabela === "CURRENT");
  const consumo = data.filter((item) => item.__tabela === "CONSUMPTION");
  const tensao = data.filter((item) => item.__tabela === "VOLTAGE");
  const geracao = data.filter((item) => item.__tabela === "GENERATED");

  const ultimaLeituraPotenciaAtiva =
    potenciaAtiva[potenciaAtiva.length - 1] || {};
  const ultimaLeituraCorrente = corrente[corrente.length - 1] || {};
  const ultimaLeituraTensao = tensao[tensao.length - 1] || {};
  const ultimaLeituraGeracao = geracao[geracao.length - 1] || {};
  const ultimaLeituraConsumo = consumo[consumo.length - 1] || {};

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
  return (
    <Pagina>
      <Cabecalho />
      <div className="w-full h-full flex flex-col bg-fundo_azul_claro_elegante">
        <header className={estiloTitulo} onClick={toggleTensoes}>
          <h1 className=" text-fonte_elegante_amarelo text-xl">Tensão [V]</h1>
        </header>

        {mostrarTensoes && (
          <div className="flex flex-col md:flex-row justify-around gap-4 mt-4">
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <h1 className="text-lg font-semibold">Fase A</h1>
              <div>{phaseATensao || "0.0"}V</div>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <h1 className="text-lg font-semibold">Fase B</h1>
              <div>{phaseBTensao || "0.0"}V</div>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <h1 className="text-lg font-semibold">Fase C</h1>
              <div>{phaseCTensao || "0.0"}V</div>
            </div>
          </div>
        )}
        {/* <div className="flex flex-row justify-around">
          <div className={estiloContainerGrafico2}>
            <h1 className={estiloTituloContainerCorrente}>Fase A</h1>
            <div className={estiloInformacoesContainerCorrente}>
              {phaseATensao || "0.0"}V
              {console.log("todos os dados", data)}
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
        </div> */}

        <header className={estiloTitulo}>
          <h1 className="text-fonte_elegante_amarelo ">Corrente [A]</h1>
        </header>
        <div className="flex flex-row justify-around">
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

        <header className={estiloTitulo}>
          <h1 className="text-fonte_elegante_amarelo ">Potência Ativa [W]</h1>
        </header>
        <div className="flex flex-row justify-around">
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

        <header className={estiloTitulo}>
          <h1 className="text-fonte_elegante_amarelo ">Consumo [kWh]</h1>
        </header>
        <div className="flex flex-row justify-around">
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

        <header className={estiloTitulo}>
          <h1 className="drop-shadow-xl text-fonte_elegante_amarelo ">
            Geração [kWh]
          </h1>
        </header>
        <div className="flex flex-row justify-around">
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

        <div className="flex flex-row justify-around">
          <div className={estiloContainerGrafico3}>
            <ResponsiveContainer width="90%" height={300}>
              <BarChart data={potenciaAtiva}>
                <CartesianGrid />
                <XAxis dataKey="PotenciaAtiva" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="PHASEA" fill="#f5af33" />
                <Bar dataKey="PHASEB" fill="#ffaa00" />
                <Bar dataKey="PHASEC" fill="#ffcc00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={estiloContainerGrafico3}>
            <ResponsiveContainer width="90%" height={300}>
              <BarChart data={corrente}>
                <CartesianGrid />
                <XAxis dataKey="Corrente" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="PHASEA" fill="#f5af33" />
                <Bar dataKey="PHASEB" fill="#ffaa00" />
                <Bar dataKey="PHASEC" fill="#ffcc00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Pagina>
  );
}
