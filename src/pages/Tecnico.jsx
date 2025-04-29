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
    const { data, adicionarDados } = useContext(DataContext)
    // useEffect(() => {
    //     const fetchMachbase = async () => {
    //       try {
    //         const response = await fetch("https://servermagvia.onrender.com/api")
    //         if (!response.ok) {
    //           throw new Error("Erro ao buscar os usuários")
    //         }
      
    //         const json = await response.json()
    //         const { columns, rows } = json.message.data
    //         const dadosFormatados = rows.map(linha => {
    //           const obj = {}
    //           columns.forEach((coluna, index) => {
    //             obj[coluna] = linha[index]
    //           })
    //           return obj
    //         })
      
    //         adicionarDados(dadosFormatados)
    //       } catch (error) {
    //         console.log(error.message)
    //       }
    //     }
      
    //     fetchMachbase()
    //   }, [])
    
    const estiloContainerGrafico = "bg-fundo_azul_escuro_elegante w-[30vw] h-[40vh] m-1 p-4 rounded-md border-b"
    const estiloContainerGrafico2 = "bg-fundo_azul_escuro_elegante w-[50vw] h-[25vh] m-1 p-2 rounded-md flex flex-row"
    const [dados, setDados] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <div className="w-full h-full flex flex-col bg-fundo_azul_claro_elegante">
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico}>

                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="NAME" />
                                <YAxis />
                                <Line type="bump" dataKey="NAME" stroke="#f5af33" dot={false} strokeWidth={2} />
                                <Tooltip />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={estiloContainerGrafico}>
                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="TIME" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="bump" dataKey="TIME" stroke="#f5af33" dot={false} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={estiloContainerGrafico}>
                        <ResponsiveContainer width="90%" height={380}>
                            <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="VALUE" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="bump" dataKey="VALUE" stroke="#f5af33" dot={false} strokeWidth={2} />
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
                                <Line type="bump" dataKey="pedro" stroke="#f5af33" dot={false} strokeWidth={2} />
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