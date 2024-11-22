import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

// verificar conexao
// verificar porta
// 
const app = express();
const PORT = 3306;

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco',
});

app.get('/api/dados', (req, res) => {
  db.query('SELECT label, value FROM tabela_dados', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
