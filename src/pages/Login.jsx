
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import {CircleUserRound, Lock, EyeClosed, Eye} from 'lucide-react'



export default function Login() {
  const { data, adicionarDados, name, adicionarNomes, email, adicionarEmail } = useContext(DataContext); 
  const [usuario, setUsuario] = useState([]);
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  console.log("Dados do contexto:", data);
  
  const verificarLogin = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }
    const usuarioEncontrado = {
                                ID: data.usuario.ID,
                                NAME: data.usuario.NAME,
                                EMAIL: data.usuario.EMAIL,
                                ROLE: data.usuario.ROLE,
                                ACCOUNT: data.usuario.ACCOUNT
                              };

    adicionarNomes(usuarioEncontrado.NAME);
    localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
    localStorage.setItem("usuario_logado", data.mensagem);
    navigate("/TempoReal", { replace: true });

    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Erro ao tentar login.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-fundo_azul_claro_elegante to-azul_escuro h-screen flex items-center justify-center">
      <img
        src="/educere-removebg-preview.png"
        alt="Logo Educere"
        className="absolute w-32 max-sm:w-32 z-0 top-2 right-2 max-sm:top-4 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:translate-y-0"
        loading="lazy"
      />
      <div className="caixaLogin max-sm:h-2/4 sm:w-1/2 lg:w-1/4 sm:h-3/5 md:h-4/5 lg:h-4/6 flex flex-col justify-end items-center bg-white bg-opacity-20 rounded-3xl shadow-lg backdrop-blur-sm pb-16 px-4 sm:px-6 md:px-8">
        <img
          src="/usuario.png"
          alt="Ícone de usuário"
          className="max-sm:w-32 sm:w-32 lg:w-32 absolute top-2"
          loading="lazy"
        />

        <div className="relative w-full m-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => adicionarEmail(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />
          <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black"/>
        </div>

        <div className="relative w-full m-4">
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-azul_claro"
          />
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black"/>

          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {mostrarSenha ? <Eye className="w-5 h-5 text-black" /> : <EyeClosed className="w-5 h-5 text-black" />}
          </button>
        </div>

        <button
          onClick={verificarLogin}
          className="bg-cinza text-white rounded-full w-full sm:w-1/2 py-2 mt-5 hover:bg-roxo hover:opacity-70 font-[Bagel Fat One]"
        >
          Login
        </button>
      </div>
    </div>
  );
}
