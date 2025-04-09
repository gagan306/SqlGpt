import axios from 'axios';
 
 const API_BASE_URL = 'https://localhost:7053';
 
 export const sendChatQuestion = async (questionText) => {
   try {
     const response = await axios.post(`${API_BASE_URL}/chat`, {
       question: questionText,
     });
     return response.data; 
   } catch (error) {
     console.error('API error:', error);
     throw error;
   }
 };