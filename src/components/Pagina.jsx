
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Pagina(props) {
  const opcoes = {
    1: "Tempo Real",
    2: "Configuração",
    3: "Técnico",
    4: "Relatórios",
  }

  const [estado, setEstado] = useState(1)
  const navigate = useNavigate()

  function handleChange(event) {
    const value = event.target.value
    setEstado(value)
  }

  return (
    <div className={`flex flex-col flex-1`}>
      <header
<<<<<<< HEAD
        className={`flex flex-row justify-start items-center pl-10 px-5 h-16 border-b bg-azul_escuro text-branco`}
=======
        className={`flex flex-row justify-center items-center px-5 h-16 border-b bg-azul_mais_escuro text-branco`}
>>>>>>> da2f818c6b59376560c4cfc2ae2b4a9a1182b0f5
      >
        <select
          value={estado}
          onChange={handleChange}
          className="rounded-md p-0 bg-azul_mais_escuro text-branco"
        >
          <option value={1}>{opcoes[1]}</option>
          <option value={2}>{opcoes[2]}</option>
          <option value={3}>{opcoes[3]}</option>
          <option value={4}>{opcoes[4]}</option>
        </select>
      </header>
      <main className={`flex flex-col items-start flex-1 text-base text-branco`}>
        {props.children}
      </main>
    </div>
    )
  }

