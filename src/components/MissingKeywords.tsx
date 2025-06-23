import React from 'react';
import { AlertTriangle, TrendingUp, Hash } from 'lucide-react';

interface MissingKeywordsProps {
  keywords: string[];
}

export const MissingKeywords: React.FC<MissingKeywordsProps> = ({ keywords }) => {
  const getImportanceLevel = (index: number) => {
    if (index < 3) return 'high';
    if (index < 6) return 'medium';
    return 'low';
  };

  const getImportanceColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImportanceIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="w-3 h-3" />;
      case 'medium': return <TrendingUp className="w-3 h-3" />;
      case 'low': return <Hash className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Missing Keywords</h3>
        <span className="text-sm text-gray-500">{keywords.length} keywords to add</span>
      </div>

      {keywords.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-green-600 font-medium">Great job!</p>
          <p className="text-gray-600">Your resume includes all the important keywords.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {keywords.map((keyword, index) => {
              const importance = getImportanceLevel(index);
              return (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium flex items-center space-x-2 ${getImportanceColor(importance)}`}
                >
                  {getImportanceIcon(importance)}
                  <span>{keyword}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">How to improve:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Focus on <span className="text-red-600 font-medium">high-priority</span> keywords first</li>
              <li>• Naturally integrate keywords into your experience descriptions</li>
              <li>• Include keywords in your skills section</li>
              <li>• Use variations and synonyms of important terms</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};