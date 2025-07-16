import { Pagina } from "../components/Pagina"
import { Cabecalho } from '../components/Cabecalho'
import { IconDownload } from "@tabler/icons-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useContext, useEffect, useState, useMemo } from "react"
import { DataContext } from "../context/DataContext"
import axios from "axios"

export function Tecnico() {
    const { data, adicionarDados, name, adicionarNomes } = useContext(DataContext)
    
    const estiloContainerGrafico = "bg-fundo_azul_escuro_elegante w-full md:w-1/2 lg:w-1/4 h-auto m-1 p-4 rounded-md border-b";
    const estiloContainerGrafico2 = "bg-fundo_azul_escuro_elegante w-[50vw] h-[25vh] m-1 p-2 rounded-md flex flex-row"
    const [larguraTela, setLarguraTela] = useState(window.innerWidth);

    
    useEffect(() => {
        const handleResize = () => setLarguraTela(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const tabelasSeparadas = useMemo(() => {
        return data.reduce((acc, item) => {
            const key = item.__tabela;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    }, [data]);

// potencia reativa

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

    const chartsConfig = [
        {
            title: "Potência Ativa",
            data: tabelasSeparadas["ACTIVEPOWER"] || [],    
            yLabel: "Watts (W)",
            yFormatter: (v) => Math.floor(v),
            lines: [
            { dataKey: "PHASEA", name: "Fase A", color: "#f5af33" },
            { dataKey: "PHASEB", name: "Fase B", color: "#ffaa00" },
            { dataKey: "PHASEC", name: "Fase C", color: "#ffcc00" },
            ],
        },
        {
            title: "Corrente",
            data: tabelasSeparadas["CURRENT"] || [],
            yLabel: "Ampere (A)",
            yFormatter: (v) => v,
            lines: [
            { dataKey: "PHASEA", name: "Fase A", color: "#f5af33" },
            { dataKey: "PHASEB", name: "Fase B", color: "#ffaa00" },
            { dataKey: "PHASEC", name: "Fase C", color: "#ffcc00" },
            ],
        },
        {
            title: "Tensão",
            data: tabelasSeparadas["VOLTAGE"] || [],
            yLabel: "Volts (V)",
            yFormatter: (v) => v,
            lines: [
            { dataKey: "PHASEA", name: "Fase A", color: "#f5af33" },
            { dataKey: "PHASEB", name: "Fase B", color: "#ffaa00" },
            { dataKey: "PHASEC", name: "Fase C", color: "#ffcc00" },
            ],
        },
        {
            title: "Fator Potência",
            data: tabelasSeparadas["POWERFACTOR"] || [],
            yLabel: "Sem unidade",
            yFormatter: (v) => v.toFixed(1),
            lines: [
            { dataKey: "PHASEA", name: "Fase A", color: "#f5af33" },
            { dataKey: "PHASEB", name: "Fase B", color: "#ffaa00" },
            { dataKey: "PHASEC", name: "Fase C", color: "#ffcc00" },
            ],
        },
        {
            title: "Potência Aparente",
            data: tabelasSeparadas["APPARENTPOWER"] || [],
            yLabel: "Volt-Ampere (VA)",
            yFormatter: (v) => Math.floor(v),
            lines: [
            { dataKey: "PHASEA", name: "Fase A", color: "#f5af33" },
            { dataKey: "PHASEB", name: "Fase B", color: "#ffaa00" },
            { dataKey: "PHASEC", name: "Fase C", color: "#ffcc00" },
            ],
        },
        {
            title: "Temperatura do Equipamento",
            data: tabelasSeparadas["EQUIPMENTTEMPERATURE"] || [],
            yLabel: "Celsius (C°)",
            yFormatter: (v) => Math.floor(v),
            lines: [
            { dataKey: "TPSD", name: "Temperatura", color: "#f5af33" },
            ],
        },
        {
            title: "Ângulo entre Tensões",
            data: tabelasSeparadas["ANGLEBETWEENVOLTAGES"] || [],
            yLabel: "Graus (°)",
            yFormatter: (v) => v.toFixed(1),
            lines: [
            { dataKey: "YUAUB", name: "Fase A e Fase B", color: "#f5af33" },
            { dataKey: "YUAUC", name: "Fase A e Fase C", color: "#ffaa00" },
            { dataKey: "YUBUC", name: "Fase B e Fase C", color: "#ffcc00" },
            ],
        },
        {
            title: "Ângulo entre Tensão e Corrente",
            data: tabelasSeparadas["ANGLEVOLTAGECURRENT"] || [],
            yLabel: "Graus (°)",
            yFormatter: (v) => v.toFixed(1),
            lines: [
            { dataKey: "PHASEA", name: "Fase A", color: "#f5af33" },
            { dataKey: "PHASEB", name: "Fase B", color: "#ffaa00" },
            { dataKey: "PHASEC", name: "Fase C", color: "#ffcc00" },
            ],
        },
        {
            title: "Frequência",
            data: tabelasSeparadas["FREQUENCY"] || [],
            yLabel: "Hertz (Hz)",
            yFormatter: (v) => Math.floor(v),
            lines: [
            { dataKey: "FREQ", name: "Frequência", color: "#f5af33" },
            ],
        },
        {
            title: "Geração",
            data: tabelasSeparadas["GENERATION"] || [],
            yLabel: "Kilowatts/Hora (kWh)",
            yFormatter: (v) => Math.floor(v),
            lines: [
            { dataKey: "TODAY", name: "Hoje", color: "#f5af33" },
            { dataKey: "WEEK", name: "Semana Atual", color: "#ffaa00" },
            { dataKey: "MONTHNOW", name: "Mês Atual", color: "#ffcc00" },
            { dataKey: "LASTMONTH", name: "Mês Anterior", color: "#ffdd00" },
            ],
        },
        {
            title: "Consumo",
            data: tabelasSeparadas["CONSUMPTION"] || [],
            yLabel: "Kilowatts/Hora (kWh)",
            yFormatter: (v) => Math.floor(v),
            lines: [
            { dataKey: "TODAY", name: "Hoje", color: "#f5af33" },
            { dataKey: "WEEK", name: "Semana Atual", color: "#ffaa00" },
            { dataKey: "MONTHNOW", name: "Mês Atual", color: "#ffcc00" },
            { dataKey: "LASTMONTH", name: "Mês Anterior", color: "#ffdd00" },
            ],
        },        
        {
            title: "Potência Reativa",
            data: tabelasSeparadas["REACTIVEPOWER"] || [],
            yLabel: "Volt-Ampere reativo (VAr)",
            yFormatter: (v) => Math.floor(v),
            lines: [
            { dataKey: "PHASEA", name: "Fase A", color: "#f5af33" },
            { dataKey: "PHASEB", name: "Fase B", color: "#ffaa00" },
            { dataKey: "PHASEC", name: "Fase C", color: "#ffcc00" },
            { dataKey: "PHASET", name: "Fase Total", color: "#ffdd00" },
            ],
        },        
    ];


    return (
        <Pagina>
            {larguraTela>=600 && <Cabecalho/>}
            <div className="w-full h-full flex flex-col bg-fundo_azul_claro_elegante ">
                <div className="flex flex-col lg:flex-row flex-wrap justify-around items-center gap-6 mb-6 mt-5">
                    {chartsConfig.map((chart, idx) => (
                        <div 
                        key={idx}
                        className={`${estiloContainerGrafico} `} 
                        >
                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart
                            data={chart.data}
                            margin={{ top: 24, right: 30, left: 40, bottom: 20 }}
                            >
                            <text
                                x="50%"
                                y={10}
                                textAnchor="middle"
                                dominantBaseline="central"
                                style={{ fill: "white", fontSize: 18 }}
                            >
                                {chart.title}
                            </text>

                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                domain={[0, 5]}
                                tick={{ fill: "white" }}
                                label={{
                                value: "Quantidade de Informações",
                                offset: -2,
                                position: "insideBottom",
                                }}
                            />
                            <YAxis
                                domain={([dataMin, dataMax]) => [
                                Math.floor(dataMin - 1),
                                Math.ceil(dataMax + 1),
                                ]}
                                tick={{ fill: "white" }}
                                tickFormatter={chart.yFormatter}
                                label={{
                                value: chart.yLabel,
                                angle: -90,
                                position: "insideLeft",
                                style: { textAnchor: "middle" },
                                }}
                            />

                            {chart.lines.map((line, lineIdx) => (
                                <Line
                                key={lineIdx}
                                type="linear"
                                dataKey={line.dataKey}
                                name={line.name}
                                stroke={line.color}
                                dot={false}
                                strokeWidth={2}
                                />
                            ))}

                            <Tooltip />
                            <Legend
                                wrapperStyle={{ color: "white" }}
                                verticalAlign="top"
                                height={44}
                            />
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                    ))}
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