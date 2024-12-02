import { Pagina } from "../components/Pagina"
import { Cabecalho } from '../components/Cabecalho'
import { useState } from "react"


export function Configuracao(){
    //const estiloBotao = "bg-azul_bebe rounded-md w-32 h-12 m-5 text-cinza_escuro hover:bg-azul_escuro hover:text-branco "

    const [nome, setNome] = useState("João Reni")
    const [endereco, setEndereco] = useState("Engenheiro Beltrão")
    const [empresa, setEmpresa] = useState("Educere")
    
    var nomeAparelhos = ["Placa Solar", "Gerador"]
    const [aparelhos, setAparelhos] = useState(nomeAparelhos)
    const [quantidadeAparelhos, setQuantidadeAparelhos] = useState(nomeAparelhos.length)

    // const estiloContainerGrafico = "bg-azul_escuro w-1/3 h-48 m-1 p-4 rounded-md"
    const estiloContainerGrafico = "bg-azul_escuro w-1/2 h-screen m-1 p-4 rounded-md"

    function editarNome(event) {
        setNome(event.target.value)   
    }
    function editarEndereco(event) {
        setEndereco(event.target.value)   
    }
    function editarEmpresa(event) {
        setEmpresa(event.target.value)   
    }
    

    return (
        <Pagina>
            <Cabecalho/>
            <div className="w-full h-screen flex flex-col">
                <div className="flex flex-row justify-normal">
                    <div className={estiloContainerGrafico}>
                        <div className="w-full h-full flex flex-col justify-center items-center ">
                            <ul className="p-4 ">
                                <li>
                                    Nome:     <input type="text" value={nome} onChange={editarNome} className="w-64 p-1 bg-azul_escuro"/>
                                </li>
                                <li>
                                    Endereço: <input type="text" value={endereco} onChange={editarEndereco} className="w-64 p-1 bg-azul_escuro" />
                                </li>
                                <li>
                                    Empresa:  <input type="text" value={empresa} onChange={editarEmpresa} className="w-64 p-1 bg-azul_escuro" />

                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={estiloContainerGrafico}>
                        <div className="w-full h-full flex flex-col justify-center items-center text-3xl text-red-600 glow">
                            Nome dos Aparelhos: {aparelhos.join(', ')}
                            <br />
                            Quantidade de Aparelhos: {quantidadeAparelhos}
                        </div>
                    </div>

                    <div className={estiloContainerGrafico}>
                        <div>
                            
                        </div>
                    </div> 
                </div>
            </div>
        </Pagina>
    )
} 