import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { MessageCircleIcon, XIcon, BrainIcon, SparklesIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const AIAssistant = () => {
  const { userCode, selectedQuestion, testResults } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hintLevel, setHintLevel] = useState<'gentle' | 'specific' | 'detailed'>('gentle');

  // Analyze code whenever userCode changes or when test results come in
  useEffect(() => {
    if (!isOpen || !selectedQuestion || !userCode) return;
    
    analyzeCode();
  }, [isOpen, userCode, testResults]);

  const analyzeCode = async () => {
    if (!selectedQuestion || !userCode) return;
    
    setIsAnalyzing(true);
    
    // In a real implementation, this would call an AI service
    // For now, we'll simulate AI analysis with logic-based hints
    setTimeout(() => {
      const codeAnalysis = analyzeUserCode(userCode, selectedQuestion, testResults, hintLevel);
      setHint(codeAnalysis);
      setIsAnalyzing(false);
    }, 1000);
  };

  const analyzeUserCode = (
    code: string, 
    question: any, 
    results: any,
    level: 'gentle' | 'specific' | 'detailed'
  ): string => {
    // Remove comments and trim whitespace for analysis
    const cleanCode = code.replace(/\/\/.*$/gm, '').trim();
    const starterCode = question.starterCode.replace(/\/\/.*$/gm, '').trim();
    
    // Check if code is essentially unchanged from starter code
    if (cleanCode === starterCode || cleanCode.includes('pass') || cleanCode.length < starterCode.length) {
      return "You haven't modified the starter code yet. Try implementing your solution based on the problem description.";
    }
    
    // Check for test results feedback
    if (results && !results.passed) {
      // Failed test case analysis
      if (level === 'gentle') {
        return `I noticed your code didn't pass all test cases. Double-check your algorithm's logic, especially how it handles the example cases shown in the problem description.`;
      } else if (level === 'specific') {
        return `Your code failed some test cases. Look at how your algorithm processes inputs - check for edge cases like empty inputs, negative numbers, or boundary conditions that might be causing issues.`;
      } else {
        // Find specific hints based on common algorithm problems
        if (code.includes('for') && !code.includes('return')) {
          return `Your loop logic looks good, but I don't see a return statement. Make sure you're returning the final result after processing.`;
        } else if (!code.includes('for') && !code.includes('while') && question.title.toLowerCase().includes('array')) {
          return `This problem likely requires iteration through the array. Consider using a for loop or array methods like map, filter, or reduce.`;
        } else {
          return `I analyzed your code and found potential issues. Check your algorithm logic, especially how you're handling the transformation from input to output. The test cases expect specific formatting and data types.`;
        }
      }
    }
    
    // Provide general hints based on code patterns
    if (!code.includes('def') && question.title.toLowerCase().includes('function')) {
      return `Make sure you've defined a function as required by the problem statement.`;
    }
    
    if (results && results.passed) {
      return `Great job! Your solution passed all test cases. If you want to improve it further, you could consider code optimization or readability.`;
    }
    
    return `I've analyzed your code. You're on the right track! Remember to focus on the core problem and test your solution with different inputs.`;
  };

  const getNextHintLevel = () => {
    const levels: ('gentle' | 'specific' | 'detailed')[] = ['gentle', 'specific', 'detailed'];
    const currentIndex = levels.indexOf(hintLevel);
    const nextIndex = (currentIndex + 1) % levels.length;
    return levels[nextIndex];
  };

  const handleHintLevelChange = () => {
    setHintLevel(getNextHintLevel());
    analyzeCode();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border dark:border-zinc-800 overflow-hidden z-50"
          >
            <div className="p-3 border-b dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800">
              <div className="flex items-center gap-2">
                <BrainIcon className="h-4 w-4 text-indigo-500" />
                <h3 className="font-medium text-sm">Code Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="max-h-60 p-4">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <SparklesIcon className="h-8 w-8 text-indigo-500 animate-pulse mb-2" />
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Analyzing your code...</p>
                </div>
              ) : hint ? (
                <div className="space-y-2">
                  <p className="text-sm">{hint}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-zinc-500">
                      Hint level: <span className="font-medium capitalize">{hintLevel}</span>
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleHintLevelChange}
                      className="text-xs h-7"
                    >
                      More {hintLevel === 'detailed' ? 'gentle' : 'specific'} hints
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Write some code and I'll provide helpful hints without giving away the solution.
                </p>
              )}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-full w-12 h-12 p-0 shadow-lg",
            isOpen ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white" : "bg-indigo-600 hover:bg-indigo-700"
          )}
        >
          <MessageCircleIcon className="h-5 w-5" />
        </Button>
      </motion.div>
    </>
  );
};

export default AIAssistant;
