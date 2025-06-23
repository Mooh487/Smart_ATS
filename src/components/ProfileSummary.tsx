import React from 'react';
import { User, Lightbulb, CheckCircle } from 'lucide-react';

interface ProfileSummaryProps {
  summary: string;
}

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({ summary }) => {
  // Parse the summary to extract key insights
  const insights = summary.split('.').filter(s => s.trim().length > 0);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <User className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Profile Analysis</h3>
          <p className="text-sm text-gray-500">Personalized insights and recommendations</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Key Recommendations</span>
        </h4>
        
        <div className="grid gap-3">
          {insights.slice(0, 3).map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-blue-600">{index + 1}</span>
              </div>
              <p className="text-sm text-gray-700">{insight.trim()}.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};