import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

// verificar conexao
// verificar porta
// 
const app = express()
const PORT = 3000

app.use(cors())

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'educnodered',
  password: 'EDUCEREnodered1584',
  database: 'BancoDeDadosNodEducere',
})

db.connect((err) => {
  if (err) {
    console.error('Erro de conexãoOOOOO: ' + err.stack)
    return
  }
  console.log('Conexão com o banco de dados estabelecida!')
})

app.get('/api/dados', (req, res) => {
  db.query('SELECT label, value FROM tabela_dados', (err, results) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.json(results)
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})