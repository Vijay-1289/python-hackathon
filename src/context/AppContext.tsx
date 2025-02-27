
import React, { createContext, useContext, useState, useEffect } from "react";
import { Question, allQuestions } from "@/data/questions";
import { toast } from "@/hooks/use-toast";

type Difficulty = "beginner" | "intermediate" | "pro";

interface LeaderboardEntry {
  username: string;
  solvedCount: number;
  level: Difficulty;
}

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
  leaderboard: LeaderboardEntry[];
  username: string;
  setUsername: (name: string) => void;
  solvedQuestions: number[];
  calculateUserProgress: () => {
    totalSolved: number;
    beginnerSolved: number;
    intermediateSolved: number;
    proSolved: number;
  };
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
  leaderboard: [],
  username: "",
  setUsername: () => {},
  solvedQuestions: [],
  calculateUserProgress: () => ({
    totalSolved: 0,
    beginnerSolved: 0,
    intermediateSolved: 0,
    proSolved: 0,
  }),
};

export const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User preferences
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
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

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    const saved = localStorage.getItem("leaderboard");
    return saved
      ? JSON.parse(saved)
      : [
          { username: "python_master", solvedCount: 42, level: "pro" },
          { username: "code_ninja", solvedCount: 37, level: "pro" },
          { username: "algorithm_ace", solvedCount: 31, level: "intermediate" },
          { username: "debug_hero", solvedCount: 25, level: "intermediate" },
          { username: "syntax_star", solvedCount: 19, level: "beginner" },
        ];
  });

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
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);

  useEffect(() => {
    localStorage.setItem("solvedQuestions", JSON.stringify(solvedQuestions));
    updateLeaderboard();
  }, [solvedQuestions]);

  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

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

  // Calculate user progress
  const calculateUserProgress = () => {
    const beginnerCount = allQuestions.filter(q => q.difficulty === "beginner" && solvedQuestions.includes(q.id)).length;
    const intermediateCount = allQuestions.filter(q => q.difficulty === "intermediate" && solvedQuestions.includes(q.id)).length;
    const proCount = allQuestions.filter(q => q.difficulty === "pro" && solvedQuestions.includes(q.id)).length;
    
    return {
      totalSolved: solvedQuestions.length,
      beginnerSolved: beginnerCount,
      intermediateSolved: intermediateCount,
      proSolved: proCount
    };
  };

  // Update leaderboard
  const updateLeaderboard = () => {
    if (!username) return;
    
    const progress = calculateUserProgress();
    let level: Difficulty = "beginner";
    
    if (progress.proSolved > 5) {
      level = "pro";
    } else if (progress.intermediateSolved > 5) {
      level = "intermediate";
    }
    
    // Update or add the user to the leaderboard
    const existingUserIndex = leaderboard.findIndex(entry => entry.username === username);
    
    if (existingUserIndex !== -1) {
      const updatedLeaderboard = [...leaderboard];
      updatedLeaderboard[existingUserIndex] = {
        ...updatedLeaderboard[existingUserIndex],
        solvedCount: progress.totalSolved,
        level
      };
      setLeaderboard(updatedLeaderboard);
    } else if (progress.totalSolved > 0) {
      setLeaderboard(prev => [
        ...prev,
        { username, solvedCount: progress.totalSolved, level }
      ]);
    }
  };

  // Mock function to run the user's code
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
      const failedTestCase = Math.random() > 0.7 ? Math.floor(Math.random() * selectedQuestion.testCases.length) : -1;
      
      selectedQuestion.testCases.forEach((testCase, index) => {
        const passed = failedTestCase !== index;
        mockOutput += `Test ${index + 1}: ${passed ? "✓ Passed" : "✗ Failed"}\n`;
        
        if (!passed) {
          mockOutput += `  Expected: ${testCase.expected}\n`;
          mockOutput += `  Got: Something different\n`;
        }
      });
      
      const allPassed = failedTestCase === -1;
      
      setOutput(mockOutput);
      
      setTestResults({
        passed: allPassed,
        message: allPassed ? "All tests passed! Great job!" : "Some tests failed. Keep trying!",
        details: allPassed ? undefined : `Failed on test case ${failedTestCase + 1}`
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
        leaderboard,
        username,
        setUsername,
        solvedQuestions,
        calculateUserProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
