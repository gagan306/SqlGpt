// src/components/Chat.jsx

import React, { useEffect, useState } from 'react';
import { fetchMessages } from '../api/api';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages();
      setMessages(data);
    };

    loadMessages();
  }, []);

  return (
    <div className="chat-box" style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Chat Messages</h2>
      <div className="messages" style={{ border: '1px solid #ccc', padding: '10px' }}>
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chat;
