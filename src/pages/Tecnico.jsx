import { Pagina } from "../components/Pagina"
import { Cabecalho } from '../components/Cabecalho'
import { IconCsv, IconDownload } from "@tabler/icons-react";


export function Tecnico(){
    const estiloContainerGrafico = "bg-azul_claro w-[30vw] h-[40vh] m-1 rounded-md";
    const estiloContainerGrafico2 = "bg-azul_claro w-[50vw] h-[25vh] m-1 p-2 rounded-md flex flex-row";

    return (
        <Pagina>
            <Cabecalho/>
            <div className="w-full h-full flex flex-col">
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                </div>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                </div>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                    <div className={estiloContainerGrafico}></div>
                </div>
                <div className="flex flex-row justify-around">
                    <div className={estiloContainerGrafico2}>
                        <IconDownload/> exportar CSV
                        {/* <input type="file" /> */}
                    </div>
                    <div className={estiloContainerGrafico2}></div>
                </div>
            </div>
        </Pagina>
    )
} 