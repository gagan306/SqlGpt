// src/api/api.js

export async function fetchMessages() {
    try {
      const response = await fetch('http://localhost:5000/api/messages'); // your backend URL
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      return data; // should be an array of message objects
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }
  