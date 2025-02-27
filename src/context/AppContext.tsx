
import React, { createContext, useContext, useState, useEffect } from "react";
import { Question, allQuestions } from "@/data/questions";
import { toast } from "@/hooks/use-toast";

type Difficulty = "beginner" | "intermediate" | "pro";

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  selectedDifficulty: Difficulty;
  setSelectedDifficulty: (difficulty: Difficulty) => void;
  filteredQuestions: Question[];
  selectedQuestion: Question | null;
  setSelectedQuestion: (question: Question | null) => void;
  userCode: string;
  setUserCode: (code: string) => void;
  runUserCode: () => void;
  isRunning: boolean;
  output: string;
  testResults: {
    passed: boolean;
    message: string;
    details?: string;
  } | null;
  solvedQuestions: number[];
}

const defaultContext: AppContextType = {
  darkMode: false,
  toggleDarkMode: () => {},
  selectedDifficulty: "beginner",
  setSelectedDifficulty: () => {},
  filteredQuestions: [],
  selectedQuestion: null,
  setSelectedQuestion: () => {},
  userCode: "",
  setUserCode: () => {},
  runUserCode: () => {},
  isRunning: false,
  output: "",
  testResults: null,
  solvedQuestions: [],
};

export const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User preferences
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Question & progress tracking
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("beginner");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [userCode, setUserCode] = useState("");
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>(() => {
    const saved = localStorage.getItem("solvedQuestions");
    return saved ? JSON.parse(saved) : [];
  });

  // Running code & results
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<{
    passed: boolean;
    message: string;
    details?: string;
  } | null>(null);

  // Filtered questions based on selected difficulty
  const filteredQuestions = allQuestions.filter(
    (question) => question.difficulty === selectedDifficulty
  );

  // Effects for persistence
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("solvedQuestions", JSON.stringify(solvedQuestions));
  }, [solvedQuestions]);

  // Set initial user code when selecting a question
  useEffect(() => {
    if (selectedQuestion) {
      const savedCode = localStorage.getItem(`userCode_${selectedQuestion.id}`);
      if (savedCode) {
        setUserCode(savedCode);
      } else {
        setUserCode(selectedQuestion.starterCode);
      }
      setTestResults(null);
      setOutput("");
    } else {
      setUserCode("");
    }
  }, [selectedQuestion]);

  // Save user code for the selected question
  useEffect(() => {
    if (selectedQuestion && userCode) {
      localStorage.setItem(`userCode_${selectedQuestion.id}`, userCode);
    }
  }, [userCode, selectedQuestion]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Run the user's code against test cases
  const runUserCode = async () => {
    if (!selectedQuestion) return;
    
    setIsRunning(true);
    setTestResults(null);
    setOutput("");
    
    // Simulate code execution delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // In a real app, this would send the code to a backend for evaluation
      // Here we'll simulate the evaluation with some mock output
      
      let mockOutput = "Running test cases...\n";
      
      // Show only a subset of test cases (public test cases)
      const publicTestCases = selectedQuestion.testCases.slice(0, Math.min(2, selectedQuestion.testCases.length));
      const hiddenTestCases = selectedQuestion.testCases.slice(Math.min(2, selectedQuestion.testCases.length));
      
      // For demo purposes, we'll randomly pass or fail test cases
      // In a real app, this would execute the code against the test cases
      let failedPublicTestCase = Math.random() > 0.7 ? Math.floor(Math.random() * publicTestCases.length) : -1;
      
      // Show results for public test cases
      publicTestCases.forEach((testCase, index) => {
        const passed = failedPublicTestCase !== index;
        mockOutput += `Test ${index + 1}: ${passed ? "✓ Passed" : "✗ Failed"}\n`;
        
        if (!passed) {
          mockOutput += `  Input: ${testCase.input}\n`;
          mockOutput += `  Expected: ${testCase.expected}\n`;
          mockOutput += `  Got: Something different\n`;
        } else {
          mockOutput += `  Input: ${testCase.input}\n`;
          mockOutput += `  Output: ${testCase.expected}\n`;
        }
      });
      
      // For hidden test cases, just show that they exist but not their details
      if (hiddenTestCases.length > 0) {
        mockOutput += `\nRunning ${hiddenTestCases.length} hidden test case${hiddenTestCases.length > 1 ? 's' : ''}...\n`;
        
        // For demo, randomly fail a hidden test case
        const failedHiddenTestCase = Math.random() > 0.7 ? Math.floor(Math.random() * hiddenTestCases.length) : -1;
        
        if (failedHiddenTestCase !== -1) {
          mockOutput += `Hidden test ${failedHiddenTestCase + 1}: ✗ Failed\n`;
          failedPublicTestCase = 0; // This is fine now as we changed it to 'let'
        } else {
          mockOutput += `All hidden tests passed!\n`;
        }
      }
      
      const allPassed = failedPublicTestCase === -1;
      
      setOutput(mockOutput);
      
      setTestResults({
        passed: allPassed,
        message: allPassed ? "All tests passed! Great job!" : "Some tests failed. Keep trying!",
        details: allPassed ? undefined : `Check the output for details on the failed test case.`
      });
      
      // If all tests passed and this question wasn't already solved, mark it as solved
      if (allPassed && !solvedQuestions.includes(selectedQuestion.id)) {
        setSolvedQuestions(prev => [...prev, selectedQuestion.id]);
        toast({
          title: "Question Solved!",
          description: "You've successfully solved this problem.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error running code. Please try again.");
      setTestResults({
        passed: false,
        message: "Error evaluating your code",
        details: "There was a problem executing your solution."
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        selectedDifficulty,
        setSelectedDifficulty,
        filteredQuestions,
        selectedQuestion,
        setSelectedQuestion,
        userCode,
        setUserCode,
        runUserCode,
        isRunning,
        output,
        testResults,
        solvedQuestions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
