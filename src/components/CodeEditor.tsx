
import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { PlayIcon, LightbulbIcon, BrainIcon } from "lucide-react";
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
  
  const editorRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    // Wait for the editor to be mounted and then set it as ready
    if (editorRef.current) {
      setEditorReady(true);
    }
  }, []);

  // Apply syntax highlighting whenever userCode changes
  useEffect(() => {
    if (editorRef.current && userCode !== undefined && editorReady) {
      editorRef.current.textContent = userCode;
      
      // Apply syntax highlighting with Prism
      if (preRef.current) {
        Prism.highlightElement(preRef.current);
      }
    }
  }, [userCode, editorReady, userId]);
  
  // Prevent paste in the editor to avoid copy-paste solutions
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    console.log("Paste is disabled to encourage typing your own solution");
  };
  
  // Handle keyboard input in the editor
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow tab key for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      
      if (range) {
        const tabNode = document.createTextNode("    ");
        range.insertNode(tabNode);
        
        // Move cursor after the tab
        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode);
        selection?.removeAllRanges();
        selection?.addRange(range);
        
        // Update the code in state
        if (editorRef.current) {
          setUserCode(editorRef.current.textContent || "");
        }
      }
    }
  };
  
  // Handle editor input
  const handleEditorInput = () => {
    if (editorRef.current) {
      setUserCode(editorRef.current.textContent || "");
    }
  };
  
  const toggleAIAssistant = () => {
    setShowAIAssistant(!showAIAssistant);
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  data-ai-assistant
                  onClick={toggleAIAssistant}
                >
                  <BrainIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>AI Assistant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
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
          <div className="p-4">
            <pre ref={preRef} className="language-python">
              <code
                ref={editorRef}
                className="code-editor"
                contentEditable
                onInput={handleEditorInput}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                onFocus={() => setIsEditorFocused(true)}
                onBlur={() => setIsEditorFocused(false)}
                spellCheck="false"
                suppressContentEditableWarning
              ></code>
            </pre>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CodeEditor;
