
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { PlayIcon, LightbulbIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import 'prismjs/themes/prism-okaidia.css';
import { useUser } from "@clerk/clerk-react";

const CodeEditor = () => {
  const { 
    selectedQuestion, 
    userCode, 
    setUserCode, 
    runUserCode,
    isRunning,
    currentLanguage
  } = useAppContext();
  
  const { user } = useUser();
  const userId = user?.id || "anonymous";
  
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Handle code changes
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setUserCode(newCode);
  };
  
  // Handle tab key for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const textarea = editorRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert 4 spaces or 2 spaces depending on language
      const indentation = currentLanguage === "Python" ? '    ' : '  ';
      const newCode = userCode.substring(0, start) + indentation + userCode.substring(end);
      setUserCode(newCode);
      
      // Move cursor after the tab
      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = start + indentation.length;
        }
      }, 0);
    }
  };
  
  // Set the editor theme based on language
  const getEditorTheme = () => {
    const themes = {
      "Python": "bg-blue-950",
      "JavaScript": "bg-yellow-900",
      "TypeScript": "bg-blue-900",
      "Java": "bg-red-900",
      "Go": "bg-cyan-900",
      "C#": "bg-purple-900",
      "Ruby": "bg-red-900",
      "Swift": "bg-orange-900",
      "Kotlin": "bg-purple-900",
      "PHP": "bg-indigo-900",
      "Rust": "bg-orange-950",
      "SQL": "bg-gray-900",
      "R": "bg-blue-900",
      "Dart": "bg-cyan-900"
    };
    
    return themes[currentLanguage] || "bg-zinc-900";
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
          <div className="relative p-4">
            <textarea
              ref={editorRef}
              value={userCode}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              className={`w-full h-full p-4 font-mono text-white resize-none outline-none border-none rounded-md ${getEditorTheme()}`}
              style={{
                whiteSpace: 'pre',
                tabSize: 4,
                minHeight: '300px'
              }}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CodeEditor;
