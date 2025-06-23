import axios from 'axios';
import { AnalysisRequest, AnalysisResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 seconds for analysis
});

export const analyzeResume = async (request: AnalysisRequest): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append('job_description', request.job_description);
  formData.append('resume', request.resume);

  const response = await api.post<AnalysisResponse>('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    await api.get('/');
    return true;
  } catch {
    return false;
  }
};