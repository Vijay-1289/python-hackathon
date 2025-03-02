
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { CheckCircleIcon, XCircleIcon, TerminalIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const TestResults = () => {
  const { testResults, output } = useAppContext();
  
  return (
    <div className="flex flex-col h-full border rounded-lg bg-card overflow-hidden">
      <div className="p-4 border-b flex items-center">
        <TerminalIcon className="h-4 w-4 mr-2" />
        <h2 className="font-medium">Test Results</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {output ? (
          <div>
            <pre className="font-mono text-sm whitespace-pre-wrap bg-secondary/30 p-4 rounded-md">{output}</pre>
            
            {testResults && (
              <div 
                className={cn(
                  "mt-4 p-4 rounded-md border",
                  testResults.passed 
                    ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200" 
                    : "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
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
                  <div className="mt-4 text-sm">
                    <p className="font-medium">Debugging Tips:</p>
                    <ul className="list-disc ml-5 mt-1 space-y-1">
                      <li>Review the failed test case input and expected output</li>
                      <li>Test your code with edge cases (zero, negative numbers, empty strings, etc.)</li>
                      <li>Check for off-by-one errors</li>
                      <li>Ensure your function returns the correct data type</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-muted-foreground text-sm flex flex-col items-center justify-center h-full p-4">
            <TerminalIcon className="h-12 w-12 mb-4 text-muted-foreground/50" />
            <p className="text-center">Run your code to see the test results here</p>
            <p className="text-center text-xs mt-2">Your code will be tested against the test cases</p>
            <p className="text-center text-xs mt-1">Make sure your solution works for all possible valid inputs</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default TestResults;
