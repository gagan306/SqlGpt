import axios from 'axios';

const API_BASE_URL = 'https://localhost:7053';

export const SendLoginDetails = async (Email, Password) => {
    return axios.post(`${API_BASE_URL}/login`, {
      Email : Email,
      PasswordHash: Password,
    }).then(res => res.data);
  };
  