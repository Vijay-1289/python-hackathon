
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
    
    // Pink and blue color palette
    const colors = [
      [253, 222, 226],  // Light pink
      [214, 194, 250],  // Light purple/lavender
      [173, 216, 255],  // Light blue
      [213, 184, 255],  // Soft purple
      [253, 222, 226],  // Back to light pink to complete cycle
    ];
    
    let step = 0;
    const speed = 0.0008; // Slower transition
    
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
      
      // Create a radial gradient from top-left to bottom-right
      const gradient = ctx.createLinearGradient(
        0, 
        0, 
        canvas.width, 
        canvas.height
      );
      
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`);
      gradient.addColorStop(0.5, `rgba(${r*0.8}, ${g*0.9}, ${b*1.1}, 0.95)`);
      gradient.addColorStop(1, `rgba(${r*0.9}, ${g*0.85}, ${b*1.05}, 0.9)`);
      
      // Fill canvas with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some subtle circular highlights
      const highlightCount = 3;
      for (let i = 0; i < highlightCount; i++) {
        const x = canvas.width * (0.2 + 0.6 * Math.sin(step * 0.5 + i));
        const y = canvas.height * (0.2 + 0.6 * Math.cos(step * 0.3 + i));
        const radius = Math.min(canvas.width, canvas.height) * (0.1 + 0.05 * Math.sin(step + i));
        
        const highlight = ctx.createRadialGradient(
          x, y, 0,
          x, y, radius
        );
        
        highlight.addColorStop(0, `rgba(255, 255, 255, 0.1)`);
        highlight.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.fillStyle = highlight;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
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
        style={{ opacity: 0.9 }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;
