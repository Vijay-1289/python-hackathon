
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { PlayIcon, LightbulbIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-okaidia.css';
import { useUser } from "@clerk/clerk-react";

const CodeEditor = () => {
  const { 
    selectedQuestion, 
    userCode, 
    setUserCode, 
    runUserCode,
    isRunning
  } = useAppContext();
  
  const { user } = useUser();
  const userId = user?.id || "anonymous";
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const codeRef = useRef<HTMLElement>(null);

  // Handle code changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setUserCode(newCode);
  };
  
  // Update syntax highlighting when userCode changes
  useEffect(() => {
    if (codeRef.current && preRef.current && userCode !== undefined) {
      codeRef.current.textContent = userCode;
      Prism.highlightElement(preRef.current);
    }
  }, [userCode]);
  
  // Sync textarea scroll with highlighted code
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current && textareaRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };
  
  // Handle tab key for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert 4 spaces
      const newCode = userCode.substring(0, start) + '    ' + userCode.substring(end);
      setUserCode(newCode);
      
      // Move cursor after the tab
      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }
      }, 0);
    }
  };
  
  if (!selectedQuestion) {
    return (
      <div className="flex items-center justify-center h-full border rounded-lg bg-card text-muted-foreground">
        Select a question to start coding
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full border rounded-lg bg-card overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-medium">{selectedQuestion.title}</h2>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <LightbulbIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h3 className="font-medium">Hints</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedQuestion.hints.map((hint: string, index: number) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            onClick={runUserCode}
            disabled={isRunning}
            className="gap-2"
          >
            <PlayIcon className="h-4 w-4" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-b bg-secondary/50">
        <p className="text-sm">{selectedQuestion.description}</p>
        <div className="mt-2">
          <h3 className="text-xs font-medium mb-1">Test Cases:</h3>
          <div className="space-y-1">
            {selectedQuestion.testCases.slice(0, 2).map((testCase: any, index: number) => (
              <div key={index} className="text-xs bg-secondary p-2 rounded">
                <span className="text-code-function">{testCase.input}</span>
                <span className="mx-2">→</span>
                <span className="text-code-string">{testCase.expected}</span>
              </div>
            ))}
            {selectedQuestion.testCases.length > 2 && (
              <div className="text-xs text-muted-foreground">
                + {selectedQuestion.testCases.length - 2} more hidden test cases
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full">
          <div className="p-4 code-editor-container relative">
            <pre ref={preRef} className="language-python overflow-hidden">
              <code ref={codeRef} className="code-editor-highlight"></code>
            </pre>
            <textarea
              ref={textareaRef}
              value={userCode}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              className="code-editor-textarea absolute top-0 left-0 w-full h-full p-4 bg-transparent text-transparent caret-white resize-none"
              spellCheck="false"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
        </ScrollArea>
      </div>
      
      <style>
        {`
          .code-editor-container {
            position: relative;
            min-height: 100%;
          }
          .code-editor-highlight {
            white-space: pre;
            font-family: monospace;
            tab-size: 4;
          }
          .code-editor-textarea {
            white-space: pre;
            font-family: monospace;
            tab-size: 4;
            outline: none;
            border: none;
          }
        `}
      </style>
    </div>
  );
};

export default CodeEditor;
