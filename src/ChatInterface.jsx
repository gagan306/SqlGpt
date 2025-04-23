import React, { useState, useEffect, useRef } from 'react';
import QuestionBox from './Chatbox.jsx';

function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);

  const chatRef = useRef(null);

  const isImageUrl = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.endsWith(ext));
  };

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const renderCodeBlock = (text) => {
    const parts = [];
    let lastIndex = 0;
    const codeBlockRegex = /```([\w]*)\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{processText(text.substring(lastIndex, match.index))}</span>);
      }

      const language = match[1] || 'plaintext';
      const code = match[2];

      parts.push(
        <div key={`code-${match.index}`} style={{
          background: '#2d2d2d',
          color: '#f8f8f2',
          padding: '12px',
          borderRadius: '5px',
          margin: '8px 0',
          overflowX: 'auto',
          textAlign: 'left'
        }}>
          {language && (
            <div style={{ color: '#a6a6a6', fontSize: '0.8rem', marginBottom: '4px' }}>{language}</div>
          )}
          <pre style={{ margin: 0 }}><code>{code}</code></pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(<span key={`text-${lastIndex}`}>{processText(text.substring(lastIndex))}</span>);
    }

    return <>{parts}</>;
  };

  const processText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return (
      <div style={{ textAlign: 'left' }}>
        {lines.map((line, i) => {
          const bulletMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
          if (bulletMatch) {
            return (
              <div key={i} style={{ paddingLeft: '20px', marginBottom: '4px' }}>
                <span style={{ marginRight: '5px' }}>•</span>
                {processUrls(bulletMatch[2])}
              </div>
            );
          }

          const numberMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
          if (numberMatch) {
            const listNumber = numberMatch[2];
            return (
              <div key={i} style={{ paddingLeft: '20px', marginBottom: '4px' }}>
                <span style={{ marginRight: '5px', fontWeight: 'bold' }}>{listNumber}.</span>
                {processUrls(numberMatch[3])}
              </div>
            );
          }

          return line ? (
            <div key={i} style={{ marginBottom: '4px' }}>
              {processUrls(line)}
            </div>
          ) : (
            <br key={i} />
          );
        })}
      </div>
    );
  };

  const processUrls = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = [];
    let match;
    let lastIndex = 0;

    urlRegex.lastIndex = 0;

    while ((match = urlRegex.exec(text)) !== null) {
      const url = match[0];
      const startIndex = match.index;

      if (startIndex > lastIndex) {
        parts.push(text.substring(lastIndex, startIndex));
      }

      if (isImageUrl(url)) {
        parts.push(
          <img key={startIndex} src={url} alt="image" style={{ maxWidth: '200px', maxHeight: '150px', margin: '5px 0' }} />
        );
      } else {
        parts.push(
          <a
            key={startIndex}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3b82f6', textDecoration: 'underline' }}
          >
            {url}
          </a>
        );
      }

      lastIndex = startIndex + url.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.map((part, i) => typeof part === 'string' ? <span key={i}>{part}</span> : part);
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', marginTop: '40px', height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
      <div
        ref={chatRef}
        style={{ padding: '20px', flex: 1, overflowY: 'auto', borderRadius: '10px', position: 'relative', marginBottom: '20px' }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', marginBottom: '10px' }}>
              <div
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
                  textAlign: 'left'
                }}
              >
                <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong>{' '}
                {renderCodeBlock(msg.text)}
              </div>
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