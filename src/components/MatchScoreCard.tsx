import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MatchScoreCardProps {
  score: number;
}

export const MatchScoreCard: React.FC<MatchScoreCardProps> = ({ score }) => {
  const data = [
    { name: 'Match', value: score },
    { name: 'Gap', value: 100 - score }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const getScoreBorder = (score: number) => {
    if (score >= 80) return 'border-green-200';
    if (score >= 60) return 'border-yellow-200';
    return 'border-red-200';
  };

  const COLORS = {
    80: '#10b981', // green
    60: '#f59e0b', // yellow
    0: '#ef4444'   // red
  };

  const getChartColor = (score: number) => {
    if (score >= 80) return COLORS[80];
    if (score >= 60) return COLORS[60];
    return COLORS[0];
  };

  return (
    <div className={`${getScoreBackground(score)} ${getScoreBorder(score)} border-2 rounded-2xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">ATS Match Score</h3>
        <div className="flex items-center space-x-1">
          {score >= 70 ? (
            <TrendingUp className="w-5 h-5 text-green-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-500" />
          )}
          <span className={`text-sm font-medium ${getScoreColor(score)}`}>
            {score >= 70 ? 'Good Match' : 'Needs Improvement'}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                <Cell fill={getChartColor(score)} />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                {score}%
              </div>
              <div className="text-xs text-gray-500">Match</div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Keywords Match</span>
                <span className={`font-medium ${getScoreColor(score)}`}>{score}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
            
            <div className="text-sm space-y-1">
              <p className={`font-medium ${getScoreColor(score)}`}>
                {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good progress' : 'Room for improvement'}
              </p>
              <p className="text-gray-600">
                {score >= 80 
                  ? 'Your resume is well-optimized for this position.'
                  : score >= 60 
                  ? 'Add more relevant keywords to improve your score.'
                  : 'Focus on including key skills and terms from the job description.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};