
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { CheckCircleIcon, XCircleIcon, TerminalIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const TestResults = () => {
  const { testResults, output } = useAppContext();
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-zinc-100 flex items-center dark:border-zinc-800">
        <TerminalIcon className="h-4 w-4 mr-2 text-zinc-700 dark:text-zinc-300" />
        <h2 className="font-medium text-zinc-900 dark:text-zinc-100">Test Results</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {output ? (
          <div>
            <pre className="font-mono text-sm whitespace-pre-wrap bg-zinc-50 p-4 rounded-xl dark:bg-zinc-800/50">{output}</pre>
            
            {testResults && (
              <div 
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
                  <div className="mt-4 text-sm">
                    <p className="font-medium">Debugging Tips:</p>
                    <ul className="list-disc ml-5 mt-1 space-y-1">
                      <li>Double-check your algorithm logic</li>
                      <li>Test your code with edge cases</li>
                      <li>Check for off-by-one errors</li>
                      <li>Verify your function returns the correct data type</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
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
