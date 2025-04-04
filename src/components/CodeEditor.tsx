
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
import { toast } from "@/hooks/use-toast";

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
      
      // Insert spaces based on language convention
      const indentation = getLanguageIndentation();
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
  
  // Get the appropriate indentation based on language
  const getLanguageIndentation = () => {
    const indentationMap = {
      "Python": '    ', // 4 spaces
      "Ruby": '  ',     // 2 spaces
      "JavaScript": '  ', // 2 spaces
      "TypeScript": '  ', // 2 spaces
      "Java": '    ',    // 4 spaces
      "C#": '    ',      // 4 spaces
      "Go": '\t',        // tab
      "Swift": '    ',   // 4 spaces
      "Kotlin": '    ',  // 4 spaces
      "PHP": '    ',     // 4 spaces
      "Rust": '    ',    // 4 spaces
      "SQL": '  ',       // 2 spaces
      "R": '  ',         // 2 spaces
      "Dart": '  ',      // 2 spaces
    };
    
    return indentationMap[currentLanguage] || '  ';
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
  
  // Get editor font settings based on language
  const getEditorFontSettings = () => {
    // Monospace fonts that work well for different languages
    if (currentLanguage === "Swift" || currentLanguage === "Rust") {
      return "font-mono text-sm";
    }
    return "font-mono text-sm";
  };
  
  if (!selectedQuestion) {
    return (
      <div className="flex items-center justify-center h-full border rounded-2xl bg-card text-muted-foreground">
        Select a question to start coding
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full border rounded-2xl bg-card overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b bg-zinc-50 dark:bg-zinc-900">
        <h2 className="font-medium">{selectedQuestion.title}</h2>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <LightbulbIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 backdrop-blur-xl bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 rounded-xl">
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
            className="gap-2 rounded-full bg-primary hover:bg-primary/90"
          >
            <PlayIcon className="h-4 w-4" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-b bg-secondary/30">
        <p className="text-sm">{selectedQuestion.description}</p>
        <div className="mt-3">
          <h3 className="text-xs font-medium mb-1">Test Cases:</h3>
          <div className="space-y-1">
            {selectedQuestion.testCases.slice(0, 2).map((testCase: any, index: number) => (
              <div key={index} className="text-xs bg-secondary p-2 rounded-xl">
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
              className={`w-full h-full p-4 ${getEditorFontSettings()} text-white resize-none outline-none border-none rounded-xl ${getEditorTheme()}`}
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
