
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

interface CertificateProps {
  userName: string;
  onClose: () => void;
}

const Certificate = ({ userName, onClose }: CertificateProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { selectedDifficulty } = useAppContext();
  
  useEffect(() => {
    // Trigger confetti explosion
    const duration = 5 * 1000;
    const end = Date.now() + duration;
    
    const colors = ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'];
    
    const launchConfetti = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      });
      
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(launchConfetti);
      }
    };
    
    // Delay the certificate appearance for a small moment
    setTimeout(() => {
      setIsVisible(true);
      launchConfetti();
    }, 300);
    
    return () => {
      setIsVisible(false);
    };
  }, []);

  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-3xl w-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-4 border-indigo-300 dark:border-indigo-700 rounded-xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          >
            <div className="absolute inset-0 bg-white/80 dark:bg-black/40 backdrop-blur-sm"></div>
            
            <div className="relative p-8 md:p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <div className="text-xl text-indigo-600 dark:text-indigo-400 font-serif">Certificate of Achievement</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="mb-8"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white font-serif">Python Challenge</h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mb-10"
              >
                <p className="text-lg text-gray-600 dark:text-gray-300">This certifies that</p>
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300 my-4 font-serif">{userName || "Coding Champion"}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  has successfully completed all <span className="font-semibold capitalize">{selectedDifficulty}</span> Python challenges,
                  demonstrating exceptional coding skills and problem-solving abilities.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col md:flex-row justify-between items-center mt-12 mb-6 gap-6"
              >
                <div className="text-left">
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold">Date Completed</div>
                  <div className="text-gray-800 dark:text-gray-200">{dateFormatted}</div>
                </div>
                
                <div className="h-20 w-40 border-b-2 border-indigo-600 dark:border-indigo-400">
                  <div className="text-right text-indigo-600 dark:text-indigo-400 font-bold mt-auto">Python Challenge</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="mt-8"
              >
                <Button 
                  variant="outline" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white border-none"
                  onClick={onClose}
                >
                  Continue Learning
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Certificate;
