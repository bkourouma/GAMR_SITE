'use client';

import { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';

export function SecurityIndexSimulator() {
  const [securityIndex, setSecurityIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Set client flag after first render
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation effect to cycle through security index values
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setSecurityIndex(prev => {
        const next = prev + 1;
        return next > 52 ? 0 : next;  // Reset to 0 when reaching 52
      });
    }, 80);  // Update every 80ms
    
    return () => clearInterval(interval);
  }, [isClient]);

  // Helper function to get the appropriate color based on the security index value
  const getSecurityColor = (value: number) => {
    if (value <= 10) return 'bg-red-500';
    if (value <= 20) return 'bg-red-400';
    if (value <= 30) return 'bg-orange-500';
    if (value <= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Helper function to get the appropriate label based on the security index value
  const getSecurityLabel = (value: number) => {
    if (value <= 10) return 'Critique';
    if (value <= 20) return 'Élevé';
    if (value <= 30) return 'Modéré';
    if (value <= 40) return 'Faible';
    return 'Excellent';
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg max-w-lg w-full">
      <div className="text-center space-y-4">
        {/* Title */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Indice de Sécurité</h3>
        </div>
        
        {/* Progress Bar and Label */}
        <div className="space-y-3">
          {/* Progress Bar Implementation */}
          <div className="relative">
            {/* Background Track */}
            <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
              {/* Animated Fill */}
              <div 
                className={`h-full ${getSecurityColor(securityIndex)} transition-all duration-300 ease-out rounded-full flex items-center justify-end pr-3`}
                style={{ width: `${(securityIndex / 60) * 100}%` }}
              >
                {securityIndex > 0 && (
                  <span className="text-white font-bold text-sm">{securityIndex}</span>
                )}
              </div>
            </div>
            
            {/* Scale markers */}
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40</span>
              <span>50</span>
              <span>60</span>
            </div>
          </div>

          {/* Status Label Implementation */}
          <div className="flex justify-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              securityIndex <= 10 ? 'bg-red-500/20 text-red-700' :
              securityIndex <= 20 ? 'bg-red-400/20 text-red-700' :
              securityIndex <= 30 ? 'bg-orange-500/20 text-orange-700' :
              securityIndex <= 40 ? 'bg-yellow-500/20 text-yellow-700' :
              'bg-green-500/20 text-green-700'
            }`}>
              {getSecurityLabel(securityIndex)}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600">
          Notre IA calcule automatiquement l'indice de sécurité de votre organisation
        </p>
      </div>
    </div>
  );
}