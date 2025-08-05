import React from 'react';
import { Hero } from '../components/Hero';
import { UploadSection } from '../components/UploadSection';
import { AnalysisResults } from '../components/AnalysisResults';
import { useAnalysisStore } from '../store/analysisStore';

export const HomePage: React.FC = () => {
  const { analysisResult, reset } = useAnalysisStore();
  const [showUpload, setShowUpload] = React.useState(false);

  const handleGetStarted = () => {
    setShowUpload(true);
  };

  const handleNewAnalysis = () => {
    reset();
    setShowUpload(true);
  };

  return (
    <div className="min-h-screen">
      {!showUpload && !analysisResult && (
        <Hero onGetStarted={handleGetStarted} />
      )}
      
      {showUpload && !analysisResult && (
        <div id="upload-section">
          <UploadSection />
        </div>
      )}
      
      {analysisResult && (
        <AnalysisResults 
          result={analysisResult} 
          onNewAnalysis={handleNewAnalysis}
        />
      )}
    </div>
  );
};
