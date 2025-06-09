import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instituicao, setInstituicao] = useState([]);
  const [cargo, setCargo] = useState("");

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

  useEffect(() => {
    const fetchMachbase = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do servidor");
        }

        const json = await response.json();
        const { insercao, semInsercao } = json;

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

            adicionarDados(dadosFormatados);
          });
        };

        processarTabelas(insercao);
        processarTabelas(semInsercao);
      } catch (err) {
        console.error("❌ Erro na requisição:", err.message);
      }
    };

    fetchMachbase();
  }, []);

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
  };

  return (
    <DataContext.Provider value={exportar}>{children}</DataContext.Provider>
  );
}
