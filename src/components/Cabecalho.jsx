
import { NavLink } from "react-router-dom";

export function Cabecalho() {
    const estiloBotao =
        "flex-1 min-w-[150px] px-6 py-3 bg-fundo_azul_escuro_elegante rounded-md text-branco hover:bg-azul_bebe hover:text-fundo_azul_escuro_elegante flex justify-center items-center text-base font-medium whitespace-nowrap";

return (
    <header className="w-full bg-fundo_azul_claro_elegante">
        <div className="h-24 flex items-center justify-center w-full px-4">
            <nav className="hidden min-[468px]:flex w-full max-w-screen-xl mx-auto gap-6">
                <NavLink to="/TempoReal" className={estiloBotao}>
                Tempo Real
                </NavLink>

                <NavLink to="/Tecnico" className={estiloBotao}>
                Técnico
                </NavLink>

                <NavLink to="/User" className={estiloBotao}>
                Usuário
                </NavLink>

                {/* <NavLink to="/Configuracao" className={estiloBotao}>
                Configurações
                </NavLink> */}
            </nav>
        </div>
    </header>
);
}
