import axios from 'axios';

const API_BASE_URL = 'https://run.mocky.io/v3/83c5bab4-7d19-46cb-b990-d61391e61656';

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
