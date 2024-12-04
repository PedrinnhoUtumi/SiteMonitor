import  { useEffect } from 'react';

const MQTTComponent = () => {
  useEffect(() => {
    // Configuração de conexão ao broker MQTT
    const client = mqtt.connect('mqtt://localhost:9001'); // Substitua pelo seu host e porta

    // Evento de conexão bem-sucedida
    client.on('connect', () => {
      console.log('Conectado ao broker MQTT');

      // Inscreva-se em um tópico
      client.subscribe('teste/topico', (err) => {
        if (err) {
          console.error('Erro ao se inscrever no tópico:', err);
        } else {
          console.log('Inscrito no tópico "teste/topico"');
        }
      });

      // Publicar uma mensagem
      client.publish('teste/topico', 'Olá do React!');
    });

    // Evento de recepção de mensagens
    client.on('message', (topic, message) => {
      console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`);
    });

    // Evento de erro
    client.on('error', (err) => {
      console.error('Erro de conexão:', err);
    });

    // Evento de desconexão
    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>Componente MQTT</h1>
      <p>Verifique o console para mensagens recebidas.</p>
    </div>
  );
};

export default MQTTComponent;
