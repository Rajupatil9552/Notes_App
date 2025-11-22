import axios from 'axios';

const API_BASE_URL = 'https://notes-app-f9s2.onrender.com' || 'http://localhost:3000';

console.log('🔧 API Base URL:', API_BASE_URL); // Debug

const API = axios.create({
  baseURL: `${API_BASE_URL}/note`, // This adds /note to all requests
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    console.log('🌐 Making API request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const notesAPI = {
  getAllNotes: async () => {
    const response = await API.get('/get-all-note'); // This becomes /note/get-all-note
    return response.data;
  },
  
  createNote: async (noteData) => {
    const response = await API.post('/create-note', noteData);
    return response.data;
  },
  
  updateNote: async (id, noteData) => {
    const response = await API.patch('/update-note', { 
      id: id, 
      title: noteData.title, 
      description: noteData.description 
    });
    return response.data;
  },
  
  deleteNote: async (id) => {
    const response = await API.delete('/delete-note', { 
      data: { id: id } 
    });
    return response.data;
  }
};

export default API;
