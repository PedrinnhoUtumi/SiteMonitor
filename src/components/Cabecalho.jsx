// import { NavLink } from "react-router-dom"

// export function Cabecalho(){
//     const estiloBotao = "bg-fundo_azul_escuro_elegante rounded-md w-72 h-12 m-5 text-branco hover:bg-azul_bebe hover:text-fundo_azul_escuro_elegante flex flex-row justify-center items-center max-sm:text-center"
    

//     return (
//         <div className="bg-fundo_azul_claro_elegante min-w-full h-20 flex justify-evenly max-sm:w-full max-md:w-full max-lg:w-full">

//             <nav className="bg-fundo_azul_claro_elegante m-1 w-full flex justify-evenly items-center rounded-md">
//                 <NavLink to="/TempoReal" className={estiloBotao}>
//                     Tempo Real
//                 </NavLink>
            
//                 <NavLink to="/Tecnico" className={estiloBotao}>
//                     Técnico
//                 </NavLink>
            
//                 <NavLink to="/Relatorios" className={estiloBotao}>
//                     Relatório
//                 </NavLink>

//                 <NavLink to="/Configuracao" className={estiloBotao}>
//                     Configurações
//                 </NavLink>
//             </nav>

//         </div>

//     )
// } 

import { NavLink } from "react-router-dom"

export function Cabecalho() {
    const estiloBotao = "flex-1 px-4 py-2 bg-fundo_azul_escuro_elegante rounded-md text-branco hover:bg-azul_bebe hover:text-fundo_azul_escuro_elegante flex justify-center items-center text-sm whitespace-nowrap"

    return (
        <div className="bg-fundo_azul_claro_elegante w-full h-20 flex items-center">
            <nav className="flex w-full max-w-screen-xl mx-auto px-4 gap-4">
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
