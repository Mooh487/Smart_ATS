import React from 'react';
import { MatchScoreCard } from './MatchScoreCard';
import { MissingKeywords } from './MissingKeywords';
import { ProfileSummary } from './ProfileSummary';
import { ResultsActions } from './ResultsActions';
import { AnalysisResult } from '../types';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  result, 
  onNewAnalysis 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Analysis Complete!</h2>
        <p className="text-gray-600">Here's how your resume performs against the job description</p>
      </div>

      <div className="space-y-8">
        {/* Match Score */}
        <MatchScoreCard score={result.matchScore} />

        {/* Missing Keywords and Profile Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MissingKeywords keywords={result.missingKeywords} />
          <ProfileSummary summary={result.profileSummary} />
        </div>

        {/* Actions */}
        <ResultsActions 
          onNewAnalysis={onNewAnalysis}
          analysisData={result}
        />
      </div>
    </div>
  );
};