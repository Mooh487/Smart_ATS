import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, TrendingUp, Users } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAnalyzeClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/analyze");
    }
  };
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Beat the ATS,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {" "}
              Land Your Dream Job
            </span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Upload your resume and job description to get AI-powered insights,
            missing keyword analysis, and actionable recommendations to optimize
            your application for Applicant Tracking Systems.
          </p>

          <div className="mt-10">
            <button
              onClick={handleAnalyzeClick}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isAuthenticated
                ? "Analyze My Resume"
                : "Get Started - Sign In Required"}
              <TrendingUp className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ATS Compatibility
              </h3>
              <p className="text-gray-600">
                Get a detailed match score and identify missing keywords
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600">
                Receive personalized recommendations for improvement
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Professional Reports
              </h3>
              <p className="text-gray-600">
                Export detailed analysis reports to guide your optimization
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
