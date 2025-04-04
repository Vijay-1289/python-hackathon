
import React, { createContext, useContext, useState, useEffect } from "react";
import { Question, allQuestions } from "@/data/questions";
import { languageQuestions } from "@/data/languageQuestions";
import { toast } from "@/hooks/use-toast";

interface AppContextType {
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  filteredQuestions: any[];
  selectedQuestion: any;
  setSelectedQuestion: (question: any) => void;
  userCode: string;
  setUserCode: (code: string) => void;
  runUserCode: () => void;
  testResults: any;
  output: string;
  isRunning: boolean;
  solvedQuestions: number[];
  allQuestionsCompleted: boolean;
  userName: string;
  setUserName: (name: string) => void;
  isQuestionLocked: (questionId: number) => boolean;
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  unlockNextQuestion: (currentQuestionId: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [userCode, setUserCode] = useState("");
  const [testResults, setTestResults] = useState(null);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>([]);
  const [userName, setUserName] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("Python");
  const [hasShownInitialHelp, setHasShownInitialHelp] = useState(false);

  // Get questions based on current language
  const getQuestionsForLanguage = () => {
    // If we have language-specific questions, use those, otherwise fallback to the general questions
    return languageQuestions[currentLanguage] || allQuestions;
  };
  
  // Filter questions based on difficulty
  const filteredQuestions = getQuestionsForLanguage().filter(
    (question) => question.difficulty === selectedDifficulty
  );

  // Check if a question should be locked (user needs to solve previous questions first)
  const isQuestionLocked = (questionId: number) => {
    // Make sure we have the correct question list for this language
    const questions = getQuestionsForLanguage();
    
    // Find the question by ID
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex <= 0) return false; // First question is never locked
    
    // Get the previous question in the same difficulty level
    const prevQuestion = questions[questionIndex - 1];
    if (!prevQuestion) return false;
    
    // Check if previous question is solved
    return !solvedQuestions.includes(prevQuestion.id);
  };

  // Function to unlock the next question after solving the current one
  const unlockNextQuestion = (currentQuestionId: number) => {
    const questions = getQuestionsForLanguage();
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
    
    if (currentIndex !== -1 && currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1];
      
      // Add a small delay to show the success animation first
      setTimeout(() => {
        toast({
          title: "New challenge unlocked! 🎉",
          description: `You've unlocked "${nextQuestion.title}"`,
        });
      }, 1500);
    }
  };

  // Set initial question based on difficulty
  useEffect(() => {
    if (filteredQuestions.length > 0 && !selectedQuestion) {
      setSelectedQuestion(filteredQuestions[0]);
      setUserCode(filteredQuestions[0].starterCode);
    }
  }, [selectedDifficulty, filteredQuestions, selectedQuestion]);

  // Update code when question changes
  useEffect(() => {
    if (selectedQuestion) {
      setUserCode(selectedQuestion.starterCode);
    }
  }, [selectedQuestion]);

  // Show initial help tooltip
  useEffect(() => {
    if (!hasShownInitialHelp && selectedQuestion) {
      setTimeout(() => {
        toast({
          title: "Welcome to CodeMaster!",
          description: "Solve the challenge and click 'Run Code' to test your solution.",
        });
        setHasShownInitialHelp(true);
      }, 1000);
    }
  }, [selectedQuestion, hasShownInitialHelp]);

  // Check if all questions are completed
  const allQuestionsCompleted = solvedQuestions.length === getQuestionsForLanguage().length;

  // Run user code function (simulated)
  const runUserCode = () => {
    setIsRunning(true);
    setOutput("");
    setTestResults(null);
    
    // Simulate code execution delay
    setTimeout(() => {
      try {
        // Simplified testing logic (in a real app, this would compile and run the code)
        const passed = Math.random() > 0.3; // 70% chance to pass for demo purposes
        
        // Show console output
        setOutput(`Running ${currentLanguage} code...\n\n${userCode}\n\nEvaluating test cases...\n`);
        
        // Set test results
        setTestResults({
          passed,
          message: passed ? "All tests passed!" : "Some tests failed.",
          details: passed 
            ? "Your solution is correct and efficient." 
            : "Check your logic and edge cases."
        });
        
        // If tests passed, add question to solved list
        if (passed && selectedQuestion && !solvedQuestions.includes(selectedQuestion.id)) {
          setSolvedQuestions([...solvedQuestions, selectedQuestion.id]);
          
          // Unlock next question
          unlockNextQuestion(selectedQuestion.id);
        }
        
        setIsRunning(false);
      } catch (error) {
        setOutput(`Error: ${error.message}`);
        setTestResults({
          passed: false,
          message: "Error occurred while running your code",
          details: error.message
        });
        setIsRunning(false);
      }
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{
        selectedDifficulty,
        setSelectedDifficulty,
        filteredQuestions,
        selectedQuestion,
        setSelectedQuestion,
        userCode,
        setUserCode,
        runUserCode,
        testResults,
        output,
        isRunning,
        solvedQuestions,
        allQuestionsCompleted,
        userName,
        setUserName,
        isQuestionLocked,
        currentLanguage,
        setCurrentLanguage,
        unlockNextQuestion
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
