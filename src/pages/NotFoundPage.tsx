import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { useAuth } from '../contexts/AuthContext';

export const NotFoundPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container size="md">
        <div className="text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-9xl font-bold text-blue-200 select-none">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Target className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Oops! Page not found
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-gray-500">
              Don't worry, let's get you back on track with your resume optimization journey.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="lg" className="w-full">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <Search className="w-5 h-5 mr-2" />
              Quick Links
            </h2>
            
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                🏠 Home - Resume Analysis
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    📊 Dashboard - Your Stats
                  </Link>
                  <Link 
                    to="/profile" 
                    className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    👤 Profile - Account Settings
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    🔑 Login - Access Your Account
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    ✨ Sign Up - Create Account
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-sm text-gray-500">
            <p>
              If you believe this is an error, please{' '}
              <a href="mailto:support@smartats.com" className="text-blue-600 hover:text-blue-500">
                contact our support team
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
