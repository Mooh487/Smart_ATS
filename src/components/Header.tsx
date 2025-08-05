import React, { useState, useEffect } from "react";
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

  // Handle escape key and route changes
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Smart ATS</h1>
              <p className="text-sm text-gray-500">Resume Analyzer</p>
            </div>
          </Link>

          {/* Center - Auth Buttons (for non-authenticated users) */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/analyze"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePage("/analyze")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Analyze</span>
                </Link>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePage("/dashboard")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePage("/profile")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.firstName}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="hidden lg:flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Optimize your resume for ATS
                </span>
              </div>
            )}
          </div>

          {/* Mobile menu button - Always visible on small screens */}
          <div className="flex md:hidden">
            <button
              onClick={() => {
                console.log(
                  "Mobile menu button clicked, current state:",
                  isMobileMenuOpen
                );
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="relative p-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors border border-gray-200"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </div>
            </button>
          </div>
          </div>
        </div>
      </header>

      {/* Mobile menu - Rendered outside header for proper positioning */}
      {isMobileMenuOpen && (
        <>
          {console.log(
            "Mobile menu is rendering, isMobileMenuOpen:",
            isMobileMenuOpen
          )}
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 block md:hidden"
            onClick={() => {
              console.log("Backdrop clicked, closing menu");
              setIsMobileMenuOpen(false);
            }}
            aria-hidden="true"
          />

          {/* Mobile menu panel */}
          <div className="fixed top-16 left-0 right-0 bg-white shadow-xl z-50 block md:hidden animate-slide-down border-t border-gray-200 min-h-[200px]">
            <div className="px-4 py-6 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {isAuthenticated ? (
                <>
                  {/* User Welcome Message */}
                  <div className="px-3 py-2 border-b border-gray-100 mb-3">
                    <p className="text-sm font-medium text-gray-900">
                      Welcome, {user?.firstName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  {/* Navigation Links */}
                  <Link
                    to="/analyze"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActivePage("/analyze")
                        ? "text-blue-600 bg-blue-50 border border-blue-200"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Zap className="w-5 h-5" />
                    <span>Analyze Resume</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActivePage("/dashboard")
                        ? "text-blue-600 bg-blue-50 border border-blue-200"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/profile"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActivePage("/profile")
                        ? "text-blue-600 bg-blue-50 border border-blue-200"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>

                  {/* Logout Button */}
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Home Link for non-authenticated users */}
                  <Link
                    to="/"
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActivePage("/")
                        ? "text-blue-600 bg-blue-50 border border-blue-200"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Target className="w-5 h-5" />
                    <span>Home</span>
                  </Link>

                  {/* Info Section */}
                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>Optimize your resume for ATS</span>
                    </div>
                  </div>

                  {/* Auth Buttons */}
                  <div className="pt-3 space-y-2">
                    <Link
                      to="/login"
                      className="block w-full px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 text-center border border-gray-200 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full px-4 py-3 rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 text-center transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
