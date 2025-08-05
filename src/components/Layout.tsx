import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnalysisProgress } from './AnalysisProgress';
import { ConnectionStatus } from './ConnectionStatus';
import { useAnalysisStore } from '../store/analysisStore';

export const Layout: React.FC = () => {
  const { isAnalyzing } = useAnalysisStore();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <AnalysisProgress isAnalyzing={isAnalyzing} />
      <ConnectionStatus />
      <Footer />
    </>
  );
};
