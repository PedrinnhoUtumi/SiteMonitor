import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  function adicionarDados(novosDados) {
    setData((prev) => {
      const existentes = new Set(prev.map((item) => JSON.stringify(item)));
      const novosUnicos = novosDados.filter(
        (item) => !existentes.has(JSON.stringify(item))
      );
      const atualizados = [...prev, ...novosUnicos];
      console.log("Atualizando dados:", atualizados);
      return atualizados;
    });
  }

  useEffect(() => {
    const fetchMachbase = async () => {
      try {
        const response = await fetch("https://servermagvia.onrender.com/api");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do servidor");
        }

        const json = await response.json();
        const tabelas = json.message;

        console.log("📥 Resposta bruta do servidor:", json);

        Object.entries(tabelas).forEach(([nomeTabela, conteudo]) => {
          const { columns, rows } = conteudo.data;

          if (!columns || columns.length === 0) {
            return;
          }

          const dadosFormatados = rows.map((linha) => {
            const obj = { __tabela: nomeTabela };
            columns.forEach((coluna, index) => {
              obj[coluna] = linha[index];
            });
            return obj;
          });

          adicionarDados(dadosFormatados);
        });
      } catch (err) {
        console.error("❌ Erro na requisição:", err.message);
      }
    };

    fetchMachbase();
  }, []);

  const exportar = {
    data,
    adicionarDados,
  };

  return (
    <DataContext.Provider value={exportar}>{children}</DataContext.Provider>
  );
}
