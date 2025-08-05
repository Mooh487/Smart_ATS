export interface AnalysisRequest {
  job_description: string;
  resume: File;
  job_title?: string;
}

export interface AnalysisResponse {
  jd_match: string;
  missing_keywords: string[];
  profile_summary: string;
}

export interface AnalysisResult {
  matchScore: number;
  missingKeywords: string[];
  profileSummary: string;
  timestamp: Date;
  jobTitle?: string;
}

export interface UploadState {
  file: File | null;
  jobDescription: string;
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
  error: string | null;
}
