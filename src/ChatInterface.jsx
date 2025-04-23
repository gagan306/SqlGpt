import React, { useState, useEffect, useRef } from 'react';
import QuestionBox from './Chatbox.jsx';

function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);

  const chatRef = useRef(null);

  // Helper functions for message parsing
  const isCodeBlock = (text) => {
    return text.includes('```');
  };

  const isImageUrl = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.endsWith(ext));
  };

  const addMessage = (text, sender) => {
    // Store the raw text in the message object
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to parse and render the message content
  const renderMessageContent = (text) => {
    if (!text) return null;
    
    // First handle code blocks
    if (text.includes('```')) {
      const parts = [];
      let remainingText = text;
      let startIndex = remainingText.indexOf('```');
      
      while (startIndex !== -1) {
        // Add text before the code block
        if (startIndex > 0) {
          const beforeText = remainingText.substring(0, startIndex);
          parts.push(<span key={`pre-${startIndex}`}>{processText(beforeText)}</span>);
        }
        
        // Find the end of the code block
        const endIndex = remainingText.indexOf('```', startIndex + 3);
        if (endIndex === -1) break; // Unclosed code block
        
        // Extract the code and potential language
        const codeWithLang = remainingText.substring(startIndex + 3, endIndex);
        const firstLineEnd = codeWithLang.indexOf('\n');
        let language = '';
        let code = codeWithLang;
        
        if (firstLineEnd > 0) {
          language = codeWithLang.substring(0, firstLineEnd).trim();
          code = codeWithLang.substring(firstLineEnd + 1);
        }
        
        // Add the code block element
        parts.push(
          <div key={`code-${startIndex}`} style={{
            background: '#2d2d2d',
            color: '#f8f8f2',
            padding: '12px',
            borderRadius: '5px',
            margin: '8px 0',
            overflowX: 'auto',
            textAlign: 'left'
          }}>
            {language && (
              <div style={{ color: '#a6a6a6', fontSize: '0.8rem', marginBottom: '4px' }}>
                {language}
              </div>
            )}
            <pre style={{ margin: 0 }}><code>{code}</code></pre>
          </div>
        );
        
        // Continue with remaining text
        remainingText = remainingText.substring(endIndex + 3);
        startIndex = remainingText.indexOf('```');
      }
      
      // Add any remaining text
      if (remainingText) {
        parts.push(<span key={`post-code`}>{processText(remainingText)}</span>);
      }
      
      return <div>{parts}</div>;
    }
    
    return processText(text);
  };
  
  const processText = (text) => {
    if (!text) return null;
  
    const lines = text.split('\n');
  
    return (
      <div style={{ textAlign: 'left' }}>
        {lines.map((line, i) => {
          // Bullet list
          const bulletMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
          if (bulletMatch) {
            return (
              <div key={i} style={{ paddingLeft: '20px', marginBottom: '4px' }}>
                <span style={{ marginRight: '5px' }}>•</span>
                {processUrls(bulletMatch[2])}
              </div>
            );
          }
  
          // Numbered list
          const numberMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
          if (numberMatch) {
            const listNumber = numberMatch[2]; // Safe access
            return (
              <div key={i} style={{ paddingLeft: '20px', marginBottom: '4px' }}>
                <span style={{ marginRight: '5px', fontWeight: 'bold' }}>{listNumber}.</span>
                {processUrls(numberMatch[3])}
              </div>
            );
          }
  
          // Plain line
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
  
  
  // Process URLs within text
  const processUrls = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = [];
    let match;
    let lastIndex = 0;
    let tempText = text;
    
    // Reset lastIndex of regex
    urlRegex.lastIndex = 0;
    
    while ((match = urlRegex.exec(text)) !== null) {
      const url = match[0];
      const startIndex = match.index;
      
      // Add text before URL
      if (startIndex > lastIndex) {
        parts.push(text.substring(lastIndex, startIndex));
      }
      
      // Add URL as link or image
      if (isImageUrl(url)) {
        parts.push(
          <img 
            key={startIndex} 
            src={url} 
            alt="image" 
            style={{ maxWidth: '200px', maxHeight: '150px', margin: '5px 0' }} 
          />
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
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    // If we found any URLs, return the processed parts
    if (parts.length > 0) {
      return parts.map((part, i) => 
        typeof part === 'string' ? <span key={i}>{part}</span> : part
      );
    }
    
    // Otherwise return original text
    return text;
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
                  textAlign: 'left'
                }}
              >
                <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong>{' '}
                {renderMessageContent(msg.text)}
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