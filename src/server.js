import axios from "axios";
import express from "express"
import cors from "cors"

const app = express();
const port = 1883; 

app.use(cors());  
app.use(express.json()); 

const url = 'http://192.168.3.250:5654/db/query';

app.post('/api/machbase', (req, res) => {
  const query = {
    q: `SELECT * FROM ARCOND`,
    format: "json",
    timeformat: "default",
    tz: "local",
    precision: 2,
  };

  axios.post(url, query, {
    auth: {
      username: 'sys',
      password: 'manager',
    }
  })
    .then((response) => {
      res.json(response.data); 
    })
    .catch((error) => {
      console.error('Erro ao conectar com o Machbase:', error);
      res.status(500).json({ error: 'Erro ao conectar com o Machbase' });
    });
});

app.listen(port, () => {
  console.log(`Servidor Node.js rodando na porta ${port}`);
});
