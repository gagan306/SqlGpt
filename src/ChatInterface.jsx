import React, { useState, useEffect, useRef } from 'react';
import QuestionBox from './Chatbox.jsx';

function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);

  const chatRef = useRef(null);

  // Helper functions for detecting message types
  const isCodeBlock = (text) => {
    return text.startsWith('```') && text.endsWith('```');
  };

  const containsUrl = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  };

  const extractUrls = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  const addMessage = (text, sender) => {
    // Process and render the message based on its content
    const renderMessage = () => {
      if (isCodeBlock(text)) {
        // Render code block
        const content = text.substring(3, text.length - 3);
        const firstLineEnd = content.indexOf('\n');
        const language = firstLineEnd > 0 ? content.substring(0, firstLineEnd).trim() : '';
        const code = firstLineEnd > 0 ? content.substring(firstLineEnd + 1) : content;
        
        return {
          type: 'code',
          language,
          content: code,
          raw: text
        };
      } else if (containsUrl(text)) {
        // Process text with URLs
        const urls = extractUrls(text);
        return {
          type: 'url',
          content: text,
          urls,
          raw: text
        };
      } else if (text.includes('\n')) {
        // Process multiline text with potential lists
        const lines = text.split('\n');
        const processedLines = [];
        let currentList = null;
        
        for (const line of lines) {
          const listItemRegex = /^(\s*)([-*]|\d+\.)\s+(.+)$/;
          const match = line.match(listItemRegex);
          
          if (match) {
            if (!currentList) {
              currentList = {
                type: match[2] === '-' || match[2] === '*' ? 'bullet' : 'numbered',
                items: []
              };
              processedLines.push(currentList);
            }
            currentList.items.push(match[3]);
          } else {
            currentList = null;
            if (line.trim()) {
              processedLines.push({ type: 'paragraph', content: line });
            } else {
              processedLines.push({ type: 'break' });
            }
          }
        }
        
        return {
          type: 'multiline',
          content: processedLines,
          raw: text
        };
      } else {
        // Simple text message
        return {
          type: 'text',
          content: text,
          raw: text
        };
      }
    };

    // Add the processed message to the messages array
    setMessages((prevMessages) => [
      ...prevMessages, 
      { 
        text, 
        sender, 
        processed: renderMessage(), 
        timestamp: new Date() 
      }
    ]);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to render message content based on type
  const renderMessageContent = (message) => {
    // If the message doesn't have processed data (for backward compatibility)
    if (!message.processed) {
      return <span>{message.text}</span>;
    }

    const { processed } = message;

    switch (processed.type) {
      case 'code':
        return (
          <div style={{ 
            background: '#2d2d2d', 
            color: '#f8f8f2', 
            padding: '12px', 
            borderRadius: '8px',
            textAlign: 'left',
            overflow: 'auto'
          }}>
            {processed.language && (
              <div style={{ color: '#a6a6a6', fontSize: '0.8rem', marginBottom: '4px' }}>
                {processed.language}
              </div>
            )}
            <pre style={{ margin: 0 }}><code>{processed.content}</code></pre>
          </div>
        );
      
      case 'url':
        return (
          <div style={{ textAlign: 'left' }}>
            {processed.content.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
              const isUrl = /^https?:\/\//.test(part);
              return isUrl ? (
                <a 
                  key={i}
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#3b82f6', textDecoration: 'underline' }}
                >
                  {part}
                </a>
              ) : (
                <span key={i}>{part}</span>
              );
            })}
          </div>
        );
      
      case 'multiline':
        return (
          <div style={{ textAlign: 'left' }}>
            {processed.content.map((item, i) => {
              if (item.type === 'paragraph') {
                return <p key={i} style={{ margin: '0 0 8px 0' }}>{item.content}</p>;
              } else if (item.type === 'break') {
                return <br key={i} />;
              } else if (item.type === 'bullet') {
                return (
                  <ul key={i} style={{ paddingLeft: '20px', margin: '8px 0', listStyleType: 'disc' }}>
                    {item.items.map((listItem, j) => (
                      <li key={j} style={{ margin: '4px 0' }}>{listItem}</li>
                    ))}
                  </ul>
                );
              } else if (item.type === 'numbered') {
                return (
                  <ol key={i} style={{ paddingLeft: '20px', margin: '8px 0' }}>
                    {item.items.map((listItem, j) => (
                      <li key={j} style={{ margin: '4px 0' }}>{listItem}</li>
                    ))}
                  </ol>
                );
              }
              return null;
            })}
          </div>
        );
      
      case 'text':
      default:
        return <span>{processed.content}</span>;
    }
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
                }}
              >
                <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong>{' '}
                {renderMessageContent(msg)}
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