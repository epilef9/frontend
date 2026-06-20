import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:3000/api';

// Configurar axios para enviar token
axios.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// TURNOS
export const turnosAPI = {
  getAll: () => axios.get(`${API_URL}/turnos`),
  getById: (id) => axios.get(`${API_URL}/turnos/${id}`),
  getByCliente: (clienteId) => axios.get(`${API_URL}/turnos/cliente/${clienteId}`),
  getByBarbero: (barberoId) => axios.get(`${API_URL}/turnos/barbero/${barberoId}`),
  create: (data) => axios.post(`${API_URL}/turnos`, data),
  update: (id, data) => axios.put(`${API_URL}/turnos/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/turnos/${id}`)
};

// SERVICIOS
export const serviciosAPI = {
  getAll: () => axios.get(`${API_URL}/servicios`),
  getById: (id) => axios.get(`${API_URL}/servicios/${id}`),
  create: (data) => axios.post(`${API_URL}/servicios`, data),
  update: (id, data) => axios.put(`${API_URL}/servicios/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/servicios/${id}`)
};

// USUARIOS
export const usuariosAPI = {
  getAll: () => axios.get(`${API_URL}/usuarios`),
  getById: (id) => axios.get(`${API_URL}/usuarios/${id}`),
  create: (data) => axios.post(`${API_URL}/usuarios`, data),
  update: (id, data) => axios.put(`${API_URL}/usuarios/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/usuarios/${id}`)
};