import { Pagina } from "../components/Pagina";
import { Cabecalho } from "../components/Cabecalho";

export function TempoReal() {
    const estiloContainerGrafico = "bg-azul_claro w-1/3 h-48 m-1 rounded-md";
    const estiloContainerGrafico2 = "bg-azul_claro w-1/3 h-36 m-1 rounded-md";
    const estiloContainerGrafico3 = "bg-azul_claro w-1/2 h-[50vh] m-1 rounded-md";
    const estiloTitulo = "bg-azul_claro h-16 flex justify-center items-center text-2xl m-1 rounded-md font-bold";

    return (
        <Pagina>
            <Cabecalho />
            <div className="w-full h-full flex flex-col">
                <header className={estiloTitulo}>
                    <h1 className=" text-red-500">Tensão [V]</h1>
                </header>

                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico}>
                    </div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="text-orange-500">Corrente [A]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="text-amber-500">Potência Ativa [W]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="text-yellow-500">Consumo [kWh]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                </div>

                <header className={estiloTitulo}>
                    <h1 className="drop-shadow-xl text-green-400">Geração [kWh]</h1>
                </header>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                    <div className={estiloContainerGrafico2}></div>
                </div>

                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico3}></div>
                    <div className={estiloContainerGrafico3}></div>
                </div>
            </div>
        </Pagina>
    );
}
