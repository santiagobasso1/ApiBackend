import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("mensajes actualizados", (updatedMessages) => {
      setMessages(updatedMessages);
    });

    const getMessages = async () => {
      try {
        const response = await fetch('http://localhost:4000/socket/chat', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response)
        const data = await response.json();
        if(data.messages) {
          setMessages(data.messages);
        } else {
          setAlertMessage("Necesitas estar logeado para chatear")
        }
      } catch (error) {
        setAlertMessage("No se pudo conectar con el servidor, intente mas tarde")
        console.error('Error al cargar los mensajes:', error);
      }
    };

    getMessages();

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    try {
      const response = await fetch('http://localhost:4000/socket/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          first_name: "santiagobasso",
          email: "salafgw",
          message: newMessage 
        })
      });

      if (response.ok) {
        setNewMessage('');
      } else {
        const data = await response.json();
        setAlertMessage(data.message);
      }
    } catch (error) {
      setAlertMessage("No se ha podido conectar al chat, recuerda que tienes que estar logeado y no ser Admin");
    }
  };

  return (
    <div className="container mainContainer">
      {alertMessage && <div className="alert alert-danger" style={{ maxWidth: '500px', margin: '2rem auto' }}>{alertMessage}</div>}
      <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
        {messages.map((message) => (
            <div key={message._id}>{message.user} ({message.email}): {message.message}</div>
        ))}
      </div>
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};