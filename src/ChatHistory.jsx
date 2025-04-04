import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

function BodyOnlyExample() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://run.mocky.io/')
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

  const groupChatsByDate = (chats) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const groups = {
      Today: [],
      Yesterday: [],
      Others: []
    };

    chats.forEach((chat) => {
      const chatDate = new Date(chat.date);
      if (chatDate.toDateString() === today.toDateString()) {
        groups.Today.push(chat);
      } else if (chatDate.toDateString() === yesterday.toDateString()) {
        groups.Yesterday.push(chat);
      } else {
        groups.Others.push(chat);
      }
    });

    return groups;
  };

  if (loading) return <div>Loading...</div>;

  const groupedChats = groupChatsByDate(chats);

  return (
    <div style={{
      marginLeft: '5rem',
      marginTop: '5rem'
    }}>
      {groupedChats.Today.length > 0 && (
        <div>
          <h4>Today</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {groupedChats.Today.map((chat, index) => (
              <Card
                key={index}
                style={{
                  minWidth: '18rem',  // Minimum width instead of fixed width
                  height: '6rem',
                  border: '2px solid gray',
                  borderRadius: '9px',
                  marginTop: '10px',
                  marginBottom: '30px'
                }}
              >
                <Card.Body>
                  <Card.Title>{chat.title}</Card.Title>
                  <Card.Text>{chat.content}</Card.Text>
                  <Card.Link href="#">Open Chat</Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}

      {groupedChats.Yesterday.length > 0 && (
        <div>
          <h4>Yesterday</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {groupedChats.Yesterday.map((chat, index) => (
              <Card
                key={index}
                style={{
                  minWidth: '18rem',  // Minimum width instead of fixed width
                  height: '6rem',
                  border: '2px solid gray',
                  borderRadius: '9px',
                  marginTop: '10px',
                  marginBottom: '30px'
                }}
              >
                <Card.Body>
                  <Card.Title>{chat.title}</Card.Title>  
                  <Card.Text>{chat.content}</Card.Text>
                  <Card.Link href="#">Open Chat</Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}

      {groupedChats.Others.length > 0 && (
        <div>
          <h4>Other</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {groupedChats.Others.map((chat, index) => (
              <Card
                key={index}
                style={{
                  minWidth: '18rem',  // Minimum width instead of fixed width
                  height: '6rem',
                  border: '2px solid gray',
                  borderRadius: '9px',
                  marginTop: '10px'
                }}
              >
                <Card.Body>
                  <Card.Title>{chat.title}</Card.Title>
                  <Card.Text>{chat.content}</Card.Text>
                  <Card.Link href="#">Open Chat</Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BodyOnlyExample;