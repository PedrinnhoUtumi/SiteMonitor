import { NavLink } from "react-router-dom"

export function Cabecalho(){
    const estiloBotao = "bg-fundo_azul_escuro_elegante rounded-md w-72 h-12 m-5 text-branco hover:bg-azul_bebe hover:text-fundo_azul_escuro_elegante flex flex-row justify-center items-center"
    

    return (
        <div className="bg-fundo_azul_claro_elegante min-w-full h-20 flex justify-evenly ">

            <nav className="bg-fundo_azul_claro_elegante m-1 w-full flex justify-evenly items-center rounded-md">
                <NavLink to="/TempoReal" className={estiloBotao}>
                    Tempo Real
                </NavLink>
            
                <NavLink to="/Tecnico" className={estiloBotao}>
                    Técnico
                </NavLink>
            
                <NavLink to="/Relatorios" className={estiloBotao}>
                    Relatório
                </NavLink>

                <NavLink to="/Configuracao" className={estiloBotao}>
                    Configurações
                </NavLink>
            </nav>

        </div>

    )
} 