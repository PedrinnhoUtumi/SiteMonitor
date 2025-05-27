import bcrypt from "bcryptjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import logoEducere from '../assets/educere-removebg-preview.png';
import olhoAberto from "../assets/eye.png";
import olhoFechado from "../assets/hidden.png";

export function Login() {
  const { data, adicionarDados, name, adicionarNomes, email, adicionarEmail } = useContext(DataContext); // Importa o contexto de dados
  const [usuario, setUsuario] = useState([]);
  const [senha, setSenha] = useState("");
  const [senhaHash, setSenhaHash] = useState("");
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  let nomeUsuario;

  const myUser = data.filter((item) => item.__tabela === "MYUSER");

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
    console.log("Lista de usuários:", listaUsuarios);
    
  }, [data]);
  
  const verificarLogin = async () => {
    const usuarioEncontrado = usuario.find((user) => user.email === email);
    console.log("Email digitado:", email);
    if (usuarioEncontrado) {
      console.log("Usuário encontrado:", usuarioEncontrado);
      
      // Comparar a senha digitada com a hash armazenada no banco
      const isCorrect = await bcrypt.compare(senha, usuarioEncontrado.senha);
  
      if (isCorrect) {  
        const dadosUsuario = {
          email: usuarioEncontrado.email,
          nome: usuarioEncontrado.nome,
          id: usuarioEncontrado.id,
          role: usuarioEncontrado.role,
          account: usuarioEncontrado.account,
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

  return (
    <div className="bg-gradient-to-r from-fundo_azul_claro_elegante to-azul_escuro h-screen flex items-center justify-center">
      <img
        src={logoEducere}
        alt="logoEducere"
        className="absolute w-32 max-sm:w-32 z-0
                  top-[2%] right-2
                  max-sm:top-4 max-sm:left-1/2 
                  max-sm:transform max-sm:-translate-x-1/2 
                  max-sm:translate-y-0" 
                  
      />
      <div className="caixaLogin max-sm:w-2/3 sm:w-1/2 lg:w-1/4 h-3/5 flex flex-col justify-center items-center bg-white bg-opacity-20 rounded-3xl shadow-lg backdrop-blur-sm pt-32" >
        <img
          src="../../usuario.png"
          alt="Ícone de usuário"
          className="max-sm:w-32 sm:w-32 lg:w-32 absolute top-2 "
        />

        <div className="relative w-3/4 m-4 ">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => adicionarEmail(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />
          <img
            src="../../usuarioGmail.png"
            alt="Ícone de email"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        </div>

        <div className="relative w-3/4 m-4">
          <input
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full py-2 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />

          <img
            src="../../cadeado.png"
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

        <button
          onClick={verificarLogin}
          className="bg-cinza text-white rounded-full w-1/2 py-2 mt-5 hover:bg-roxo hover:opacity-70 font-[Bagel Fat One]"
        >
          Login
        </button> 
      </div>
    </div>
  );
}
