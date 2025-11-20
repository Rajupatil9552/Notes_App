import axios from 'axios';

// Use Vite environment variables - they must be prefixed with VITE_
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with base URL
const API = axios.create({
  baseURL: process.env.BACKEND_URL, // Your backend port
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data || error.message,
      url: error.config?.url
    });
    
    // Handle specific error cases
    if (error.response?.status === 404) {
      error.message = 'Server not found. Please check if backend is running.';
    } else if (error.response?.status === 500) {
      error.message = 'Server error. Please try again later.';
    } else if (error.code === 'ECONNREFUSED') {
      error.message = 'Cannot connect to server. Please make sure backend is running.';
    }
    
    return Promise.reject(error);
  }
);

// API methods matching your backend routes
export const notesAPI = {
  // Get all notes (non-deleted)
  getAllNotes: async () => {
    const response = await API.get('/get-all-note');
    return response.data;
  },
  
  // Create new note
  createNote: async (noteData) => {
    const response = await API.post('/create-note', noteData);
    return response.data;
  },
  
  // Update note
  updateNote: async (id, noteData) => {
    const response = await API.patch('/update-note', { 
      id: id, 
      title: noteData.title, 
      description: noteData.description 
    });
    return response.data;
  },
  
  // Delete note (soft delete)
  deleteNote: async (id) => {
    const response = await API.delete('/delete-note', { 
      data: { id: id } 
    });
    return response.data;
  },
  
  // Get deleted notes (if needed)
  getDeletedNotes: async () => {
    const response = await API.get('/get-deleted-note');
    return response.data;
  },
};

export default API;
