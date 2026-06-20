import axios from 'axios';
import authService from './services/authService';

// Configurar axios para enviar token en headers
axios.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;