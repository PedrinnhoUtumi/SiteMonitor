import { Pagina } from "../components/Pagina"
import { Cabecalho } from "../components/Cabecalho"
import  { data } from "./Tecnico"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function TempoReal() {
    const estiloContainerGrafico = "bg-azul_escuro w-1/3 h-48 m-1 rounded-md"
    const estiloContainerGrafico2 = "bg-azul_escuro w-1/3 h-36 m-1 rounded-md p-4"
    const estiloContainerGrafico3 = "bg-azul_escuro w-1/2 h-[50vh] m-1 rounded-md flex justify-center items-center"
    const estiloTitulo = "bg-azul_escuro h-16 flex justify-center items-center text-2xl m-1 rounded-md font-bold"
    const estiloTituloContainerConsumo = "text-3xl text-yellow-500 font-bold"
    const estiloInformacoesContainerConsumo = "flex justify-center items-end h-20 text-7xl font-thin text-yellow-500"
    const estiloTituloContainerGeracao = "text-3xl text-green-500 font-bold"
    const estiloInformacoesContainerGeracao = "flex justify-center items-end h-20 text-7xl font-thin text-green-500"

    return (
        <Pagina>
            <Cabecalho />
            <div className="w-full h-full flex flex-col">
                <header className={estiloTitulo}>
                    <h1 className=" text-red-500 glow">Tensão [V]</h1>
                </header>

                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico}>
                    </div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="text-orange-500 glow">Corrente [A]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Fase A</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.0A
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Fase B</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.0A
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Fase C</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.0A
                        </div>
                    </div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="text-amber-500 glow">Potência Ativa [W]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Fase A</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.00W
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Fase B</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.00W
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Fase C</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.00W
                        </div>
                    </div>
                    <div className={estiloContainerGrafico2}>
                        <h1 className={estiloTituloContainerConsumo}>Total</h1>
                        <div className={estiloInformacoesContainerConsumo}>
                            0.00W
                        </div>
                    </div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="text-yellow-500 glow">Consumo [kWh]</h1>
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
                    <h1 className="drop-shadow-xl text-green-500 glow">Geração [kWh]</h1>
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
                            <Bar dataKey="uv" fill="#2C4F75" />
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
                            <Bar dataKey="pedro" fill="#2C4F75" />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </Pagina>
    )
}
