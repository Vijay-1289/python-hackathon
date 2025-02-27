
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { SearchIcon, FilterIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const QuestionPanel = () => {
  const { 
    selectedDifficulty, 
    setSelectedDifficulty, 
    filteredQuestions, 
    selectedQuestion, 
    setSelectedQuestion,
    solvedQuestions
  } = useAppContext();
  
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter questions based on search query
  const displayedQuestions = filteredQuestions.filter(question => 
    question.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col h-full border rounded-lg bg-card">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>
      </div>

      <Tabs defaultValue="beginner" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger 
              value="beginner" 
              className="flex-1"
              onClick={() => setSelectedDifficulty("beginner")}
            >
              Beginner
            </TabsTrigger>
            <TabsTrigger 
              value="intermediate" 
              className="flex-1"
              onClick={() => setSelectedDifficulty("intermediate")}
            >
              Intermediate
            </TabsTrigger>
            <TabsTrigger 
              value="pro" 
              className="flex-1"
              onClick={() => setSelectedDifficulty("pro")}
            >
              Pro
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="beginner" className="h-full m-0">
            <QuestionsTab 
              questions={displayedQuestions} 
              selectedQuestion={selectedQuestion} 
              setSelectedQuestion={setSelectedQuestion}
              solvedQuestions={solvedQuestions}
            />
          </TabsContent>
          <TabsContent value="intermediate" className="h-full m-0">
            <QuestionsTab 
              questions={displayedQuestions}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              solvedQuestions={solvedQuestions}
            />
          </TabsContent>
          <TabsContent value="pro" className="h-full m-0">
            <QuestionsTab 
              questions={displayedQuestions}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              solvedQuestions={solvedQuestions}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

interface QuestionsTabProps {
  questions: Array<{
    id: number;
    title: string;
    difficulty: string;
  }>;
  selectedQuestion: {
    id: number;
  } | null;
  setSelectedQuestion: (question: any) => void;
  solvedQuestions: number[];
}

const QuestionsTab: React.FC<QuestionsTabProps> = ({ 
  questions, 
  selectedQuestion, 
  setSelectedQuestion,
  solvedQuestions
}) => {
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-muted-foreground">
        No questions found. Try a different search.
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {questions.map((question) => (
          <Button
            key={question.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal h-auto py-3 px-4",
              selectedQuestion?.id === question.id && "bg-accent"
            )}
            onClick={() => setSelectedQuestion(question)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{question.title}</span>
                <span
                  className={cn(
                    "difficulty-badge",
                    question.difficulty === "beginner" && "difficulty-badge-beginner",
                    question.difficulty === "intermediate" && "difficulty-badge-intermediate",
                    question.difficulty === "pro" && "difficulty-badge-pro"
                  )}
                >
                  {question.difficulty}
                </span>
              </div>
              {solvedQuestions.includes(question.id) && (
                <CheckIcon className="h-4 w-4 text-green-500" />
              )}
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default QuestionPanel;
