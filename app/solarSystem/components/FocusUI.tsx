import React, { useRef, useEffect } from 'react';
import { useCamTarget } from '../cameraStore';

export default function FocusUI() {
  const target = useCamTarget((s) => s.target);
  const focusHistory = useCamTarget((s) => s.focusHistory);
  const focusPrevious = useCamTarget((s) => s.focusPrevious);
  
  // Only subscribe to isTransitioning to minimize re-renders
  const isTransitioning = useCamTarget((s) => s.transition.isTransitioning);
  const transitionProgress = useCamTarget((s) => s.transition.progress); // Still need this for the bar

  const progressBarRef = useRef<HTMLDivElement>(null);

  // Directly update the progress bar width without re-rendering the component
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${transitionProgress * 100}%`;
    }
  }, [transitionProgress]);

  if (!target.name) return null;

  return (
    <div className="absolute top-5 left-5 z-50 bg-black/80 text-white p-4 rounded-lg min-w-[200px]">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-300 mb-1">Current Focus</h3>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: target.type === 'sun' ? '#ff6b35' : 
                             target.type === 'planet' ? '#4ecdc4' : '#45b7d1' 
            }}
          />
          <span className="font-medium">{target.name}</span>
          <span className="text-xs text-gray-400 capitalize">({target.type})</span>
        </div>
      </div>

      {focusHistory.length > 0 && (
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-gray-300 mb-2">Recent</h4>
          <div className="space-y-1">
            {focusHistory.slice(-3).reverse().map((item, index) => (
              <button
                key={`${item.id}-${index}`}
                onClick={() => focusPrevious()}
                className="block w-full text-left text-xs text-gray-300 hover:text-white transition-colors"
                disabled={isTransitioning}
              >
                ← {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {isTransitioning && (
        <div className="text-xs text-yellow-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Transitioning...
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
            <div 
              ref={progressBarRef}
              className="bg-yellow-400 h-1 rounded-full transition-all duration-100"
              style={{ width: `0%` }} // Initial width, will be updated by useEffect
            />
          </div>
        </div>
      )}
    </div>
  );
}

