import { create } from "zustand";
import { AnalysisResult, UploadState } from "../types";
import { reviewAPI } from "../services/reviewAPI";

interface AnalysisStore extends UploadState {
  jobTitle: string;
  setFile: (file: File | null) => void;
  setJobDescription: (description: string) => void;
  setJobTitle: (title: string) => void;
  setAnalyzing: (analyzing: boolean) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setError: (error: string | null) => void;
  saveReview: () => Promise<void>;
  reset: () => void;
}

const initialState: UploadState = {
  file: null,
  jobDescription: "",
  isAnalyzing: false,
  analysisResult: null,
  error: null,
};

export const useAnalysisStore = create<AnalysisStore>((set, get) => ({
  ...initialState,
  jobTitle: "",
  setFile: (file) => set({ file }),
  setJobDescription: (jobDescription) => set({ jobDescription }),
  setJobTitle: (jobTitle) => set({ jobTitle }),
  setAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setAnalysisResult: (analysisResult) => set({ analysisResult }),
  setError: (error) => set({ error }),
  saveReview: async () => {
    const state = get();
    if (!state.analysisResult || !state.file || !state.jobDescription) {
      throw new Error("Missing required data to save review");
    }

    try {
      await reviewAPI.saveReview({
        jobTitle: state.jobTitle || "Untitled Position",
        jobDescription: state.jobDescription,
        resumeFileName: state.file.name,
        matchScore: state.analysisResult.matchScore,
        missingKeywords: state.analysisResult.missingKeywords,
        profileSummary: state.analysisResult.profileSummary,
      });
    } catch (error) {
      console.error("Failed to save review:", error);
      throw error;
    }
  },
  reset: () => set({ ...initialState, jobTitle: "" }),
}));
