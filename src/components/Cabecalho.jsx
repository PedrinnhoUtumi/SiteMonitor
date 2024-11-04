

export function Cabecalho(){
    const estiloBotao = "bg-azul_bebê rounded-md w-72 h-12 m-5 text-cinza_escuro hover:bg-azul_escuro hover:text-branco "

    
    return (
        <div className="bg-branco min-w-full h-20 flex justify-evenly ">
            <div className="bg-azul_claro m-1 w-full flex justify-evenly items-center rounded-md">

                <button className={estiloBotao}>Tempo Real</button>
                <button className={estiloBotao}>Técnico</button>
                <button className={estiloBotao}>Relatórios</button>
                <button className={estiloBotao}>Configurações</button>
   
            </div>
        </div>
    )
} 