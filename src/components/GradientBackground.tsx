
import React, { useEffect, useRef } from 'react';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match viewport
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Softer colors for a more subtle gradient
    const colors = [
      [220, 230, 255],  // Light blue
      [230, 240, 255],  // Lighter blue
      [245, 245, 255],  // Almost white
      [235, 235, 250],  // Very light lavender
      [220, 230, 255]   // Back to light blue to complete cycle
    ];
    
    let step = 0;
    const speed = 0.001; // Slower transition
    
    const drawGradient = () => {
      // Create gradient
      const currentIndex = Math.floor(step);
      const nextIndex = (currentIndex + 1) % colors.length;
      const transition = step - currentIndex;
      
      // Interpolate between colors
      const currentColor = colors[currentIndex];
      const nextColor = colors[nextIndex];
      
      const r = Math.floor(currentColor[0] + (nextColor[0] - currentColor[0]) * transition);
      const g = Math.floor(currentColor[1] + (nextColor[1] - currentColor[1]) * transition);
      const b = Math.floor(currentColor[2] + (nextColor[2] - currentColor[2]) * transition);
      
      // Create a subtle radial gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
      gradient.addColorStop(0.7, `rgba(${r * 0.98}, ${g * 0.98}, ${b * 0.98}, 0.9)`);
      gradient.addColorStop(1, `rgba(${r * 0.95}, ${g * 0.95}, ${b * 0.95}, 0.8)`);
      
      // Fill canvas with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Move to next step
      step = (step + speed) % colors.length;
      
      requestAnimationFrame(drawGradient);
    };
    
    drawGradient();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{ opacity: 0.7 }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
