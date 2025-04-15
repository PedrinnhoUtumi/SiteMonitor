import { Pagina } from "../components/Pagina"
import { Cabecalho } from "../components/Cabecalho"
import  { data } from "./Tecnico"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function TempoReal() {
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
    
    return (
        <Pagina>
            <Cabecalho />
            <div className="w-full h-full flex flex-col bg-fundo_azul_claro_elegante">
                <header className={estiloTitulo}>
                    <h1 className=" text-fonte_elegante_amarelo">Tensão [V]</h1>
                </header>

                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico}>

                    </div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="text-fonte_elegante_amarelo ">Corrente [A]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerCorrente}>Fase A</h1>
                        <div className={estiloInformacoesContainerCorrente}>
                            0.0A
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerCorrente}>Fase B</h1>
                        <div className={estiloInformacoesContainerCorrente}>
                            0.0A
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerCorrente}>Fase C</h1>
                        <div className={estiloInformacoesContainerCorrente}>
                            0.0A
                        </div>
                    </div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="text-amber-500 ">Potência Ativa [W]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerPotencia}>Fase A</h1>
                        <div className={estiloInformacoesContainerPotencia}>
                            0.00W
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerPotencia}>Fase B</h1>
                        <div className={estiloInformacoesContainerPotencia}>
                            0.00W
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerPotencia}>Fase C</h1>
                        <div className={estiloInformacoesContainerPotencia}>
                            0.00W
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerPotencia}>Total</h1>
                        <div className={estiloInformacoesContainerPotencia}>
                            0.00W
                        </div>
                    </div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="text-yellow-500 ">Consumo [kWh]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Hoje</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.00kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Semana Atual</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.00kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Mês Atual</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.00kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Mês Anterior</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.00kWh
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
                            0.00kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerGeracao}>Semana Atual</h1>
                        <div className={estiloInformacoesContainerGeracao}>
                            0.00kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerGeracao}>Mês Atual</h1>
                        <div className={estiloInformacoesContainerGeracao}>
                            0.00kWh
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerGeracao}>Mês Anterior</h1>
                        <div className={estiloInformacoesContainerGeracao}>
                            0.00kWh
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico3}>
                        <ResponsiveContainer width="90%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid  />
                            <XAxis dataKey="name"/>
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="uv" fill="#f5af33" />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={estiloContainerGrafico3}>
                        <ResponsiveContainer width="90%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid  />
                            <XAxis dataKey="name"/>
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pedro" fill="#f5af33" />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </Pagina>
    )
}
