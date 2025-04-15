import { Pagina } from "../components/Pagina"
import { Cabecalho } from '../components/Cabecalho'
import { useState } from "react"

export function Configuracao(){
    const estiloBotao = "bg-azul_bebe rounded-md w-32 h-12 m-5 text-cinza_escuro hover:bg-azul_claro hover:text-branco "
    const estiloLi = "m-3 text-fonte_elegante_amarelo"

    const [nome, setNome] = useState("João Reni")
    const [endereco, setEndereco] = useState("Engenheiro Beltrão")
    const [empresa, setEmpresa] = useState("Educere")

    const [modoEdicao, setModoEdicao] = useState(false)

    const nomeAparelhos = ["Placa Solar", "Gerador"]
    const [aparelhos, setAparelhos] = useState(nomeAparelhos)
    const [quantidadeAparelhos, setQuantidadeAparelhos] = useState(nomeAparelhos.length)

    const estiloContainerGrafico = "bg-fundo_azul_escuro_elegante w-1/2 h-auto m-1 p-4 rounded-md flex flex-col justify-center items-center"

    function editarNome(event) {
        setNome(event.target.value)   
    }
    function editarEndereco(event) {
        setEndereco(event.target.value)   
    }
    function editarEmpresa(event) {
        setEmpresa(event.target.value)   
    }

    function alternarModoEdicao() {
        setModoEdicao(!modoEdicao)
    }

    return (
        <Pagina>
            <Cabecalho/>
            <div className="w-full h-screen flex flex-col bg-fundo_azul_claro_elegante">
                <div className="flex flex-row justify-normal">
                    <div className={estiloContainerGrafico}>
                        <div className="w-full h-96 flex flex-col justify-center items-center">
                            <ul className="p-4">
                                <li className={estiloLi}>
                                    Nome:     
                                    <input 
                                        type="text" 
                                        value={nome} 
                                        onChange={editarNome} 
                                        disabled={!modoEdicao}
                                        className={`w-64 p-1 bg-fundo_azul_escuro_elegante ${modoEdicao ? 'border border-white' : 'opacity-70'}`}
                                    />
                                </li>
                                <li className={estiloLi}>
                                    Endereço: 
                                    <input 
                                        type="text" 
                                        value={endereco} 
                                        onChange={editarEndereco} 
                                        disabled={!modoEdicao}
                                        className={`w-64 p-1 bg-fundo_azul_escuro_elegante ${modoEdicao ? 'border border-white' : 'opacity-70'}`}
                                    />
                                </li>
                                <li className={estiloLi}>
                                    Empresa:  
                                    <input 
                                        type="text" 
                                        value={empresa} 
                                        onChange={editarEmpresa} 
                                        disabled={!modoEdicao}
                                        className={`w-64 p-1 bg-fundo_azul_escuro_elegante ${modoEdicao ? 'border border-white' : 'opacity-70'}`}
                                    />
                                </li>
                            </ul>
                            <button 
                                onClick={alternarModoEdicao}
                                className={estiloBotao}
                            >
                                {modoEdicao ? "Salvar" : "Editar"}
                            </button>
                        </div>
                    </div>

                    <div className={estiloContainerGrafico}>
                        <div className="w-full h-min flex flex-col justify-center items-center text-3xl text-fonte_elegante_amarelo">
                            Nome dos Aparelhos: {aparelhos.join(', ')}
                            <br /> <br /> 
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
