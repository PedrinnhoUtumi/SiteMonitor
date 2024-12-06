import { Pagina } from "../components/Pagina"
import { Cabecalho } from '../components/Cabecalho'
import { IconDownload } from "@tabler/icons-react"
// import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from "react"
import axios from "axios"
// import { useEffect, useState } from "react"

export const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400, pedro: 1000, anta: 1233 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210, pedro: 1100 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290, pedro: 1200 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000, pedro: 1300 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181, pedro: 1400 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500, pedro: 1500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100, pedro: 1600 },
    { name: 'Ago', uv: 3490, pv: 4300, amt: 2100, pedro: 1700 },
    { name: 'Set', uv: 3490, pv: 4300, amt: 2100, pedro: 1800 },
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400, pedro: 1000 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210, pedro: 1100 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290, pedro: 1200 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000, pedro: 1300 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181, pedro: 1400 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500, pedro: 1500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100, pedro: 1600 },
    { name: 'Ago', uv: 3490, pv: 4300, amt: 2100, pedro: 1700 },
    { name: 'Set', uv: 3490, pv: 4300, amt: 2100, pedro: 1800 },
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400, pedro: 1000 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210, pedro: 1100 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290, pedro: 1200 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000, pedro: 1300 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181, pedro: 1400 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500, pedro: 1500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100, pedro: 1600 },
    { name: 'Ago', uv: 3490, pv: 4300, amt: 2100, pedro: 1700 },
    { name: 'Set', uv: 3490, pv: 4300, amt: 2100, pedro: 1800 },
]



export function Tecnico() {
    const estiloContainerGrafico = "bg-azul_escuro w-[30vw] h-[40vh] m-1 p-4 rounded-md"
    const estiloContainerGrafico2 = "bg-azul_escuro w-[50vw] h-[25vh] m-1 p-2 rounded-md flex flex-row"
    const [dados, setDados] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Fazendo a requisição para o servidor Node.js
        axios.post('http://localhost:1883/api/machbase')  // Requisição para o back-end Node.js
            .then((response) => {
                setDados(response.data);  // Armazena os dados no estado
                setLoading(false);  // Marca que o carregamento foi concluído
            })
            .catch((error) => {
                setError('Erro ao carregar dados');  // Armazena o erro no estado
                setLoading(false);  // Marca que o carregamento foi concluído
            });
    }, []);




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
            <Cabecalho />
            <div className="w-full h-full flex flex-col">
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico}>

                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Line type="bump" dataKey="pv" stroke="#2C4F75" dot={false} strokeWidth={2} />
                                <Tooltip />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={estiloContainerGrafico}>
                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="bump" dataKey="uv" stroke="#2C4F75" dot={false} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={estiloContainerGrafico}>
                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="bump" dataKey="amt" stroke="#2C4F75" dot={false} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={estiloContainerGrafico}>
                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="bump" dataKey="pedro" stroke="#2C4F75" dot={false} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico}>                        
                            <pre>{JSON.stringify(dados, null, 2)}</pre>
                    </div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                </div>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
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