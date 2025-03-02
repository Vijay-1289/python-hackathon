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
  isQuestionLocked: (questionId: number) => boolean;
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
  isQuestionLocked: () => true,
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

  // Check if a question is locked (previous questions must be solved)
  const isQuestionLocked = (questionId: number): boolean => {
    // First question in each difficulty is always unlocked
    const firstQuestionInCategory = filteredQuestions.length > 0 ? filteredQuestions[0].id : -1;
    if (questionId === firstQuestionInCategory) return false;
    
    // Find the previous question in the same difficulty/category
    const questionIndex = filteredQuestions.findIndex(q => q.id === questionId);
    
    // If question not found or it's the first question, it's not locked
    if (questionIndex <= 0) return false;
    
    // Get the previous question's ID
    const previousQuestionId = filteredQuestions[questionIndex - 1].id;
    
    // Question is locked if the previous question hasn't been solved
    return !solvedQuestions.includes(previousQuestionId);
  };

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
      console.log("Selected question:", selectedQuestion.id, selectedQuestion.title);
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

  // Function to evaluate Python code
  const evaluatePythonCode = (code: string, testCase: { input: string, expected: string }) => {
    try {
      // Extract function name from input string (e.g., "add_numbers(5, 7)" -> "add_numbers")
      const functionName = testCase.input.split("(")[0].trim();
      
      // Create a full test script
      const testScript = `
${code}

# Run the test case
result = ${testCase.input}
print(str(result))
`;
      
      // In a real application, this would send the test script to a backend
      // Here we're simulating execution client-side for demonstration
      
      // For demo purposes, we'll do a very basic check
      // This is not real Python execution! Just a demo approximation
      let result = "undefined";
      
      // Very basic string evaluation for simple cases
      // WARNING: This is NOT secure or comprehensive Python execution
      // A real implementation would need a backend service
      if (code.includes(`def ${functionName}`)) {
        // Extract logic for specific functions to simulate their behavior
        // This is a demonstration and won't work for all functions
        if (functionName === "hello_world") {
          result = '"Hello, World!"';
        } 
        else if (functionName === "add_numbers" && testCase.input.includes("(")) {
          const params = testCase.input.split("(")[1].split(")")[0].split(",");
          if (params.length === 2) {
            const a = parseInt(params[0].trim());
            const b = parseInt(params[1].trim());
            result = String(a + b);
          }
        }
        else if (functionName === "is_even") {
          const params = testCase.input.split("(")[1].split(")")[0].trim();
          const num = parseInt(params);
          result = num % 2 === 0 ? '"Even"' : '"Odd"';
        }
        // Add more function implementations as needed
      }
      
      // Compare result with expected
      return {
        result: result.replace(/^"|"$/g, ''), // Remove quotes if present
        passed: result.replace(/^"|"$/g, '') === testCase.expected.replace(/^"|"$/g, ''),
        error: null
      };
    } catch (error) {
      return {
        result: "",
        passed: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  };

  // Run the user's code against test cases
  const runUserCode = async () => {
    if (!selectedQuestion) return;
    
    setIsRunning(true);
    setTestResults(null);
    setOutput("");
    
    try {
      // In a real app, this would send the code to a backend for evaluation
      // Here we'll simulate code execution with our basic evaluator
      
      let mockOutput = "Running test cases...\n";
      let allTestsPassed = true;
      let firstFailedTestDetails = "";
      
      // Divide test cases into public and hidden
      const publicTestCases = selectedQuestion.testCases.slice(0, Math.min(2, selectedQuestion.testCases.length));
      const hiddenTestCases = selectedQuestion.testCases.slice(Math.min(2, selectedQuestion.testCases.length));
      
      // Process public test cases
      for (let i = 0; i < publicTestCases.length; i++) {
        const testCase = publicTestCases[i];
        const evaluation = evaluatePythonCode(userCode, testCase);
        
        if (evaluation.passed) {
          mockOutput += `Test ${i + 1}: ✓ Passed\n`;
          mockOutput += `  Input: ${testCase.input}\n`;
          mockOutput += `  Output: ${evaluation.result}\n`;
        } else {
          allTestsPassed = false;
          mockOutput += `Test ${i + 1}: ✗ Failed\n`;
          mockOutput += `  Input: ${testCase.input}\n`;
          mockOutput += `  Expected: ${testCase.expected}\n`;
          mockOutput += `  Got: ${evaluation.result}\n`;
          
          if (!firstFailedTestDetails) {
            firstFailedTestDetails = `Failed on input "${testCase.input}" - Expected: ${testCase.expected}, Got: ${evaluation.result}`;
          }
          
          if (evaluation.error) {
            mockOutput += `  Error: ${evaluation.error}\n`;
          }
        }
      }
      
      // Process hidden test cases
      if (hiddenTestCases.length > 0 && allTestsPassed) {
        mockOutput += `\nRunning ${hiddenTestCases.length} hidden test case${hiddenTestCases.length > 1 ? 's' : ''}...\n`;
        
        for (let i = 0; i < hiddenTestCases.length; i++) {
          const testCase = hiddenTestCases[i];
          const evaluation = evaluatePythonCode(userCode, testCase);
          
          if (!evaluation.passed) {
            allTestsPassed = false;
            mockOutput += `Hidden test ${i + 1}: ✗ Failed\n`;
            
            if (!firstFailedTestDetails) {
              firstFailedTestDetails = `Failed on a hidden test case. Make sure your solution handles all possible inputs correctly.`;
            }
            
            break;  // Stop after first failed hidden test
          }
        }
        
        if (allTestsPassed) {
          mockOutput += `All hidden tests passed!\n`;
        }
      }
      
      setOutput(mockOutput);
      
      setTestResults({
        passed: allTestsPassed,
        message: allTestsPassed ? "All tests passed! Great job!" : "Some tests failed. Keep trying!",
        details: allTestsPassed ? undefined : firstFailedTestDetails
      });
      
      // If all tests passed and this question wasn't already solved, mark it as solved
      if (allTestsPassed && !solvedQuestions.includes(selectedQuestion.id)) {
        setSolvedQuestions(prev => [...prev, selectedQuestion.id]);
        toast({
          title: "Question Solved!",
          description: "You've successfully solved this problem. You can now move to the next question.",
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
        isQuestionLocked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
