
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

// Simple Python syntax highlighting function
const highlightSyntax = (code: string): JSX.Element[] => {
  // Split code into lines
  const lines = code.split("\n");
  
  // Define regex patterns for different syntax elements
  const keywordPattern = /\b(def|if|else|elif|for|while|in|return|True|False|None|import|from|as|class|try|except|finally|with|lambda|pass|break|continue)\b/g;
  const stringPattern = /(["'])(?:(?=(\\?))\2.)*?\1/g;
  const commentPattern = /#.*/g;
  const functionPattern = /\b([a-zA-Z_][a-zA-Z0-9_]*)\(/g;
  const numberPattern = /\b\d+\.?\d*\b/g;
  
  // Return highlighted lines
  return lines.map((line, lineIndex) => {
    // Replace keywords with highlighted spans
    let highlightedLine = line
      .replace(keywordPattern, '<span class="text-code-keyword">$&</span>')
      .replace(stringPattern, '<span class="text-code-string">$&</span>')
      .replace(commentPattern, '<span class="text-code-comment">$&</span>')
      .replace(functionPattern, '<span class="text-code-function">$1</span>(')
      .replace(numberPattern, '<span class="text-code-operator">$&</span>');
    
    return (
      <div className="code-line" key={lineIndex}>
        <span className="code-line-number">{lineIndex + 1}</span>
        <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
      </div>
    );
  });
};

const CodeEditor = () => {
  const { 
    selectedQuestion, 
    userCode, 
    setUserCode, 
    runUserCode,
    isRunning
  } = useAppContext();
  
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  
  // Set editor content when userCode changes
  useEffect(() => {
    if (editorRef.current && userCode !== undefined) {
      // Only update if the content has actually changed
      if (editorRef.current.innerText !== userCode) {
        editorRef.current.innerText = userCode;
      }
    }
  }, [userCode]);
  
  // Prevent paste in the editor to avoid copy-paste solutions
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    // Optionally show a toast notification
    console.log("Paste is disabled to encourage typing your own solution");
  };
  
  // Handle keyboard input in the editor
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow tab key for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      
      const cursorPosition = getSelectionStart();
      const newCode = 
        userCode.substring(0, cursorPosition) + 
        "    " + 
        userCode.substring(cursorPosition);
      
      setUserCode(newCode);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        const range = document.createRange();
        const sel = window.getSelection();
        if (editorRef.current && sel) {
          const textNodes = getTextNodes(editorRef.current);
          let currentPos = 0;
          let targetNode = null;
          let targetOffset = 0;
          
          for (let i = 0; i < textNodes.length; i++) {
            const node = textNodes[i];
            if (currentPos + node.textContent!.length >= cursorPosition + 4) {
              targetNode = node;
              targetOffset = cursorPosition + 4 - currentPos;
              break;
            }
            currentPos += node.textContent!.length;
          }
          
          if (targetNode) {
            range.setStart(targetNode, targetOffset);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }, 0);
    }
  };
  
  // Get all text nodes in the editor
  const getTextNodes = (node: Node): Text[] => {
    const textNodes: Text[] = [];
    const walk = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    let currentNode: Node | null = walk.nextNode();
    while (currentNode) {
      textNodes.push(currentNode as Text);
      currentNode = walk.nextNode();
    }
    
    return textNodes;
  };
  
  // Get the cursor position in the editor
  const getSelectionStart = (): number => {
    const sel = window.getSelection();
    if (!sel || !editorRef.current) return 0;
    
    const range = sel.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editorRef.current);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    return preCaretRange.toString().length;
  };
  
  // Handle editor input
  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerText;
    setUserCode(content);
  };
  
  if (!selectedQuestion) {
    return (
      <div className="flex items-center justify-center h-full border rounded-lg bg-card/30 text-muted-foreground">
        <div className="text-center p-6">
          <p className="mb-2">Select a question to start coding</p>
          <div className="text-sm text-muted-foreground/80">
            Choose a challenge from the questions panel
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full border rounded-lg bg-card overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b bg-card/50">
        <h2 className="font-medium text-foreground">{selectedQuestion.title}</h2>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <LightbulbIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h3 className="font-medium">Hints</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedQuestion.hints.map((hint, index) => (
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
            className="gap-2 h-8"
            variant="default"
          >
            <PlayIcon className="h-4 w-4" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-b bg-secondary/30">
        <p className="text-sm text-foreground/90">{selectedQuestion.description}</p>
        <div className="mt-3">
          <h3 className="text-xs font-medium mb-1 text-foreground/80">Public Test Cases:</h3>
          <div className="space-y-1">
            {selectedQuestion.testCases.slice(0, 2).map((testCase, index) => (
              <div key={index} className="text-xs bg-secondary/60 p-2 rounded-md font-mono">
                <span className="text-code-function">{testCase.input}</span>
                <span className="mx-2 text-muted-foreground">→</span>
                <span className="text-code-string">{testCase.expected}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full">
          <div className="editor-wrapper">
            <div
              className="min-h-[300px] h-full bg-code-background text-code-foreground p-4 font-mono text-sm relative"
              ref={editorRef}
              contentEditable
              onInput={handleEditorInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onFocus={() => setIsEditorFocused(true)}
              onBlur={() => setIsEditorFocused(false)}
              suppressContentEditableWarning
              spellCheck="false"
              style={{ 
                outline: "none",
                transition: "all 0.2s ease",
                lineHeight: "1.6",
                tabSize: "4",
                whiteSpace: "pre-wrap",
                wordBreak: "keep-all",
              }}
            ></div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CodeEditor;
