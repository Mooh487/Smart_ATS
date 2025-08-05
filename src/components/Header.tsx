import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FileText,
  Target,
  Menu,
  X,
  User,
  LogOut,
  BarChart3,
  Zap,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ui/ThemeToggle";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-brand-dark-bg shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-ats-teal-400 to-ats-teal-500 rounded-lg shadow-md">
              <Target className="w-6 h-6 text-brand-light-text" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 dark:text-brand-light-text">
                Smart ATS
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Resume Analyzer
              </p>
            </div>
          </Link>

          {/* Center - Auth Buttons (for non-authenticated users) */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 dark:text-gray-200 hover:text-ats-teal-600 dark:hover:text-ats-teal-400"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-gradient-to-r from-ats-teal-400 to-ats-teal-500 hover:from-ats-teal-500 hover:to-ats-teal-600 text-brand-light-text border-0"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Right Side - Navigation & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle size="sm" />

            {/* Authenticated User Navigation */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/analyze"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePage("/analyze")
                      ? "text-ats-teal-600 dark:text-ats-teal-400 bg-ats-teal-50 dark:bg-ats-teal-900/20"
                      : "text-gray-700 dark:text-gray-200 hover:text-ats-teal-600 dark:hover:text-ats-teal-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Analyze</span>
                </Link>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePage("/dashboard")
                      ? "text-ats-teal-600 dark:text-ats-teal-400 bg-ats-teal-50 dark:bg-ats-teal-900/20"
                      : "text-gray-700 dark:text-gray-200 hover:text-ats-teal-600 dark:hover:text-ats-teal-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePage("/profile")
                      ? "text-ats-teal-600 dark:text-ats-teal-400 bg-ats-teal-50 dark:bg-ats-teal-900/20"
                      : "text-gray-700 dark:text-gray-200 hover:text-ats-teal-600 dark:hover:text-ats-teal-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Welcome, {user?.firstName}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </div>
            )}

            {/* Non-authenticated user info */}
            {!isAuthenticated && (
              <div className="hidden lg:flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Optimize your resume for ATS
                </span>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle size="sm" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ats-teal-500"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 bg-white dark:bg-brand-dark-bg">
            <div className="space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/analyze"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActivePage("/analyze")
                        ? "text-ats-teal-600 dark:text-ats-teal-400 bg-ats-teal-50 dark:bg-ats-teal-900/20"
                        : "text-gray-700 dark:text-gray-200 hover:text-ats-teal-600 dark:hover:text-ats-teal-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Zap className="w-5 h-5" />
                    <span>Analyze</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActivePage("/dashboard")
                        ? "text-ats-teal-600 dark:text-ats-teal-400 bg-ats-teal-50 dark:bg-ats-teal-900/20"
                        : "text-gray-700 dark:text-gray-200 hover:text-ats-teal-600 dark:hover:text-ats-teal-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActivePage("/profile")
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Welcome, {user?.firstName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
