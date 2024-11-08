
export function Pagina(props) {
  const opcoes = {
    1: "Tempo Real",
    2: "Configuração",
    3: "Técnico",
    4: "Relatórios",
  };

  return (
    <div className={`flex flex-col flex-1`}>
      <header
        className={`flex flex-row justify-center items-center px-5 h-16 border-b bg-azul_escuro text-branco`}
      >
        <select
          className="rounded-md p-0 bg-azul_escuro"
        >
          <option value={1}>{opcoes[1]}</option>
          <option value={2}>{opcoes[2]}</option>
          <option value={3}>{opcoes[3]}</option>
          <option value={4}>{opcoes[4]}</option>
        </select>
      </header>
      <main
        className={`flex flex-col items-start flex-1 text-base text-branco`}
      >
        {props.children} 
      </main>
    </div>
  );
}
