import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return await axios.post(`${API_URL}/extract`, formData);
};
