import bcrypt from "bcryptjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

export function Cadastro() {

  const { data, adicionarDados, name, adicionarNomes, email, adicionarEmail } = useContext(DataContext); 
  const [usuario, setUsuario] = useState([]);
  const [senha, setSenha] = useState("");
  const [senhaHash, setSenhaHash] = useState("");
  const navigate = useNavigate();
  const [novoUsuario, setNovoUsuario] = useState({ nome: "", email: "", senha: "", role: "", account: "" });



  
  const verificarLogin = async () => {
    const usuarioEncontrado = usuario.find((user) => user.email === email);
    console.log("Email digitado:", email);
    if (usuarioEncontrado) {
      console.log("Usuário encontrado:", usuarioEncontrado);
      
      const isCorrect = await bcrypt.compare(senha, usuarioEncontrado.senha);
  
      if (isCorrect) {  
        const dadosUsuario = {
          email: usuarioEncontrado.email,
          nome: usuarioEncontrado.nome,
          id: usuarioEncontrado.id,
          role: usuarioEncontrado.role,
          loginAt: new Date().toISOString(),
        };
  
        adicionarNomes(usuarioEncontrado.nome);
        localStorage.setItem("usuario", JSON.stringify(dadosUsuario));
        localStorage.setItem("usuario_logado", "true");
  
        navigate("/TempoReal", { replace: true });
      } else {
        alert("Senha incorreta!");
      }
    } else {
      alert("Usuário ou senha inválidos!");
    }
  };
  

  function temMaiusculas(texto) {
    return /[A-Z]/.test(texto);
  }

  function temNumeros(texto) {
    return /[0-9]/.test(texto);
  }

  function temEspacos(texto) {
    return texto.includes(" ");
  }
  const opcoesRole = {
    1: "adm",
    2: "Usuário",
   
  };
  
  async function criarUsuario(e) {
    e.preventDefault();
    try {
      if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.role || !novoUsuario.senha || !novoUsuario.account) {
        alert("Preencha todos os campos!")
        return
      }
      
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(novoUsuario.senha, salt);
      const usuarioParaEnviar = {
        ...novoUsuario,
        senha: hash,
      };
      console.log(novoUsuario)

      const response = await fetch(`https://servermagvia.onrender.com/api/MYUSER`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioParaEnviar),
      })

      if (!response.ok) {
          throw new Error(`Erro ao criar usuário: ${response.statusText}`)
      }


      const dados = await response.json()
      console.log(dados)


      setNovoUsuario({ nome: "", email: "", senha: "", role: "", account: "" })
      } catch (error) {
      console.error(error)
    }
  }

  return (
    <form method="POST" className="bg-gradient-to-r from-azul_bebe to-azul_escuro h-screen flex items-center justify-center">
      <div className="caixaLogin w-1/4 h-3/5 flex flex-col justify-center items-center bg-white bg-opacity-10 rounded-3xl shadow-lg p-5 backdrop-blur-sm">
        <img
          src="../../usuario.png"
          alt="Ícone de usuário"
          className="w-32 relative"
        />

        <div className="relative w-3/4 mt-5">
          <input
            type="email"
            placeholder="Email"
            required
            value={novoUsuario.email}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
            className="w-full py-2 pl-10 pr-4 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />
          <img
            src="../../usuarioGmail.png"
            alt="Ícone de email"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>


        <div className="relative w-3/4 mt-5">
          <input
            type="password"
            placeholder="Senha"
            required
            value={novoUsuario.senha}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
            className="w-full py-2 pl-10 pr-4 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />
          <img
            src="../../cadeado.png"
            alt="Ícone de senha"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>
        <div className="relative w-3/4 mt-5">
          <input
            type="text"
            placeholder="Nome de usuário"
            required
            value={novoUsuario.nome}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
            className="w-full py-2 pl-10 pr-4 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />
          <img
            src="../../cadeado.png"
            alt="Ícone de senha"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>
        <div className="relative w-3/4 mt-5">
          <input
            type="text"
            placeholder="Cargo"
            required
            value={novoUsuario.role}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, role: e.target.value })}
            className="w-full py-2 pl-10 pr-4 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />
          <img
            src="../../cadeado.png"
            alt="Ícone de senha"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>

        <div className="relative w-3/4 mt-5 flex justify-center items-center m-5">
          <select name="selectRole" id="selectRole" className="bg-transparent bg-roxo rounded-md" value={novoUsuario.account} onChange={(e) => setNovoUsuario({ ...novoUsuario, account: e.target.value })}>
            <option value="" disabled selected hidden>Selecione Função</option>
            <option value={opcoesRole[1]}>Administrador</option>
            <option value={opcoesRole[2]}>Usuário</option>
          </select> 
        </div>

        <button
          onClick={criarUsuario}
          className="bg-cinza text-white rounded-full w-1/2 py-2 mt-5 hover:bg-roxo hover:opacity-70 font-[Bagel Fat One]"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}
