import React, { useState, useEffect, useRef } from 'react';
import QuestionBox from './Chatbox.js';

function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);

  const chatRef = useRef(null);

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ maxWidth: '90%', margin: 'auto', marginTop: '80px' }}>
      <div
        ref={chatRef}
        style={{ 
          padding: '10px', 
          height: '750px', 
          overflowY: 'auto', 
           
          borderRadius: '10px',
          position: 'relative', // Ensure positioning context
        }}
      >
        {/* Separate div for the blurred background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(1px)', // Apply blur only to this background layer
            zIndex: 0, // Place it behind the content
          }}
        />
        {/* Content layer above the blurred background */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              <p
                style={{ 
                  background: 'transparent',
                  color: '#FFF', // Soft pale yellow
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  maxWidth: '70%',
                  margin: '5px 0',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)',
                }}
              >
                <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <QuestionBox addMessage={addMessage} />
    </div>
  );
}

export default ChatInterface;