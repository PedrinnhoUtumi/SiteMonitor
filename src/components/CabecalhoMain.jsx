export function CabecalhoMain(){
    const opcoes = {
        1: "Tempo Real",
        2: "Configuarcao",
        3: "Tecnica",
        4: "Relatorios",
    }
    function tela () {   
        switch(opcoes) {
            case 1:
            case 2:
            case 3:
            case 4:
        }
    }
    return (
        <div className="bg-red-500">
            <select name="" id="">
                <option value={opcoes[1]} onClick={tela}>Tempo Real</option>
                <option value={opcoes[2]} onClick={tela}>Configuração</option>
                <option value={opcoes[3]} onClick={tela}>Tecnica</option>
                <option value={opcoes[4]} onClick={tela}>relatorios</option>
            </select>
            <select name="dispositivo" id="Dispos">
                <option value=""></option>
            </select>
           
        </div>
    )
} 