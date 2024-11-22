import { NavLink } from "react-router-dom"

export function Cabecalho(){
    const estiloBotao = "bg-azul_bebê rounded-md w-72 h-12 m-5 text-cinza_escuro hover:bg-azul_escuro hover:text-branco flex flex-row justify-center items-center"
    

    return (
        <div className="bg-branco min-w-full h-20 flex justify-evenly ">
            <nav className="bg-azul_claro m-1 w-full flex justify-evenly items-center rounded-md">
                <NavLink to="/TempoReal" className={estiloBotao}>
                    Tempo Real
                </NavLink>
               
                <NavLink to="/Configuracao" className={estiloBotao}>
                    Configurações
                </NavLink>
               
                <NavLink to="/Relatorios" className={estiloBotao}>
                    Relatório
                </NavLink>
               
                <NavLink to="/Tecnico" className={estiloBotao}>
                    Técnico
                </NavLink>
            </nav>
        </div>
    )
} 