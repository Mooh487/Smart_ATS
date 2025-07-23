import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { checkHealth } from '../services/api';

export const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const healthy = await checkHealth();
      setIsConnected(healthy);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isConnected === null && !isChecking) {
    return null; // Don't show anything while initial check is happening
  }

  const getStatusColor = () => {
    if (isChecking) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (isConnected) return 'text-green-600 bg-green-50 border-green-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusIcon = () => {
    if (isChecking) return <AlertCircle className="w-4 h-4" />;
    if (isConnected) return <Wifi className="w-4 h-4" />;
    return <WifiOff className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (isChecking) return 'Checking connection...';
    if (isConnected) return 'API Connected';
    return 'API Disconnected';
  };

  return (
    <div className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-lg border text-sm font-medium flex items-center space-x-2 ${getStatusColor()}`}>
      {getStatusIcon()}
      <span>{getStatusText()}</span>
      {!isConnected && !isChecking && (
        <button
          onClick={checkConnection}
          className="ml-2 text-xs underline hover:no-underline"
        >
          Retry
        </button>
      )}
    </div>
  );
};
