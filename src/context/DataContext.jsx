import { createContext, useEffect, useState } from "react";

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
  const [isDbOnline, setIsDbOnline] = useState(true); // 👈 flag do banco


  function adicionarDados(novosDados) {
    if (data.length > 0) {
      setData([]); 
    }
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

  const fetchMachbase = async (url, retryCount = 0) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados do servidor");
      }

      const json = await response.json();
      const { insercao, semInsercao } = json;
      const dados = [];

      const tabelasObrigatorias = [
        "ACTIVEPOWER",
        "VOLTAGE",
        "CURRENT",
        "CONSUMPTION",
        "GENERATION",
        "ANGLEBETWEENVOLTAGES",
        "ANGLEVOLTAGECURRENT",
        "APPARENTPOWER",
        "EQUIPMENTTEMPERATURE",
        "FREQUENCY",
        "POWERFACTOR",
        "REACTIVEPOWER"
      ];

      const registrosPorTabela = {};

      const processarTabelas = (tabelas, coletarQuantidade = false) => {
        if (!tabelas || typeof tabelas !== "object") return;

        Object.entries(tabelas).forEach(([nomeTabela, conteudo]) => {
          const columns = conteudo?.data?.columns;
          const rows = conteudo?.data?.rows;

          if (!columns || !rows) return;

          if (coletarQuantidade && tabelasObrigatorias.includes(nomeTabela)) {
            registrosPorTabela[nomeTabela] = rows.length;
          }

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

      // Processar insercao e semInsercao
      processarTabelas(insercao, true);
      processarTabelas(semInsercao, false);

      // ✔️ Verificação: todas as tabelas obrigatórias têm pelo menos 1 linha
      const todasComDados = tabelasObrigatorias.every(
        (tabela) => registrosPorTabela[tabela] && registrosPorTabela[tabela] > 0
      );

      if (todasComDados) {
        setData(dados);
      } else {
        console.warn("🔁 Nem todas as tabelas obrigatórias têm dados. Repetindo fetch...");
        setTimeout(() => fetchMachbase(url, retryCount + 1), 1000);
      }

    } catch (err) {
      console.error("❌ Erro na requisição:", err.message);
      if (retryCount < 3) {
        console.warn("🔁 Tentando novamente...");
        setTimeout(() => fetchMachbase(url, retryCount + 1), 1000);
      }
    }
  };


  useEffect(() => {
    const usuarioStorage = JSON.parse(localStorage.getItem("usuario") || "{}");

    if (usuarioStorage.NAME) setName(usuarioStorage.NAME);
    if (usuarioStorage.EMAIL) setEmail(usuarioStorage.EMAIL);
    if (usuarioStorage.ROLE) setCargo(usuarioStorage.ROLE);
    if (usuarioStorage.ACCOUNT) {
      setInstituicao((prev) =>
        !prev.includes(usuarioStorage.ACCOUNT) ? [...prev, usuarioStorage.ACCOUNT] : prev
      );
    }

    const inicioStorage = localStorage.getItem("inicio");
    const fimStorage = localStorage.getItem("fim");

    if (inicioStorage) setInicio(new Date(inicioStorage));
    if (fimStorage) setFim(new Date(fimStorage));
  }, []);

  useEffect(() => {
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

    const buscarPeriodicamente = () => {
      const inicioFormatado = formatarDataMachbase(new Date(inicio));
      const fimFormatado = formatarDataMachbase(new Date(fim));
      console.log("⏱️ Atualizando:", inicioFormatado, fimFormatado);
      fetchMachbase(`http://192.168.3.250:3000/api?inicio=${inicioFormatado}&fim=${fimFormatado}`);
    };

    buscarPeriodicamente();
    
    const interval = setInterval(() => {
      buscarPeriodicamente();
    }, 60000); 

    return () => clearInterval(interval); 
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

