import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api-mysmartats.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
  };
  token: string;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export const authAPI = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async signup(userData: SignupData): Promise<LoginResponse> {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  async verifyToken(token: string): Promise<User> {
    const response = await api.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user;
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await api.put('/auth/profile', userData);
    return response.data.user;
  },

  async getUserStats(): Promise<{
    totalReviews: number;
    averageScore: number;
    recentReviews: Array<{
      id: string;
      jobTitle: string;
      score: number;
      createdAt: string;
    }>;
  }> {
    const response = await api.get('/auth/stats');
    return response.data;
  },
};
