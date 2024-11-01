export function Pagina(props) {
    return (
      <div className={`flex flex-col flex-1`}>
        <header
          className={`
              flex flex-col justify-center items-center
              px-5 h-16
              border-b border-custom-gray2
              bg-azul_escuro text-branco
          `}
        >
          <h1 className="text-xl font-black">{props.titulo}</h1>
        </header>
        <main
          className={`
            flex flex-col items-start flex-1
            bg-custom-gray2 
            text-base text-branco
            `}
        >
            {props.children}
        </main>
      </div>
    );
  }