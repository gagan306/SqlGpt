// ChatHistory.js
import React, { useEffect, useState } from 'react';


function ChatHistory() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://run.mocky.io/v3/f948c20c-fd50-4059-a422-6432551d391d')
      .then((response) => response.json())
      .then((data) => {
        setChats(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching chats:', error);
        setLoading(false);
      });
  }, []);

  return <ChatHistoryUI chats={chats} loading={loading} />;
}

export default ChatHistory;
