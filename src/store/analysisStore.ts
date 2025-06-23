import { create } from 'zustand';
import { AnalysisResult, UploadState } from '../types';

interface AnalysisStore extends UploadState {
  setFile: (file: File | null) => void;
  setJobDescription: (description: string) => void;
  setAnalyzing: (analyzing: boolean) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState: UploadState = {
  file: null,
  jobDescription: '',
  isAnalyzing: false,
  analysisResult: null,
  error: null,
};

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  ...initialState,
  setFile: (file) => set({ file }),
  setJobDescription: (jobDescription) => set({ jobDescription }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisResult: (analysisResult) => set({ analysisResult }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));