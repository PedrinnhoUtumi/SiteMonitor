import { Pagina } from "../components/Pagina"
import { Cabecalho } from '../components/Cabecalho'
import { IconDownload } from "@tabler/icons-react"
// import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../context/DataContext"
import axios from "axios"
// import { useEffect, useState } from "react"

export function Tecnico() {
    const { data, adicionarDados, name, adicionarNomes } = useContext(DataContext)
    
    const estiloContainerGrafico = "bg-fundo_azul_escuro_elegante w-[90vw] lg:w-[35vw] h-auto lg:h-[60vh] m-1 p-4 rounded-md border-b"
    const estiloContainerGrafico3 = "bg-fundo_azul_escuro_elegante w-[90vw] lg:w-[50vw] h-auto lg:h-[65vh] m-1 p-4 rounded-md border-b mb-5"
    const estiloContainerGrafico2 = "bg-fundo_azul_escuro_elegante w-[50vw] h-[25vh] m-1 p-2 rounded-md flex flex-row"
    const [dados, setDados] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [larguraTela, setLarguraTela] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => setLarguraTela(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const potenciaAtiva = data.filter(item => item.__tabela === "ACTIVEPOWER")
    const corrente = data.filter(item => item.__tabela === "CURRENT")
    const consumo = data.filter(item => item.__tabela === "CONSUMPTION")
    const tensao = data.filter(item => item.__tabela === "VOLTAGE")
    const geracao = data.filter(item => item.__tabela === "GENERATION")
    

    const ultimaLeituraPotenciaAtiva = potenciaAtiva[potenciaAtiva.length - 1] || {}
    const ultimaLeituraCorrente = corrente[corrente.length - 1] || {}
    const ultimaLeituraTensao = tensao[tensao.length - 1] || {}
    const ultimaLeituraGeracao = geracao[geracao.length - 1] || {}
    const ultimaLeituraConsumo = consumo[consumo.length - 1] || {}

    function exportCSV() {
        function convertToCSV(data) {
            const headers = Object.keys(data[0]);
            const csvRows = [];

            csvRows.push(headers.join(','));

            for (const row of data) {
                const values = headers.map(header => row[header]);
                csvRows.push(values.join(','));
            }

            return csvRows.join('\n');
        }

        const csvData = convertToCSV(data)

        const blob = new Blob([csvData], { type: 'text/csv' })

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'dados.csv'
        link.click()
    }


    return (
        <Pagina>
            {larguraTela>=600 && <Cabecalho/>}
            <div className="w-full h-full flex flex-col bg-fundo_azul_claro_elegante ">
                <div className="flex flex-col lg:flex-row justify-around items-center gap-6 mb-6 mt-5">
                    <div className={estiloContainerGrafico}>

                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={potenciaAtiva} margin={{ top: 24, right: 30, left: 40, bottom: 20 }}>
                                <text x="50%" y={10} textAnchor="middle" dominantBaseline="central" style={{ fill: 'white', fontSize: 18 }}>
                                    Potência Ativa
                                </text>

                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis domain={[0, 5]} tick={{fill: 'white'}} label={{value:"Quantidade de Informações", offset:-2, position:"insideBottom" }}/>
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
                                <Legend wrapperStyle={{ color: 'white', marginBottom: 16}} verticalAlign="top"  height={44} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={estiloContainerGrafico}>
                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={corrente} margin={{ top: 24, right: 30, left: 40, bottom: 20 }}>
                                <text x="50%" y={10} textAnchor="middle" dominantBaseline="central" style={{ fill: 'white', fontSize: 18 }}>
                                    Corrente
                                </text>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis domain={[0, 10]} tick={{fill: 'white'}} label={{value:"Quantidade de Informações", offset:-2, position:"insideBottom" }} />
                                <YAxis domain={([dataMin, dataMax]) => [Math.floor(dataMin - 1), Math.ceil(dataMax + 1)]} tick={{fill: 'white'}} label={{value:"Ampere (A)", angle:-90 , position:'insideLeft',style: { textAnchor: 'middle' }}}/>
                                <Line type="bump" dataKey="PHASEA" stroke="#f5af33" dot={false} strokeWidth={2} />
                                <Line type="bump" dataKey="PHASEB" stroke="#ffaa00" dot={false} strokeWidth={2} />
                                <Line type="bump" dataKey="PHASEC" stroke="#ffcc00" dot={false} strokeWidth={2} />
                                <Tooltip />
                                <Legend wrapperStyle={{ color: 'white' }} verticalAlign="top"  height={44} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={estiloContainerGrafico}>
                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={tensao} margin={{ top: 24, right: 30, left: 40, bottom: 20 }}>
                                <text x="50%" y={10} textAnchor="middle" dominantBaseline="central" style={{ fill: 'white', fontSize: 18 }}>
                                    Tensão
                                </text>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis domain={[0, 5]} tick={{fill: 'white'}} label={{value:"Quantidade de Informações", offset:-2, position:"insideBottom" }}/>
                                <YAxis domain={([dataMin, dataMax]) => [Math.floor(dataMin - 1), Math.ceil(dataMax + 1)]} tick={{fill: 'white'}}label={{value:"Volts (V)", angle:-90 , position:'insideLeft',style: { textAnchor: 'middle' }}} />
                                <Line type="bump" dataKey="PHASEA" stroke="#f5af33" dot={false} strokeWidth={2} />
                                <Line type="bump" dataKey="PHASEB" stroke="#ffaa00" dot={false} strokeWidth={2} />
                                <Line type="bump" dataKey="PHASEC" stroke="#ffcc00" dot={false} strokeWidth={2} />
                                <Tooltip />
                                <Legend wrapperStyle={{ color: 'white' }} verticalAlign="top"  height={44} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-around items-center ">
                    <div className={estiloContainerGrafico3}>                        
                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={geracao} margin={{ top: 24, right: 30, left: 40, bottom: 20 }}>
                                <text x="50%" y={10} textAnchor="middle" dominantBaseline="central" style={{ fill: 'white', fontSize: 18 }}>
                                    Geração
                                </text>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis domain={[0, 5]} tick={{fill: 'white'}} label={{value:"Quantidade de Informações", offset:-2, position:"insideBottom" }}/>
                                <YAxis domain={([dataMin, dataMax]) => [Math.floor(dataMin - 1), Math.ceil(dataMax + 1)]} tick={{fill: 'white'}} label={{value: 'Kilowatts/Hora (kWh)', angle: -90,position: 'insideLeft',style: { textAnchor: 'middle' } }}/>
                                <Tooltip />
                                <Legend wrapperStyle={{ color: 'white' }} verticalAlign="top"  height={44} />
                                <Line type="bump" dataKey="TODAY" stroke="#f5af33" dot={false} strokeWidth={2} />
                                <Line type="bump" dataKey="WEEK" stroke="#ffaa00" dot={false} strokeWidth={2} />
                                <Line type="bump" dataKey="MONTHNOW" stroke="#ffcc00" dot={false} strokeWidth={2} />
                                <Line type="bump" dataKey="LASTMONTH" stroke="#ffdd00" dot={false} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={estiloContainerGrafico3}>
                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={consumo} margin={{ top: 24, right: 30, left: 40, bottom: 20 }} >
                                <text x="50%" y={10} textAnchor="middle" dominantBaseline="central" style={{ fill: 'white', fontSize: 18 }}>
                                    Consumo
                                </text>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis domain={[0, 5]} tick={{fill: 'white'}} label={{value:"Quantidade de Informações", offset:-2, position:"insideBottom" }}/>
                                <YAxis domain={([dataMin, dataMax]) => [Math.floor(dataMin - 1), Math.ceil(dataMax + 1)]} tick={{fill: 'white'}} label={{value:"Kilowatts/Hora (kWh)", angle:-90 , position:'insideLeft',style: { textAnchor: 'middle' }}} />
                                <Tooltip />
                                <Legend wrapperStyle={{color: 'white'}} verticalAlign="top"  height={44} />
                                <Line type="bump" dataKey="TODAY" stroke="#f5af33" dot={false} strokeWidth={2} />
                                <Line type="bump" dataKey="WEEK" stroke="#ffaa00" dot={false} strokeWidth={2} />
                                <Line type="bump" dataKey="MONTHNOW" stroke="#ffcc00" dot={false} strokeWidth={2} />
                                <Line type="bump" dataKey="LASTMONTH" stroke="#ffdd00" dot={false} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}>
                        <button className="bg-azul_mais_escuro flex items-center justify-center w-48 h-10 rounded-md" onClick={exportCSV}><IconDownload className="mr-1" /> Exportar CSV</button>
                    </div>
                    <div className={estiloContainerGrafico2}></div>
                </div>
            </div>
        </Pagina>
    )
} 