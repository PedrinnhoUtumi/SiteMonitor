import { Pagina } from "../components/Pagina"
import { Cabecalho } from "../components/Cabecalho"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useContext } from "react"
import { DataContext } from "../context/DataContext"



export function TempoReal() {
    const { data, adicionarDados, name, adicionarNomes, email, adicionarEmail } = useContext(DataContext)
    console.log("data", email);

    
    
    const estiloContainerGrafico = "bg-fundo_azul_escuro_elegante w-1/3 h-48 m-1 rounded-md flex justify-center "
    const estiloContainerGrafico2 = "bg-fundo_azul_escuro_elegante w-1/3 h-36 m-1 rounded-md p-4"
    const estiloContainerGrafico3 = "bg-fundo_azul_escuro_elegante w-1/2 h-[50vh] m-1 rounded-md flex justify-center items-center"
    const estiloTitulo = "bg-fundo_azul_escuro_elegante h-16 flex justify-center items-center text-2xl m-1 rounded-md font-bold border-b-2" 
    const estiloTituloContainerConsumo = "text-3xl text-fonte_elegante_amarelo font-bold"
    const estiloInformacoesContainerConsumo = "flex justify-center items-end h-20 text-7xl font-thin text-fonte_elegante_amarelo"
    const estiloTituloContainerGeracao = "text-3xl text-fonte_elegante_amarelo font-bold"
    const estiloInformacoesContainerGeracao = "flex justify-center items-end h-20 text-7xl font-thin text-fonte_elegante_amarelo"
    const estiloTituloContainerCorrente = "text-3xl text-fonte_elegante_amarelo font-bold"
    const estiloInformacoesContainerCorrente = "flex justify-center items-end h-20 text-7xl font-thin text-fonte_elegante_amarelo"
    const estiloTituloContainerPotencia = "text-3xl text-amber-500 font-bold"
    const estiloInformacoesContainerPotencia = "flex justify-center items-end h-20 text-7xl font-thin text-amber-500"
    const potenciaAtiva = data.filter(item => item.__tabela === "ACTIVEPOWER")
    const corrente = data.filter(item => item.__tabela === "CURRENT")
    const consumo = data.filter(item => item.__tabela === "CONSUMPTION")
    const tensao = data.filter(item => item.__tabela === "VOLTAGE")
    const geracao = data.filter(item => item.__tabela === "GENERATED")
    
    const ultimaLeituraPotenciaAtiva = potenciaAtiva[potenciaAtiva.length - 1] || {}
    const ultimaLeituraCorrente = corrente[corrente.length - 1] || {}
    const ultimaLeituraTensao = tensao[tensao.length - 1] || {}
    const ultimaLeituraGeracao = geracao[geracao.length - 1] || {}
    const ultimaLeituraConsumo = consumo[consumo.length - 1] || {}

    const phaseA = ultimaLeituraPotenciaAtiva.PHASEA || 0.00
    const phaseB = ultimaLeituraPotenciaAtiva.PHASEB || 0.00
    const phaseC = ultimaLeituraPotenciaAtiva.PHASEC || 0.00

    const phaseATensao = ultimaLeituraTensao.PHASEA || 0.00
    const phaseBTensao = ultimaLeituraTensao.PHASEB || 0.00
    const phaseCTensao = ultimaLeituraTensao.PHASEC || 0.00

    const phaseACorrente = ultimaLeituraCorrente.PHASEA || 0.00
    const phaseBCorrente = ultimaLeituraCorrente.PHASEB || 0.00
    const phaseCCorrente = ultimaLeituraCorrente.PHASEC || 0.00

    const hojeConsumo = ultimaLeituraConsumo.TODAY || 0.00
    const semanaConsumo = ultimaLeituraConsumo.WEEK || 0.00
    const mesAtualConsumo = ultimaLeituraConsumo.MONTHNOW || 0.00
    const mesPassadoConsumo = ultimaLeituraConsumo.LASTMONTH || 0.00
    
    const hojeGeracao = ultimaLeituraGeracao.TODAY || 0.00
    const semanaGeracao = ultimaLeituraGeracao.WEEK || 0.00
    const mesAtualGeracao = ultimaLeituraGeracao.MONTHNOW || 0.00
    const mesPassadoGeracao = ultimaLeituraGeracao.LASTMONTH || 0.00
    return (
        <Pagina>
            <Cabecalho />
            <div className="w-full h-full flex flex-col bg-fundo_azul_claro_elegante">
                <header className={estiloTitulo}>
                    <h1 className=" text-fonte_elegante_amarelo">Tensão [V]</h1>
                </header>

                <div className="flex flex-row justify-around">

                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerCorrente}>Fase A</h1>
                        <div className={estiloInformacoesContainerCorrente}>
                            {phaseATensao.toFixed(1) || "0.0"}V
                            {console.log("todos os dados", data)}
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerCorrente}>Fase B</h1>
                        <div className={estiloInformacoesContainerCorrente}>
                            {phaseBTensao.toFixed(1) || "0.0"}V
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerCorrente}>Fase C</h1>
                        <div className={estiloInformacoesContainerCorrente}>
                            {phaseCTensao.toFixed(1) || "0.0"}V
                        </div>
                    </div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="text-fonte_elegante_amarelo ">Corrente [A]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerCorrente}>Fase A</h1>
                        <div className={estiloInformacoesContainerCorrente}>
                            {phaseACorrente.toFixed(1) || "0.0"}A
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerCorrente}>Fase B</h1>
                        <div className={estiloInformacoesContainerCorrente}>
                            {phaseBCorrente.toFixed(1) || "0.0"}A
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerCorrente}>Fase C</h1>
                        <div className={estiloInformacoesContainerCorrente}>
                            {phaseCCorrente.toFixed(1) || "0.0"}A
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
                            {phaseA.toFixed(2) || "0.00"}W
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerPotencia}>Fase B</h1>
                        <div className={estiloInformacoesContainerPotencia}>
                            {phaseB.toFixed(2) || "0.00"}W
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerPotencia}>Fase C</h1>
                        <div className={estiloInformacoesContainerPotencia}>
                            {phaseC.toFixed(2) || "0.00"}W
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerPotencia}>Total</h1>
                        <div className={estiloInformacoesContainerPotencia}>
                            {(phaseA + phaseB + phaseC)?.toFixed(2) || "0.00"}W
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
                            {hojeConsumo.toFixed(2) || "0.00"}kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Semana Atual</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            {semanaConsumo.toFixed(2) || "0.00"}kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Mês Atual</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            {mesAtualConsumo.toFixed(2) || "0.00"}kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Mês Anterior</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            {mesPassadoConsumo.toFixed(2) || "0.00"}kWh
                        </div>
                    </div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="drop-shadow-xl text-fonte_elegante_amarelo ">Geração [kWh]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerGeracao}>Hoje</h1>
                        <div className={estiloInformacoesContainerGeracao}>
                            {hojeGeracao.toFixed(2) || "0.00"}kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerGeracao}>Semana Atual</h1>
                        <div className={estiloInformacoesContainerGeracao}>
                            {semanaGeracao.toFixed(2) || "0.00"}kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerGeracao}>Mês Atual</h1>
                        <div className={estiloInformacoesContainerGeracao}>
                            {mesAtualGeracao.toFixed(2) || "0.00"}kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerGeracao}>Mês Anterior</h1>
                        <div className={estiloInformacoesContainerGeracao}>
                            {mesPassadoGeracao.toFixed(2) || "0.00"}kWh
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico3}>
                        <ResponsiveContainer width="90%" height={300}>
                        <BarChart data={potenciaAtiva}>
                            <CartesianGrid  />
                            <XAxis dataKey="PotenciaAtiva"/>
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
                            <CartesianGrid  />
                            <XAxis dataKey="Corrente"/>
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
    )
}
