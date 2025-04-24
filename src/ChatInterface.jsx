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
    // Unescape backticks and normalize line endings
    const normalizedText = text
      .replace(/\\`/g, '`')
      .replace(/\\r\\n/g, '\n')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n');
    setMessages((prevMessages) => [...prevMessages, { text: normalizedText, sender }]);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const renderCodeBlock = (text) => {
    const parts = [];
    let lastIndex = 0;
    // Updated regex to handle both formatted and unformatted code blocks
    const codeBlockRegex = /(?:```)?(\w+)\n([\s\S]*?)(?:```|(?=\n\w+\n)|$)/g;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {processText(text.substring(lastIndex, match.index))}
          </span>
        );
      }

      const language = match[1] || 'plaintext';
      const code = match[2].trim();

      // Only render as code block if it looks like code
      if (language && code && (language !== 'plaintext' || code.includes('{') || code.includes('def') || code.includes('function'))) {
        parts.push(
          <div key={`code-${match.index}`} className="code-block" style={{
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '16px',
            borderRadius: '8px',
            margin: '12px 0',
            overflowX: 'auto',
            fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            position: 'relative',
            width: '100%'
          }}>
            {language !== 'plaintext' && (
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '12px',
                color: '#858585',
                fontSize: '0.85rem',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.1)'
              }}>
                {language}
              </div>
            )}
            <pre style={{ 
              margin: 0, 
              whiteSpace: 'pre-wrap',
              background: 'transparent',
              color: 'inherit',
              padding: 0,
              border: 'none'
            }}>
              <code style={{
                fontFamily: 'inherit',
                fontSize: 'inherit',
                background: 'transparent',
                padding: 0
              }}>{code}</code>
            </pre>
          </div>
        );
      } else {
        // If it doesn't look like code, treat it as regular text
        parts.push(
          <span key={`text-${match.index}`}>
            {processText(match[0])}
          </span>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {processText(text.substring(lastIndex))}
        </span>
      );
    }

    return <>{parts}</>;
  };

  const processText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    let inList = false;
    let listType = null;
    let listItems = [];
    let listCounter = 1;

    const renderList = () => {
      if (!listItems.length) return null;
      const ListComponent = listType === 'ordered' ? 'ol' : 'ul';
      const list = (
        <ListComponent key={`list-${listItems.length}`} style={{ 
          paddingLeft: '2rem',
          margin: '0.5rem 0',
          color: '#fff'
        }}>
          {listItems.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>
              {processUrls(item)}
            </li>
          ))}
        </ListComponent>
      );
      listItems = [];
      inList = false;
      listType = null;
      listCounter = 1;
      return list;
    };

    const processedLines = [];
    let previousLineEmpty = true;
    
    lines.forEach((line, i) => {
      const bulletMatch = line.match(/^(\s*)[-*]\s+(.+)$/);
      const numberMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
      const trimmedLine = line.trim();

      // Check if this line could be a list item
      const couldBeListItem = previousLineEmpty && trimmedLine && !trimmedLine.startsWith('Here') && !trimmedLine.startsWith('And');

      if (bulletMatch) {
        if (!inList || listType !== 'unordered') {
          if (inList) processedLines.push(renderList());
          inList = true;
          listType = 'unordered';
        }
        listItems.push(bulletMatch[2]);
      } else if (numberMatch) {
        if (!inList || listType !== 'ordered') {
          if (inList) processedLines.push(renderList());
          inList = true;
          listType = 'ordered';
        }
        listItems.push(numberMatch[3]);
      } else if (couldBeListItem && !inList) {
        // Start a new list if line looks like it could be a list item
        inList = true;
        listType = previousLineEmpty ? 'ordered' : 'unordered';
        listItems.push(trimmedLine);
      } else if (couldBeListItem && inList) {
        // Continue existing list
        listItems.push(trimmedLine);
      } else {
        if (inList) {
          processedLines.push(renderList());
        }
        if (trimmedLine) {
          processedLines.push(
            <p key={i} style={{ margin: '0.75rem 0', color: '#fff' }}>
              {processUrls(trimmedLine)}
            </p>
          );
        } else {
          processedLines.push(<br key={i} />);
        }
      }

      previousLineEmpty = !trimmedLine;
    });

    if (inList) {
      processedLines.push(renderList());
    }

    return <>{processedLines}</>;
  };

  const processUrls = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = [];
    let match;
    let lastIndex = 0;

    while ((match = urlRegex.exec(text)) !== null) {
      const url = match[0];
      const startIndex = match.index;

      if (startIndex > lastIndex) {
        parts.push(text.substring(lastIndex, startIndex));
      }

      if (isImageUrl(url)) {
        parts.push(
          <img
            key={startIndex}
            src={url}
            alt="Shared content"
            style={{
              maxWidth: '300px',
              maxHeight: '200px',
              margin: '8px 0',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          />
        );
      } else {
        parts.push(
          <a
            key={startIndex}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#3b82f6',
              textDecoration: 'underline',
              wordBreak: 'break-all'
            }}
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

    return parts.map((part, i) => 
      typeof part === 'string' ? <span key={i}>{part}</span> : part
    );
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
        <div style={{ position: 'relative', zIndex: 1 }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                marginBottom: '16px'
              }}
            >
              <div
                style={{
                  background: msg.sender === 'user' 
                    ? 'rgba(59, 130, 246, 0.2)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: '#FFF',
                  display: 'inline-block',
                  padding: '16px',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  margin: '5px 0',
                  wordBreak: 'break-word',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  textAlign: 'left'
                }}
              >
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