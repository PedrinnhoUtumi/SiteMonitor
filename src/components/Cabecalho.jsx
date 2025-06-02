// import { NavLink } from "react-router-dom"

// export function Cabecalho() {
//     const estiloBotao = "flex-1 px-4 py-2 bg-fundo_azul_escuro_elegante rounded-md text-branco hover:bg-azul_bebe hover:text-fundo_azul_escuro_elegante flex justify-center items-center text-sm whitespace-nowrap"

//     return (
//         <div className="bg-fundo_azul_claro_elegante w-full h-20 flex items-center">
//             <nav className="flex w-full max-w-screen-xl mx-auto px-4 gap-4">
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
    const estiloBotao = "flex-1 min-w-[150px] px-6 py-3 bg-fundo_azul_escuro_elegante rounded-md text-branco hover:bg-azul_bebe hover:text-fundo_azul_escuro_elegante flex justify-center items-center text-base font-medium whitespace-nowrap"

    return (
        <div className="bg-fundo_azul_claro_elegante w-full h-24 flex items-center">
            <nav className="flex w-full max-w-screen-xl mx-auto px-4 gap-6">
                <NavLink to="/TempoReal" className={estiloBotao}>
                    Tempo Real
                </NavLink>

                <NavLink to="/Tecnico" className={estiloBotao}>
                    Técnico
                </NavLink>

                <NavLink to="/Relatorio" className={estiloBotao}>
                    Relatório
                </NavLink>

                <NavLink to="/Configuracao" className={estiloBotao}>
                    Configurações
                </NavLink>
            </nav>
        </div>
    )
}
