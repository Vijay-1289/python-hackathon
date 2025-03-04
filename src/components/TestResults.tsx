
import React, { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { CheckCircleIcon, XCircleIcon, TerminalIcon, CodeIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

const TestResults = () => {
  const { testResults, output, selectedQuestion } = useAppContext();
  
  // Effect to trigger animations based on test results
  useEffect(() => {
    if (!testResults) return;
    
    if (testResults.passed) {
      // Success animation - trigger confetti
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 5000
      };
      
      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }
      
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      
      fire(0.2, {
        spread: 60,
      });
      
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } else {
      // Failure animation is handled by the motion components in the UI
      // The screen shake effect is applied directly to the result component
    }
  }, [testResults]);
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-zinc-100 flex items-center justify-between dark:border-zinc-800">
        <div className="flex items-center">
          <TerminalIcon className="h-4 w-4 mr-2 text-zinc-700 dark:text-zinc-300" />
          <h2 className="font-medium text-zinc-900 dark:text-zinc-100">Test Results</h2>
        </div>
        {testResults && !testResults.passed && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => {
              const aiAssistantButton = document.querySelector('[data-ai-assistant]') as HTMLButtonElement;
              if (aiAssistantButton) aiAssistantButton.click();
            }}
          >
            <CodeIcon className="h-3 w-3 mr-1" />
            Get AI help
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {output ? (
          <div>
            <pre className="font-mono text-sm whitespace-pre-wrap bg-zinc-50 p-4 rounded-xl dark:bg-zinc-800/50">{output}</pre>
            
            <AnimatePresence>
              {testResults && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    ...(testResults.passed ? {} : {
                      x: [0, -10, 10, -10, 10, 0],
                      transition: { 
                        x: { duration: 0.5, ease: "easeInOut" }
                      }
                    })
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "mt-4 p-4 rounded-xl border",
                    testResults.passed 
                      ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-300" 
                      : "border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {testResults.passed ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
                    )}
                    <span className="font-medium">{testResults.message}</span>
                  </div>
                  {testResults.details && (
                    <p className="mt-2 text-sm">{testResults.details}</p>
                  )}
                  
                  {!testResults.passed && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 text-sm"
                    >
                      <p className="font-medium">Debugging Tips:</p>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li>Double-check your algorithm logic</li>
                        <li>Test your code with edge cases</li>
                        <li>Check for off-by-one errors</li>
                        <li>Verify your function returns the correct data type</li>
                        <li>Use the AI Assistant for smart hints without full solutions</li>
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-zinc-500 text-sm flex flex-col items-center justify-center h-full p-4 dark:text-zinc-400">
            <TerminalIcon className="h-12 w-12 mb-4 text-zinc-300 dark:text-zinc-700" />
            <p className="text-center">Run your code to see the test results here</p>
            <p className="text-center text-xs mt-2">Some test cases will be hidden like in real coding challenges</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default TestResults;
