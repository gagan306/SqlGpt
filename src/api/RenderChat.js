

export async function fetchMessages() {
    try {
      const response = await fetch('http://localhost:5000/api/chat'); 
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }
  