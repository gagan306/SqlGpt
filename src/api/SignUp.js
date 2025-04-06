import axios from 'axios';

const API_BASE_URL = 'https://localhost:7053';

export const SendSignupDetails = async (Email, Password, Rno) => {
  return axios.post(`${API_BASE_URL}/signUp`, {
    Email: Email,
    passwordHash: Password,
    RegistrationKey: Rno,
  });
};
