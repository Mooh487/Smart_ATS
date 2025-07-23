import axios from 'axios';
import { AnalysisRequest, AnalysisResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api-mysmartats.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes for analysis (increased for AI processing)
  headers: {
    'Accept': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. The analysis is taking longer than expected.');
    }

    if (error.response?.status === 413) {
      throw new Error('File too large. Please upload a smaller PDF file.');
    }

    if (error.response?.status === 415) {
      throw new Error('Unsupported file type. Please upload a PDF file.');
    }

    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

export const analyzeResume = async (request: AnalysisRequest): Promise<AnalysisResponse> => {
  try {
    const formData = new FormData();
    formData.append('job_description', request.job_description);
    formData.append('resume', request.resume);

    const response = await api.post<AnalysisResponse>('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    // Re-throw with more specific error message
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/');
    return response.status === 200;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};