import axios from 'axios';

// GANTI URL INI dengan Google Apps Script Web App URL setelah deploy
const API_BASE_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentApi = {
  getAll: async () => {
    const response = await api.get('', {
      params: { action: 'getStudents' },
    });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get('', {
      params: { action: 'getStudent', id },
    });
    return response.data;
  },
  
  create: async (studentData) => {
    const response = await api.post('', {
      action: 'createStudent',
      ...studentData,
    });
    return response.data;
  },
  
  update: async (studentData) => {
    const response = await api.post('', {
      action: 'updateStudent',
      ...studentData,
    });
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.post('', {
      action: 'deleteStudent',
      id,
    });
    return response.data;
  },
};

export const statsApi = {
  getStats: async () => {
    const response = await api.get('', {
      params: { action: 'getStats' },
    });
    return response.data;
  },
};

export default api;
