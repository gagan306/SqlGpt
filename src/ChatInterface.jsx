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

  const containsList = (text) => {
    const lines = text.split('\n');
    return lines.some(line => /^(\s*)[-*]|\d+\.\s+/.test(line));
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

  // Function to render code blocks
  const renderCodeBlock = (text) => {
    const parts = [];
    let currentText = text;
    
    // Find all code blocks
    const codeBlockRegex = /```([\w]*)\n([\s\S]*?)```/g;
    let match;
    let lastIndex = 0;
    
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {text.substring(lastIndex, match.index)}
          </span>
        );
      }
      
      // Add the code block
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
            <div style={{ color: '#a6a6a6', fontSize: '0.8rem', marginBottom: '4px' }}>
              {language}
            </div>
          )}
          <pre style={{ margin: 0 }}><code>{code}</code></pre>
        </div>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex)}
        </span>
      );
    }
    
    return parts;
  };

  // Function to render lists
  const renderLists = (text) => {
    const parts = [];
    const lines = text.split('\n');
    let inList = false;
    let listType = null;
    let listItems = [];
    let textBuffer = [];
    
    lines.forEach((line, index) => {
      // Check if this line is a list item
      const bulletMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
      const numberMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
      
      if (bulletMatch || numberMatch) {
        // If we have buffered text, add it before starting the list
        if (textBuffer.length > 0) {
          parts.push(
            <span key={`text-${index}`}>
              {textBuffer.join('\n')}
            </span>
          );
          textBuffer = [];
        }
        
        // Determine list type
        const newListType = bulletMatch ? 'bullet' : 'number';
        
        // If we're not in a list or switching list types, start a new one
        if (!inList || listType !== newListType) {
          // If we were in a list, close it
          if (inList) {
            const ListTag = listType === 'bullet' ? 'ul' : 'ol';
            parts.push(
              <ListTag key={`list-${index}`} style={{ 
                textAlign: 'left',
                paddingLeft: '20px',
                margin: '8px 0'
              }}>
                {listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ListTag>
            );
            listItems = [];
          }
          
          inList = true;
          listType = newListType;
        }
        
        // Add the item to our current list
        const itemText = (bulletMatch ? bulletMatch[2] : numberMatch[2]);
        listItems.push(itemText);
      } else {
        // Not a list item
        
        // If we were in a list, close it
        if (inList) {
          const ListTag = listType === 'bullet' ? 'ul' : 'ol';
          parts.push(
            <ListTag key={`list-${index}`} style={{ 
              textAlign: 'left',
              paddingLeft: '20px',
              margin: '8px 0'
            }}>
              {listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ListTag>
          );
          listItems = [];
          inList = false;
        }
        
        // Buffer this line
        textBuffer.push(line);
      }
    });
    
    // If we were in a list at the end, close it
    if (inList) {
      const ListTag = listType === 'bullet' ? 'ul' : 'ol';
      parts.push(
        <ListTag key="list-end" style={{ 
          textAlign: 'left',
          paddingLeft: '20px',
          margin: '8px 0'
        }}>
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      );
    }
    
    // Add any remaining buffered text
    if (textBuffer.length > 0) {
      parts.push(
        <span key="text-end">
          {textBuffer.join('\n')}
        </span>
      );
    }
    
    return parts;
  };

  // Function to render URLs and images
  const renderUrlsAndImages = (text) => {
    const elements = [];
    const urlRegex = /https?:\/\/[^\s]+/g;
    let match;
    let lastIndex = 0;

    while ((match = urlRegex.exec(text)) !== null) {
      const url = match[0];
      const startIndex = match.index;

      // Add any text before the URL
      if (startIndex > lastIndex) {
        elements.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, startIndex)}</span>);
      }

      // Render the URL as an image or link
      if (isImageUrl(url)) {
        elements.push(
          <img 
            key={`img-${startIndex}`} 
            src={url} 
            alt="image" 
            style={{ 
              maxWidth: '200px', 
              maxHeight: '200px', 
              margin: '8px 0',
              borderRadius: '5px' 
            }} 
          />
        );
      } else {
        elements.push(
          <a 
            key={`link-${startIndex}`} 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#3b82f6', textDecoration: 'underline' }}
          >
            {url}
          </a>
        );
      }

      lastIndex = urlRegex.lastIndex;
    }

    // Add any remaining text after the last URL
    if (lastIndex < text.length) {
      elements.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>);
    }

    return elements;
  };

  // Master function that processes the message text
  const renderMessageContent = (text) => {
    if (!text) return null;
    
    // We need to handle different cases in order:
    
    // 1. If there are code blocks, handle them first
    if (isCodeBlock(text)) {
      return renderCodeBlock(text);
    }
    
    // 2. If there are lists, handle them
    if (containsList(text)) {
      return renderLists(text);
    }
    
    // 3. Handle URLs and images
    const urlsPresent = text.match(/https?:\/\/[^\s]+/g);
    if (urlsPresent) {
      return renderUrlsAndImages(text);
    }
    
    // 4. Default - just return the text
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

      {/* Test button for debugging */}
      <button 
        onClick={() => {
          const testMessage = `This is a test message with different formats.

Here's a link: https://example.com

Here's a code example:
\`\`\`javascript
function sum(a, b) {
  return a + b;
}
\`\`\`

Here's a bullet list:
- Item 1
- Item 2
- Item 3

Here's a numbered list:
1. First step
2. Second step
3. Third step`;
          
          addMessage(testMessage, 'bot');
        }}
        style={{
          padding: '8px 16px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '10px',
          cursor: 'pointer'
        }}
      >
        Test Message Rendering
      </button>
    </div>
  );
}

export default ChatInterface;