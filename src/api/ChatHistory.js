

// chatService.js
export const fetchChats = async () => {
  try {
    const response = await fetch('https://run.mocky.io/v3/f948c20c-fd50-4059-a422-6432551d391d');
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching chats:', error);
    return [];
  }
};
