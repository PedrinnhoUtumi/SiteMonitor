import { useContext, useEffect, useState } from "react";
import { Pagina } from "../components/Pagina";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

export function User() {
  const navigate = useNavigate();
  const { data, email, instituicao, adicionarInstituicao } = useContext(DataContext);
  const [usuario, setUsuario] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [negocioDoUsuario, setNegocioDoUsuario] = useState([]);

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
  adicionarInstituicao(negocio?.nome || "Não vinculado");
  const date = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo"
  });
  const infoUsuario = {
    nome: usuarioEncontrado.nome,
    email: usuarioEncontrado.email,
    instituicao: negocio?.nome || "Não vinculado",
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
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true });
  }
  // function isAdm(infoUsuario){
  //   if (infoUsuario.tipoConta === "adm")
  // }

  return (
    <Pagina>
      <div className="flex flex-col items-center justify-start w-full p-4 bg-fundo_azul_claro_elegante min-h-screen text-white">
        <h1 className="text-2xl font-bold text-fonte_elegante_amarelo mb-4">Perfil do Usuário</h1>

        <div className="flex flex-wrap justify-center w-full max-w-5xl">
          <Box label="Nome" value={infoUsuario.nome} />
          <Box label="E-mail" value={infoUsuario.email} />
          <Box label="Instituição" value={infoUsuario.instituicao} />
          <Box label="Cargo" value={infoUsuario.cargo} />
          <Box label="Tipo de Conta" value={infoUsuario.tipoConta} />
          <Box label="Último Login" value={infoUsuario.ultimoLogin} />
        </div>

        <div className="mt-8 flex gap-4">
          <button className="bg-fundo_azul_escuro_elegante text-white px-4 py-2 rounded hover:bg-fonte_elegante_amarelo hover:text-white font-semibold">
            Editar Perfil
          </button>
          <button
            className="bg-fundo_azul_escuro_elegante text-white px-4 py-2 rounded hover:bg-azul_bebe hover:text-black font-semibold"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </Pagina>
  );
}
