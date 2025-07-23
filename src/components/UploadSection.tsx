import React from 'react';
import { FileUpload } from './FileUpload';
import { JobDescriptionInput } from './JobDescriptionInput';
import { useAnalysisStore } from '../store/analysisStore';
import { analyzeResume } from '../services/api';
import { AlertCircle, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

export const UploadSection: React.FC = () => {
  const { 
    file, 
    jobDescription, 
    isAnalyzing, 
    setAnalyzing, 
    setAnalysisResult, 
    setError,
    error 
  } = useAnalysisStore();

  const canAnalyze = file && jobDescription.trim().length > 50;

  const handleAnalyze = async () => {
    if (!canAnalyze) return;

    setAnalyzing(true);
    setError(null);

    try {
      toast.loading('Analyzing your resume...', { id: 'analysis' });

      const response = await analyzeResume({
        job_description: jobDescription,
        resume: file!
      });

      // Parse the match score percentage
      let matchScore = 0;
      if (response.jd_match) {
        const scoreStr = response.jd_match.toString().replace('%', '');
        matchScore = parseInt(scoreStr) || 0;
      }

      const result = {
        matchScore,
        missingKeywords: response.missing_keywords || [],
        profileSummary: response.profile_summary || 'No summary available',
        timestamp: new Date()
      };

      setAnalysisResult(result);
      toast.success('Analysis completed successfully!', { id: 'analysis' });
    } catch (error: any) {
      console.error('Analysis error:', error);

      let errorMessage = 'Failed to analyze resume. Please try again.';

      // Handle different types of errors
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 413) {
        errorMessage = 'File too large. Please upload a smaller PDF file.';
      } else if (error.response?.status === 415) {
        errorMessage = 'Unsupported file type. Please upload a PDF file.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      setError(errorMessage);
      toast.error(errorMessage, { id: 'analysis' });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyze Your Resume</h2>
          <p className="text-gray-600">
            Upload your resume and job description to get AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <FileUpload />
          <JobDescriptionInput />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 font-medium">Analysis Failed</p>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze || isAnalyzing}
            className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 ${
              canAnalyze && !isAnalyzing
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Zap className="w-5 h-5 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
          </button>
          
          {!canAnalyze && (
            <p className="text-sm text-gray-500 mt-3">
              {!file ? 'Please upload a resume' : 'Job description needs at least 50 characters'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};