
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useAppContext } from '@/context/AppContext';

const AnimationEffects = () => {
  const { testResults } = useAppContext();
  const [showEffect, setShowEffect] = useState(false);
  
  useEffect(() => {
    if (!testResults) return;
    
    setShowEffect(true);
    
    // Clear effect after animation completes
    const timer = setTimeout(() => {
      setShowEffect(false);
    }, 3000);
    
    // Handle success animation with confetti
    if (testResults.passed) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;
      
      const successConfetti = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(successConfetti);
        }
      };
      
      successConfetti();
    }
    
    return () => clearTimeout(timer);
  }, [testResults]);
  
  if (!showEffect || !testResults) return null;
  
  return (
    <>
      {/* Failure effect */}
      {!testResults.passed && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-red-500/20 animate-failure-pulse" />
          <div className="absolute inset-0 animate-shake" />
        </div>
      )}
    </>
  );
};

export default AnimationEffects;
