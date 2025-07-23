import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import logoEducere from '/educere-removebg-preview.png';
import cracha from "../assets/envelope.png";
import olhoAberto from "/eye.png";
import olhoFechado from "/hidden.png";
import emailIcon from '../assets/email.png'
import senhaNew from '../assets/padlock.png'

export default function Cadastro() {

  const { data, adicionarDados, name, adicionarNomes, email, adicionarEmail } = useContext(DataContext); 
  const [usuario, setUsuario] = useState([]);
  const [senha, setSenha] = useState("");
  const [senhaHash, setSenhaHash] = useState("");
  const navigate = useNavigate();
  const [novoUsuario, setNovoUsuario] = useState({ nome: "", email: "", senha: "", role: "", account: "" });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const myUser = data.filter((item) => item.__tabela === "MYUSER");
  
  const opcoesRole = {
    1: "Administrador",
    2: "Usuário",
  };
  
  useEffect(() => {
    const listaUsuarios = myUser.map((usuario) => ({
      id: usuario.ID,
      senha: usuario.SENHA,
      nome: usuario.NAME,
      email: usuario.EMAIL,
      role: usuario.ROLE,
      account: usuario.ACCOUNT,
    }));

    setUsuario(listaUsuarios);
    
  }, [data]);
  const verificarUsuarioCadastrado = async () => {
    const usuarioEncontrado = usuario.find((user) => user.email === novoUsuario.email);
    console.log("usuarioEncontrado", usuarioEncontrado);
    
    if (usuarioEncontrado) {
      return true
    }
    return false
  };


  async function criarUsuario(e) {
    e.preventDefault();
    try {
      if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.role || !novoUsuario.senha || !novoUsuario.account) {
        alert("Preencha todos os campos!")
        return
      }

      const usuarioExistente = await verificarUsuarioCadastrado();
      console.log("usuarioExistente", usuarioExistente);
      
      if (usuarioExistente) {
        alert("Usuário já cadastrado!");
        return;
      }

      const usuarioParaEnviar = {
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        senha: novoUsuario.senha,
        role: novoUsuario.role,
        account: novoUsuario.account
      };

      console.log("usuarioParaEnviar", usuarioParaEnviar);

      const response = await fetch(`http://192.168.10.250:3000/api/MYUSER`, {
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

      setNovoUsuario({ nome: "", email: "", senha: "", role: "", account: "" })
      } catch (error) {
      console.log("Erro ao criar usuário: ", error)
    }
  }

  return (
    <form method="POST" className="bg-gradient-to-r from-fundo_azul_claro_elegante to-azul_escuro h-screen flex items-center justify-center">
      <img
              src={logoEducere}
              alt="logoEducere"
              className="absolute w-32 max-sm:w-32 z-0
                        top-2 right-2
                        max-sm:top-4 max-sm:left-1/2 
                        max-sm:transform max-sm:-translate-x-1/2 
                        max-sm:translate-y-0" 
                        
            />


      <div className="caixaLogin max-sm:w-2/3 sm:w-1/2 lg:w-1/4 h-4/7 flex flex-col justify-center items-center bg-white bg-opacity-20 rounded-3xl shadow-lg backdrop-blur-sm pt-32">
        <img
          src="../../usuario.png"
          alt="Ícone de usuário"
          className="max-sm:w-32 sm:w-32 lg:w-32 absolute top-2 "
        />
        <div className="relative w-3/4 mt-5">
          <input
            type="text"
            placeholder="Nome de usuário"
            required
            value={novoUsuario.nome}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
            className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />
          <img
            src="../../usuarioGmail.png"
            alt="Ícone de email"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>

        <div className="relative w-3/4 mt-5">
          <input
            type="email"
            placeholder="Email"
            required
            value={novoUsuario.email}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
            className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />
          <img
            src={emailIcon}
            alt="Ícone de email"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>


        <div className="relative w-3/4 mt-5">
          <input
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="Senha"
            required
            value={novoUsuario.senha}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })}
            className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />

          <img
            src={senhaNew}
            alt="Ícone de senha"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />

          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <img
              src={mostrarSenha ? olhoAberto : olhoFechado}
              alt="Mostrar ou ocultar senha"
              className="w-5 h-5"
            />
          </button>
        </div>
        
        <div className="relative w-3/4 mt-4">
          <input
            type="text"
            placeholder="Cargo"
            required
            value={novoUsuario.role}
            onChange={(e) => setNovoUsuario({ ...novoUsuario, role: e.target.value })}
            className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />
          <img
            src= {cracha}
            alt="Ícone de senha"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>

        <div className="relative w-3/4 mt-5 flex justify-center items-center m-5">
          <select
            name="selectRole"
            id="selectRole"
            className="bg-transparent bg-roxo rounded-md"
            value={novoUsuario.account}
            onChange={(e) =>
              setNovoUsuario({ ...novoUsuario, account: e.target.value })
            }
          >
            {/* Aqui apenas desabilitamos e escondemos a opção padrão */}
            <option value="" disabled hidden>
              Atua como:
            </option>
            <option value={opcoesRole[1]}>Administrador</option>
            <option value={opcoesRole[2]}>Usuário</option>
          </select>
        </div>

        <button
          onClick={criarUsuario}
          className="bg-cinza text-white rounded-full w-1/2 py-2 mb-2 hover:bg-roxo hover:opacity-70 font-[Bagel Fat One]"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}
