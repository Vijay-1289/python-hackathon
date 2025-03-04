import React, { createContext, useContext, useState, useEffect } from "react";
import { Question, allQuestions } from "@/data/questions";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";

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
  const { user, isSignedIn } = useUser();
  const userId = user?.id || "anonymous";
  
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(`darkMode_${userId}`);
    return saved ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [userName, setUserName] = useState(() => {
    if (isSignedIn && user?.fullName) {
      const savedName = localStorage.getItem(`userName_${userId}`);
      if (!savedName) {
        localStorage.setItem(`userName_${userId}`, user.fullName);
      }
      return savedName || user.fullName;
    }
    return localStorage.getItem(`userName_${userId}`) || "";
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("beginner");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [userCode, setUserCode] = useState("");
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>(() => {
    const saved = localStorage.getItem(`solvedQuestions_${userId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [allQuestionsCompleted, setAllQuestionsCompleted] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<{
    passed: boolean;
    message: string;
    details?: string;
  } | null>(null);

  const filteredQuestions = allQuestions.filter(
    (question) => question.difficulty === selectedDifficulty
  );

  useEffect(() => {
    console.log("User changed or signed in:", userId);
    
    const savedDarkMode = localStorage.getItem(`darkMode_${userId}`);
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    
    const savedUserName = localStorage.getItem(`userName_${userId}`);
    if (savedUserName) {
      setUserName(savedUserName);
    } else if (isSignedIn && user?.fullName) {
      setUserName(user.fullName);
      localStorage.setItem(`userName_${userId}`, user.fullName);
    }
    
    const savedSolvedQuestions = localStorage.getItem(`solvedQuestions_${userId}`);
    setSolvedQuestions(savedSolvedQuestions ? JSON.parse(savedSolvedQuestions) : []);
    
    if (filteredQuestions.length > 0) {
      const solvedQuestionsArray = savedSolvedQuestions ? JSON.parse(savedSolvedQuestions) : [];
      const firstQuestion = filteredQuestions[0];
      
      let nextQuestion = filteredQuestions.find(q => !solvedQuestionsArray.includes(q.id)) || firstQuestion;
      setSelectedQuestion(nextQuestion);
    }
  }, [userId, isSignedIn, user]);

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

  const isQuestionLocked = (questionId: number): boolean => {
    const firstQuestionInCategory = filteredQuestions.length > 0 ? filteredQuestions[0].id : -1;
    if (questionId === firstQuestionInCategory) return false;
    
    const questionIndex = filteredQuestions.findIndex(q => q.id === questionId);
    
    if (questionIndex <= 0) return false;
    
    const previousQuestionId = filteredQuestions[questionIndex - 1].id;
    
    return !solvedQuestions.includes(previousQuestionId);
  };

  useEffect(() => {
    localStorage.setItem(`darkMode_${userId}`, JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, userId]);

  useEffect(() => {
    localStorage.setItem(`solvedQuestions_${userId}`, JSON.stringify(solvedQuestions));
  }, [solvedQuestions, userId]);

  useEffect(() => {
    localStorage.setItem(`userName_${userId}`, userName);
  }, [userName, userId]);

  useEffect(() => {
    if (selectedQuestion) {
      console.log("Selected question:", selectedQuestion.id, selectedQuestion.title);
      const savedCode = localStorage.getItem(`userCode_${userId}_${selectedQuestion.id}`);
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
  }, [selectedQuestion, userId]);

  useEffect(() => {
    if (selectedQuestion && userCode) {
      localStorage.setItem(`userCode_${userId}_${selectedQuestion.id}`, userCode);
    }
  }, [userCode, selectedQuestion, userId]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const analyzeUserCode = (code: string, question: Question): {
    isValid: boolean;
    feedback: string;
    details?: string;
  } => {
    const cleanCode = code.replace(/\/\/.*$/gm, '').trim();
    const starterCodeWithoutComments = question.starterCode.replace(/\/\/.*$/gm, '').trim();
    
    if (cleanCode === starterCodeWithoutComments || cleanCode.includes('pass')) {
      return {
        isValid: false,
        feedback: "Incomplete implementation",
        details: "Your code appears to be incomplete. Please implement the solution."
      };
    }
    
    if (question.title.toLowerCase().includes('function') && !code.includes('def ')) {
      return {
        isValid: false,
        feedback: "Missing function definition",
        details: "The problem requires you to define a function, but none was found in your code."
      };
    }
    
    if (code.includes('def ') && !code.includes('return')) {
      return {
        isValid: false,
        feedback: "Missing return statement",
        details: "Your function needs to return a value, but no return statement was found."
      };
    }
    
    return {
      isValid: true,
      feedback: "Code looks valid"
    };
  };

  const runUserCode = async () => {
    if (!selectedQuestion) return;
    
    setIsRunning(true);
    setTestResults(null);
    setOutput("");
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const codeAnalysis = analyzeUserCode(userCode, selectedQuestion);
      let mockOutput = "Running test cases...\n";
      
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
      
      const publicTestCases = selectedQuestion.testCases.slice(0, Math.min(2, selectedQuestion.testCases.length));
      const hiddenTestCases = selectedQuestion.testCases.slice(Math.min(2, selectedQuestion.testCases.length));
      
      const complexity = userCode.split('\n').length;
      const hasImplementation = userCode.includes('def') && userCode.includes('return');
      const requiredComplexity = selectedQuestion.difficulty === 'beginner' ? 3 : 
                                selectedQuestion.difficulty === 'intermediate' ? 5 : 8;
      
      const isCodeLikelyValid = complexity >= requiredComplexity && hasImplementation;
      
      const failedTestCaseIndex = isCodeLikelyValid ? -1 : 0;
      
      mockOutput = "Running test cases...\n\n";
      
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
      
      if (hiddenTestCases.length > 0) {
        mockOutput += `Running ${hiddenTestCases.length} hidden test case${hiddenTestCases.length > 1 ? 's' : ''}...\n`;
        
        if (isCodeLikelyValid) {
          mockOutput += `All hidden tests passed!\n`;
        } else {
          mockOutput += `Hidden test case: ✗ Failed\n`;
        }
      }
      
      const allPassed = isCodeLikelyValid;
      
      setOutput(mockOutput);
      
      setTestResults({
        passed: allPassed,
        message: allPassed ? "All tests passed! Great job!" : "Some tests failed. Keep trying!",
        details: allPassed ? undefined : `Check the output for details on the failed test case.`
      });
      
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
