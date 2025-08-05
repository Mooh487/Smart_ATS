import React from "react";
import { Target } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-ats-teal-400 to-ats-teal-500 rounded-lg shadow-md">
              <Target className="w-5 h-5 text-brand-light-text" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-brand-light-text">
              Smart ATS
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Helping job seekers optimize their resumes for ATS compatibility
          </p>

          <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Made with ♥️ for Job Seekers Everywhere, by the Algorithmia SE
              Open Source Team
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              © 2025 Smart ATS. All rights reserved. | Privacy Policy | Terms of
              Service
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
