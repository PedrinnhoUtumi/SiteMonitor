import { useContext, useEffect, useState } from "react";
import { Pagina } from "../components/Pagina";
import { useNavigate, NavLink } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { Cabecalho } from "../components/Cabecalho";

export function User() {
  const navigate = useNavigate();
  const { data, email, instituicao, adicionarInstituicao } = useContext(DataContext);
  const [usuario, setUsuario] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [negocioDoUsuario, setNegocioDoUsuario] = useState([]);
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setLarguraTela(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const myUser = data.filter((item) => item.__tabela === "MYUSER");
      const userBusiness = data.filter((item) => item.__tabela === "USER_BUSINESS");
      const business = data.filter((item) => item.__tabela === "BUSINESS");

      const listaUsuarios = myUser.map((usuario) => ({
        id: usuario.ID,
        nome: usuario.NAME,
        email: usuario.EMAIL,
        role: usuario.ROLE,        
        conta: usuario.ACCOUNT,
      }));

      const listaNegocios = business.map((negocio) => ({
        id: negocio.ID,
        nome: negocio.NAME,
      }));

      const listaRelacao = userBusiness.map((relacao) => ({
        userId: relacao.USERID,
        businessId: relacao.BUSINESSID,
      }));

      setUsuario(listaUsuarios);
      setNegocios(listaNegocios);
      setNegocioDoUsuario(listaRelacao);
    }
  }, [data]);

  const usuarioEncontrado = usuario.find((user) => user.email === email);

  if (!usuarioEncontrado) {
    return (
      <Pagina>
        <div className="text-white p-10 text-center">Carregando perfil do usuário...</div>
      </Pagina>
    );
  }

  const relacao = negocioDoUsuario.find((negocio) => negocio.userId === usuarioEncontrado.id);
  const negocio = negocios.find((negocio) => negocio.id === relacao?.businessId);  
  adicionarInstituicao(negocio?.nome || "Fundação Educere");
  const date = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo"
  });
  const infoUsuario = {
    nome: usuarioEncontrado.nome,
    email: usuarioEncontrado.email,
    instituicao: negocio?.nome || "Fundação Educere",
    cargo: usuarioEncontrado.role,
    tipoConta: usuarioEncontrado.conta,
    ultimoLogin: date, 
  };

  const Box = ({ label, value }) => (
    <div className="bg-fundo_azul_escuro_elegante text-fonte_elegante_amarelo rounded-md p-4 flex flex-col items-center sm:w-1/3 m-2 shadow-md w-auto max-w-full">
      <span className="font-semibold text-lg text-center w-full">{label}</span>
      <span className="text-2xl mt-2 break-words text-center w-full">{value}</span>
    </div>
  );

  function handleLogout() {
    // localStorage.clear();
    // sessionStorage.clear();
    // navigate("/", { replace: true });
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  }

  return (
    <Pagina>
      {larguraTela>=600 && <Cabecalho/>}
      <div className="flex flex-col items-center justify-start w-full p-4 bg-fundo_azul_claro_elegante min-h-screen text-white border-t ">

        <div className="flex flex-wrap justify-center w-full max-w-5xl">
          <Box label="Nome" value={infoUsuario.nome} />
          <Box label="E-mail" value={infoUsuario.email} />
          <Box label="Instituição" value={infoUsuario.instituicao} />
          <Box label="Cargo" value={infoUsuario.cargo} />
          <Box label="Tipo de Conta" value={infoUsuario.tipoConta} />
        </div>
        <nav className="m-5">
          <button onClick={handleLogout} className="bg-fundo_azul_escuro_elegante p-3 pl-8 pr-8 rounded-md w-full  hover:bg-fonte_elegante_amarelo hover:text-white text-fonte_elegante_amarelo transition-colors duration-300">
            Sair
          </button>
        </nav>
      </div>
    </Pagina>
  );
}
