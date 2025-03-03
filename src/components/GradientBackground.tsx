
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
    
    // Colors to transition between
    const colors = [
      [147, 39, 143],   // Purple
      [234, 172, 232],  // Pink
      [67, 124, 205],   // Blue
      [89, 193, 189],   // Teal
      [147, 39, 143]    // Back to Purple to complete cycle
    ];
    
    let step = 0;
    const speed = 0.002;
    
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
      
      // Create a radial gradient effect for 3D illusion
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
      gradient.addColorStop(0.7, `rgba(${r * 0.8}, ${g * 0.8}, ${b * 0.8}, 0.8)`);
      gradient.addColorStop(1, `rgba(${r * 0.6}, ${g * 0.6}, ${b * 0.6}, 0.6)`);
      
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
