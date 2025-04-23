import React, { useState, useEffect, useRef } from 'react';
import QuestionBox from './Chatbox.jsx';

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

  // Helper function to determine if a URL is an image
  const isImageUrl = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.endsWith(ext));
  };

  // Helper function to render message content based on type
  const renderMessageContent = (text) => {
    const elements = [];
    const urlRegex = /https?:\/\/[^\s]+/g;
    let match;
    let lastIndex = 0;

    while ((match = urlRegex.exec(text)) !== null) {
      const url = match[0];
      const startIndex = match.index;

      // Add any text before the URL
      if (startIndex > lastIndex) {
        elements.push(<span key={lastIndex}>{text.slice(lastIndex, startIndex)}</span>);
      }

      // Render the URL as an image or link
      if (isImageUrl(url)) {
        elements.push(<img key={startIndex} src={url} alt="image" style={{ maxWidth: '200px' }} />);
      } else {
        elements.push(<a key={startIndex} href={url} target="_blank" rel="noopener noreferrer">{url}</a>);
      }

      lastIndex = urlRegex.lastIndex;
    }

    // Add any remaining text after the last URL
    if (lastIndex < text.length) {
      elements.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }

    return elements;
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '800px', 
      margin: '0 auto', 
      marginTop: '40px', 
      height: 'calc(100vh - 150px)', 
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <div
        ref={chatRef}
        style={{ 
          padding: '20px', 
          flex: 1,
          overflowY: 'auto',
          borderRadius: '10px',
          position: 'relative',
          marginBottom: '20px'
        }}
      >
        {/* Content layer */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ 
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              marginBottom: '10px'
            }}>
              <p
                style={{ 
                  background: msg.sender === 'user' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  color: '#FFF',
                  display: 'inline-block',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  maxWidth: '70%',
                  margin: '5px 0',
                  wordBreak: 'break-word',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {renderMessageContent(msg.text)}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ position: 'relative', width: '100%' }}>
        <QuestionBox addMessage={addMessage} />
      </div>
    </div>
  );
}

export default ChatInterface;