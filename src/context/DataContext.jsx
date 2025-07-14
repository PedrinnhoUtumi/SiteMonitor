import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext();

function getDia() {
  const agora = new Date();

  const horaBrasilia = new Date(agora.getTime() - 60000);

  const ano = horaBrasilia.getFullYear();
  const mes = String(horaBrasilia.getMonth() + 1).padStart(2, '0');
  const dia = String(horaBrasilia.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}
const hoje = getDia();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instituicao, setInstituicao] = useState([]);
  const [cargo, setCargo] = useState("");
  const [inicio, setInicio] = useState(new Date(`${hoje} 00:00:00`));
  const [fim, setFim] = useState(new Date(`${hoje} 23:59:59`));

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
    if (!(inicio instanceof Date) || isNaN(inicio) || !(fim instanceof Date) || isNaN(fim)) {
      return;
    }
    const inicioFormatado = formatarDataMachbase(new Date(inicio));
    const fimFormatado = formatarDataMachbase(new Date(fim));
    console.log(inicioFormatado, fimFormatado);
    
    // fetchMachbase(`http://localhost:3000/api?inicio=${inicioFormatado}&fim=${fimFormatado}`);
    fetchMachbase(`http://192.168.3.84:3000/api?inicio=${inicioFormatado}&fim=${fimFormatado}`);
    // fetchMachbase(`http://192.168.3.250:3000/api?inicio=${inicioFormatado}&fim=${fimFormatado}`);
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
