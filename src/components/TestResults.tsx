
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
        <h2 className="font-medium">Output</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {output ? (
          <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
        ) : (
          <div className="text-muted-foreground text-sm">
            Run your code to see the output here
          </div>
        )}
        
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
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default TestResults;
