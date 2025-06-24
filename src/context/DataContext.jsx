import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instituicao, setInstituicao] = useState([]);
  const [cargo, setCargo] = useState("");
  const [inicio, setInicio] = useState(null);
  const [fim, setFim] = useState(null);

  function adicionarDados(novosDados) {
    setData((prev) => {
      const existentes = new Set(prev.map((item) => JSON.stringify(item)));
      const novosUnicos = novosDados.filter(
        (item) => !existentes.has(JSON.stringify(item))
      );
      const atualizados = [...prev, ...novosUnicos];
      return atualizados;
    });
  }
  const adicionarNomes = (novoNome) => {
    setName(novoNome);
  };
  const adicionarEmail = (novoEmail) => {
    setEmail(novoEmail);
  };
  const adicionarInstituicao = (novaInstituicao) => {
    setInstituicao((prev) => {
      if (!prev.includes(novaInstituicao)) {
        return [...prev, novaInstituicao];
      }
      return prev;
    });
  };

  const adicionarCargo = (novoCargo) => {
    setCargo(novoCargo);
  };

  const adicionarInicio = (novoInicio) => {
    setInicio(novoInicio);
  }

  const adicionarFim = (novoFim) => {
    setFim(novoFim);
  }
  const fetchMachbase = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados do servidor");
    }

    const json = await response.json();
    const { insercao, semInsercao } = json;
    const dados = []
    const processarTabelas = (tabelas) => {
      if (!tabelas || typeof tabelas !== "object") return;

      Object.entries(tabelas).forEach(([nomeTabela, conteudo]) => {
        const columns = conteudo?.data?.columns;
        const rows = conteudo?.data?.rows;

        if (!columns || !rows) return;

        const dadosFormatados = rows.map((linha) => {
          const obj = { __tabela: nomeTabela };
          columns.forEach((coluna, index) => {
            obj[coluna] = linha[index];
          });
          return obj;
        });

        dados.push(...dadosFormatados);
        
      });
    };
    
    processarTabelas(insercao);
    processarTabelas(semInsercao);
    setData(dados)
  } catch (err) {
    console.error("❌ Erro na requisição:", err.message);
  }
};

  useEffect(() => {
    console.log(data);
    function formatarDataMachbase(date) {
      const ano = date.getFullYear();
      const mes = String(date.getMonth() + 1).padStart(2, '0');
      const dia = String(date.getDate()).padStart(2, '0');
      const horas = String(date.getHours()).padStart(2, '0');
      const minutos = String(date.getMinutes()).padStart(2, '0');
      const segundos = String(date.getSeconds()).padStart(2, '0');
      return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    }
    if (!inicio || !fim) {
      function getDia() {
        const agora = new Date();

        const horaBrasilia = new Date(agora.getTime() - 60000);

        const ano = horaBrasilia.getFullYear();
        const mes = String(horaBrasilia.getMonth() + 1).padStart(2, '0');
        const dia = String(horaBrasilia.getDate()).padStart(2, '0');

        return `${ano}-${mes}-${dia}`;
      }
      const hoje = getDia();
      const inicioPadrao = `${hoje} 00:00:00`;
      const fimPadrao = `${hoje} 23:59:59`;
      fetchMachbase(`http://127.0.0.1:3000/api?inicio=${encodeURIComponent(inicioPadrao)}&fim=${encodeURIComponent(fimPadrao)}`);
    } else {
      const inicioFormatado = formatarDataMachbase(new Date(inicio));
      const fimFormatado = formatarDataMachbase(new Date(fim));
      console.log(inicioFormatado, fimFormatado);
      
      fetchMachbase(`http://127.0.0.1:3000/api?inicio=${encodeURIComponent(inicioFormatado)}&fim=${encodeURIComponent(fimFormatado)}`);
    }
  }, [inicio, fim]);

  const exportar = {
    data,
    adicionarDados,
    name,
    adicionarNomes,
    email,
    adicionarEmail,
    instituicao,
    adicionarInstituicao,
    cargo,
    adicionarCargo,
    inicio,
    adicionarInicio,
    fim,
    adicionarFim,
    fetchMachbase,
  };

  return (
    <DataContext.Provider value={exportar}>{children}</DataContext.Provider>
  );
}
