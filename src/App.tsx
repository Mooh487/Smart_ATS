import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { AnalysisResults } from './components/AnalysisResults';
import { AnalysisProgress } from './components/AnalysisProgress';
import { Footer } from './components/Footer';
import { useAnalysisStore } from './store/analysisStore';

function App() {
  const { analysisResult, isAnalyzing, reset } = useAnalysisStore();
  const [showUpload, setShowUpload] = React.useState(false);

  const handleGetStarted = () => {
    setShowUpload(true);
  };

  const handleNewAnalysis = () => {
    reset();
    setShowUpload(true);
  };

  const scrollToUpload = () => {
    setShowUpload(true);
    setTimeout(() => {
      const uploadSection = document.getElementById('upload-section');
      uploadSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        
        <Header />
        
        <main>
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
        </main>
        
        <AnalysisProgress isAnalyzing={isAnalyzing} />
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;