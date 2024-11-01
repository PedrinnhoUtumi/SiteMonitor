import { Pagina } from "./Pagina"


export function TempoReal(){
    const estiloBotao = "bg-azul_bebê rounded-md w-32 h-12 m-5 text-cinza_escuro hover:bg-azul_escuro hover:text-branco "


    return (
        <Pagina titulo = "Tempo Real">
            <div className="bg-branco w-screen h-20 flex justify-around ">
                <div className="bg-azul_claro m-1 flex items-center rounded-md">
                    <button className={estiloBotao}>Tempo Real</button>
                    <button className={estiloBotao}>Técnico</button>
                    <button className={estiloBotao}>Relatórios</button>
                    <button className={estiloBotao}>Configurações</button>
                </div>
            </div>
            <div className="bg-azul_claro w-screen h-screen flex flex-col m-0">
                    
            </div>
        </Pagina>
    )
} 