import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UploadSection } from '../components/UploadSection';
import { AnalysisResults } from '../components/AnalysisResults';
import { useAnalysisStore } from '../store/analysisStore';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export const AnalyzePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { analysisResult, reset } = useAnalysisStore();

  const handleNewAnalysis = () => {
    reset();
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <Container>
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToDashboard}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Resume Analysis</h1>
                    <p className="text-sm text-gray-600">
                      Welcome back, {user?.firstName}! Analyze your resume for ATS compatibility.
                    </p>
                  </div>
                </div>
              </div>
              
              {analysisResult && (
                <Button
                  variant="outline"
                  onClick={handleNewAnalysis}
                  className="flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>New Analysis</span>
                </Button>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <div className="py-8">
        {!analysisResult ? (
          <div>
            {/* Welcome Section */}
            <Container className="mb-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Optimize Your Resume?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Upload your resume and job description to get AI-powered insights, 
                  missing keyword analysis, and actionable recommendations.
                </p>
              </div>
            </Container>

            {/* Upload Section */}
            <UploadSection />
          </div>
        ) : (
          <AnalysisResults 
            result={analysisResult} 
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </div>

      {/* Tips Section - Only show when no analysis result */}
      {!analysisResult && (
        <div className="py-12 bg-white">
          <Container>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tips for Better Results
              </h3>
              <p className="text-gray-600">
                Follow these best practices to get the most accurate analysis
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-xl font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Use PDF Format</h4>
                <p className="text-sm text-gray-600">
                  Upload your resume in PDF format for best text extraction
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-xl font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Complete Job Description</h4>
                <p className="text-sm text-gray-600">
                  Provide the full job description for accurate keyword matching
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-xl font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Clear Formatting</h4>
                <p className="text-sm text-gray-600">
                  Use standard fonts and clear section headers in your resume
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-xl font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Review Results</h4>
                <p className="text-sm text-gray-600">
                  Carefully review suggestions and implement relevant changes
                </p>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};
