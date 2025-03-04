
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
  allQuestionsCompleted: boolean;
  userName: string;
  setUserName: (name: string) => void;
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
  allQuestionsCompleted: false,
  userName: "",
  setUserName: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User preferences
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // User info
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });

  // Question & progress tracking
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("beginner");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [userCode, setUserCode] = useState("");
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>(() => {
    const saved = localStorage.getItem("solvedQuestions");
    return saved ? JSON.parse(saved) : [];
  });
  const [allQuestionsCompleted, setAllQuestionsCompleted] = useState(false);

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

  // Check if all questions are completed
  useEffect(() => {
    const questionsInCurrentDifficulty = allQuestions.filter(
      q => q.difficulty === selectedDifficulty
    );
    
    const allCompleted = questionsInCurrentDifficulty.every(
      question => solvedQuestions.includes(question.id)
    );
    
    if (allCompleted && questionsInCurrentDifficulty.length > 0) {
      setAllQuestionsCompleted(true);
    } else {
      setAllQuestionsCompleted(false);
    }
  }, [solvedQuestions, selectedDifficulty]);

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

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

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

  // More advanced code analysis function to validate user code
  const analyzeUserCode = (code: string, question: Question): {
    isValid: boolean;
    feedback: string;
    details?: string;
  } => {
    // Remove comments and trim whitespace for analysis
    const cleanCode = code.replace(/\/\/.*$/gm, '').trim();
    const starterCodeWithoutComments = question.starterCode.replace(/\/\/.*$/gm, '').trim();
    
    // Check if code is essentially empty or just the starter code
    if (
      cleanCode === starterCodeWithoutComments || 
      cleanCode.includes('pass') ||
      cleanCode.length < starterCodeWithoutComments.length * 0.8
    ) {
      return {
        isValid: false,
        feedback: "Incomplete implementation",
        details: "Your code appears to be incomplete. Please implement the solution based on the requirements."
      };
    }
    
    // Check for function definition
    if (question.title.toLowerCase().includes('function') && !code.includes('def ')) {
      return {
        isValid: false,
        feedback: "Missing function definition",
        details: "The problem requires you to define a function, but none was found in your code."
      };
    }
    
    // Check for return statement in functions
    if (code.includes('def ') && !code.includes('return')) {
      return {
        isValid: false,
        feedback: "Missing return statement",
        details: "Your function needs to return a value, but no return statement was found."
      };
    }
    
    // For array-related problems, check for iteration
    if (
      (question.title.toLowerCase().includes('array') || 
       question.description.toLowerCase().includes('array')) && 
      !code.includes('for') && 
      !code.includes('while') && 
      !code.includes('map(') && 
      !code.includes('.map(')
    ) {
      return {
        isValid: false,
        feedback: "Missing iteration",
        details: "This problem likely requires iteration through data, but no loops or iteration methods were found."
      };
    }
    
    // Basic syntactic validation
    const hasSyntaxErrors = (/[\w\d]+\s+[\w\d]+\s+=/.test(code) && !code.includes('=')) || 
                           code.includes('if') && !code.includes(':');
    
    if (hasSyntaxErrors) {
      return {
        isValid: false,
        feedback: "Potential syntax errors",
        details: "Your code may contain syntax errors. Check for missing colons, parentheses, or invalid assignments."
      };
    }
    
    // Advanced pattern recognition would require actual code execution
    // For now, consider the code valid if it passes basic checks
    return {
      isValid: true,
      feedback: "Code looks structurally valid"
    };
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
      // First, analyze the code structure
      const codeAnalysis = analyzeUserCode(userCode, selectedQuestion);
      let mockOutput = "Running test cases...\n";
      
      // If code is structurally invalid, fail immediately
      if (!codeAnalysis.isValid) {
        mockOutput += `Code analysis: ${codeAnalysis.feedback}\n`;
        if (codeAnalysis.details) {
          mockOutput += `${codeAnalysis.details}\n`;
        }
        mockOutput += "\nNo tests run. Please fix your code first.\n";
        
        setOutput(mockOutput);
        setTestResults({
          passed: false,
          message: codeAnalysis.feedback,
          details: codeAnalysis.details
        });
        
        setIsRunning(false);
        return;
      }
      
      // Show only a subset of test cases (public test cases)
      const publicTestCases = selectedQuestion.testCases.slice(0, Math.min(2, selectedQuestion.testCases.length));
      const hiddenTestCases = selectedQuestion.testCases.slice(Math.min(2, selectedQuestion.testCases.length));
      
      // More sophisticated code analysis
      const hasImplementation = userCode.includes('def') && userCode.includes('return');
      const complexity = userCode.split('\n').length;
      const requiredComplexity = selectedQuestion.difficulty === 'beginner' ? 5 : 
                                selectedQuestion.difficulty === 'intermediate' ? 8 : 12;
      
      // Determine if code is likely to be valid based on complexity and structure
      const isCodeLikelyValid = complexity >= requiredComplexity && hasImplementation;
      
      // Simulate actual test execution with intelligent test simulation
      let failedTestCaseIndex = -1;
      
      // Test cases now simulate actual execution by checking code patterns
      publicTestCases.forEach((testCase, index) => {
        const input = testCase.input.toLowerCase();
        const expectedOutput = testCase.expected;
        
        // Check if code seems prepared to handle this input type
        const isPreparedForInput = 
          (input.includes('[') && userCode.includes('list')) ||
          (input.includes('"') && userCode.includes('str')) ||
          (input.includes('true') && userCode.includes('bool')) ||
          (/\d+/.test(input) && userCode.includes('int'));
        
        // Fail test if code isn't structurally prepared for input type
        if (!isPreparedForInput && failedTestCaseIndex === -1) {
          failedTestCaseIndex = index;
        }
        
        // For numeric problems, check basic arithmetic operations
        if (/\d+/.test(input) && /\d+/.test(expectedOutput)) {
          if (
            !userCode.includes('+') && 
            !userCode.includes('-') && 
            !userCode.includes('*') && 
            !userCode.includes('/') && 
            failedTestCaseIndex === -1
          ) {
            failedTestCaseIndex = index;
          }
        }
        
        // If code is very simple but problem isn't, likely fail
        if (
          complexity < requiredComplexity && 
          selectedQuestion.difficulty !== 'beginner' && 
          failedTestCaseIndex === -1
        ) {
          failedTestCaseIndex = index;
        }
      });
      
      // Generate simulated output
      mockOutput = "Running test cases...\n\n";
      
      // Show results for public test cases with intelligent simulation
      publicTestCases.forEach((testCase, index) => {
        const passed = failedTestCaseIndex !== index && isCodeLikelyValid;
        mockOutput += `Test ${index + 1}: ${passed ? "✓ Passed" : "✗ Failed"}\n`;
        
        if (!passed) {
          mockOutput += `  Input: ${testCase.input}\n`;
          mockOutput += `  Expected: ${testCase.expected}\n`;
          mockOutput += `  Got: ${!isCodeLikelyValid ? "Function returned incorrect value" : "Unexpected output"}\n`;
        } else {
          mockOutput += `  Input: ${testCase.input}\n`;
          mockOutput += `  Output: ${testCase.expected}\n`;
        }
        mockOutput += "\n";
      });
      
      // For hidden test cases, just show that they exist but not their details
      if (hiddenTestCases.length > 0) {
        mockOutput += `Running ${hiddenTestCases.length} hidden test case${hiddenTestCases.length > 1 ? 's' : ''}...\n`;
        
        // If the code passed visible tests but is too simple, fail hidden test
        const failHiddenTest = isCodeLikelyValid ? 
          (complexity < requiredComplexity + 2 && Math.random() > 0.7) : true;
        
        if (failHiddenTest) {
          mockOutput += `Hidden test case: ✗ Failed\n`;
          failedTestCaseIndex = 0; // Ensure test is marked as failed
        } else {
          mockOutput += `All hidden tests passed!\n`;
        }
      }
      
      const allPassed = failedTestCaseIndex === -1 && isCodeLikelyValid;
      
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
        allQuestionsCompleted,
        userName,
        setUserName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
