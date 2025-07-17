import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
// ❌ Removi import de bcryptjs aqui: ideal é validar no backend.

export default function Login() {
  const { data, adicionarDados, name, adicionarNomes, email, adicionarEmail } = useContext(DataContext); // Importa o contexto de dados
  const [usuario, setUsuario] = useState([]);
  const [senha, setSenha] = useState("");
  const [senhaHash, setSenhaHash] = useState("");
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  console.log("Dados do contexto:", data);
  
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
    
  }, [data]);
  
  const verificarLogin = async () => {
    const usuarioEncontrado = usuario.find((user) => user.email === email);
    if (usuarioEncontrado) {
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
          <img
            src="/usuarioGmail.png"
            alt="Ícone de email"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            loading="lazy"
          />
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
          <img
            src="/cadeado.png"
            alt="Ícone de senha"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            loading="lazy"
          />

          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <img
              src={mostrarSenha ? "/eye.png" : "/hidden.png"}
              alt="Mostrar ou ocultar senha"
              className="w-5 h-5"
              loading="lazy"
            />
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
