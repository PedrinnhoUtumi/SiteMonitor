import axios from "axios";

const url = 'http://192.168.3.250:5654/db/query';  

const query = {
  q: "SELECT * FROM ARCOND",  
  format: "box",
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
    console.log('Resposta do Machbase:', response.data);
  })
  .catch((error) => {
    console.error('Erro ao conectar com o Machbase:', error);
  });

