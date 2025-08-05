import axios from "axios";
import { AnalysisRequest, AnalysisResponse } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://mysmartatsapi.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutes for analysis (increased for AI processing)
  headers: {
    Accept: "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
    });
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      data: response.data,
    });

    // Validate response data structure
    if (response.config.url?.includes("/analyze") && response.data) {
      const data = response.data;
      if (!data.jd_match && !data.error) {
        console.warn("Invalid response structure from analyze endpoint");
      }
    }

    return response;
  },
  (error) => {
    console.error("API Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    });

    // Handle specific error cases
    if (error.code === "ECONNABORTED") {
      throw new Error(
        "Request timeout. The AI analysis is taking longer than expected. Please try again."
      );
    }

    if (error.response?.status === 413) {
      throw new Error(
        "File too large. Please upload a PDF file smaller than 16MB."
      );
    }

    if (error.response?.status === 415) {
      throw new Error("Unsupported file type. Please upload a PDF file only.");
    }

    if (error.response?.status === 400) {
      const errorMsg =
        error.response?.data?.error || "Bad request. Please check your input.";
      throw new Error(errorMsg);
    }

    if (error.response?.status >= 500) {
      throw new Error(
        "Server error. The AI service may be temporarily unavailable. Please try again later."
      );
    }

    if (error.code === "ERR_NETWORK") {
      throw new Error(
        "Network error. Please check your internet connection and try again."
      );
    }

    return Promise.reject(error);
  }
);

export const analyzeResume = async (
  request: AnalysisRequest
): Promise<AnalysisResponse> => {
  try {
    console.log("Sending analyze request:", {
      jobDescriptionLength: request.job_description.length,
      resumeFileName: request.resume.name,
      resumeSize: request.resume.size,
    });

    const formData = new FormData();
    formData.append("job_description", request.job_description);
    formData.append("resume", request.resume);

    // Add job title if provided
    if (request.job_title) {
      formData.append("job_title", request.job_title);
    }

    const response = await api.post<AnalysisResponse>("/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Validate response structure
    const data = response.data;
    if (!data.jd_match || !data.profile_summary) {
      console.warn("Incomplete response from API:", data);

      // Return a fallback response if data is incomplete
      return {
        jd_match: data.jd_match || "0%",
        missing_keywords: data.missing_keywords || [],
        profile_summary:
          data.profile_summary || "Analysis completed but summary unavailable.",
      };
    }

    console.log("Analysis successful:", {
      match: data.jd_match,
      keywordsCount: data.missing_keywords?.length || 0,
      summaryLength: data.profile_summary?.length || 0,
    });

    return data;
  } catch (error: any) {
    console.error("Analyze request failed:", error);

    // Re-throw with more specific error message
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    // Handle cases where the response contains partial data
    if (error.response?.data && typeof error.response.data === "object") {
      const data = error.response.data;
      if (data.jd_match || data.profile_summary) {
        console.log("Partial data received despite error, using it");
        return {
          jd_match: data.jd_match || "0%",
          missing_keywords: data.missing_keywords || [],
          profile_summary:
            data.profile_summary || "Analysis partially completed.",
        };
      }
    }

    throw error;
  }
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get("/");
    return response.status === 200;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
};
