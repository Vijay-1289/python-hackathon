import React, { useState, useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import { SearchIcon, CheckIcon, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { allQuestions } from "@/data/questions";
import { toast } from "@/hooks/use-toast";

const QuestionPanel = () => {
  const { 
    selectedDifficulty, 
    setSelectedDifficulty, 
    filteredQuestions, 
    selectedQuestion, 
    setSelectedQuestion,
    solvedQuestions,
    isQuestionLocked,
    currentLanguage
  } = useAppContext();
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const displayedQuestions = useMemo(() => 
    filteredQuestions.filter(question => 
      question.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [filteredQuestions, searchQuery]
  );
  
  const questionCounts = useMemo(() => {
    const counts = {
      beginner: 0,
      intermediate: 0,
      pro: 0
    };
    
    allQuestions.forEach(question => {
      counts[question.difficulty]++;
    });
    
    return counts;
  }, []);
  
  return (
    <div className="flex flex-col h-full border rounded-2xl bg-card">
      <div className="p-4 border-b bg-zinc-50 dark:bg-zinc-900">
        <div className="flex items-center space-x-2 rounded-full border bg-white dark:bg-zinc-800 px-3 py-1 shadow-sm">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-7 bg-transparent border-none shadow-none focus-visible:ring-0 px-0"
          />
        </div>
      </div>

      <Tabs 
        defaultValue={selectedDifficulty} 
        value={selectedDifficulty}
        className="flex-1 flex flex-col"
      >
        <div className="px-4 pt-2">
          <TabsList className="w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-full p-1">
            <TabsTrigger 
              value="beginner" 
              className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
              onClick={() => setSelectedDifficulty("beginner")}
            >
              Beginner
              <span className="ml-1 text-xs rounded-full bg-primary/20 px-2 py-0.5">
                {solvedQuestions.filter(id => 
                  allQuestions.find(q => q.id === id)?.difficulty === "beginner"
                ).length}/{questionCounts.beginner}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="intermediate" 
              className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
              onClick={() => setSelectedDifficulty("intermediate")}
            >
              Intermediate
              <span className="ml-1 text-xs rounded-full bg-primary/20 px-2 py-0.5">
                {solvedQuestions.filter(id => 
                  allQuestions.find(q => q.id === id)?.difficulty === "intermediate"
                ).length}/{questionCounts.intermediate}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="pro" 
              className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
              onClick={() => setSelectedDifficulty("pro")}
            >
              Pro
              <span className="ml-1 text-xs rounded-full bg-primary/20 px-2 py-0.5">
                {solvedQuestions.filter(id => 
                  allQuestions.find(q => q.id === id)?.difficulty === "pro"
                ).length}/{questionCounts.pro}
              </span>
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
              isQuestionLocked={isQuestionLocked}
              currentLanguage={currentLanguage}
            />
          </TabsContent>
          <TabsContent value="intermediate" className="h-full m-0">
            <QuestionsTab 
              questions={displayedQuestions}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              solvedQuestions={solvedQuestions}
              isQuestionLocked={isQuestionLocked}
              currentLanguage={currentLanguage}
            />
          </TabsContent>
          <TabsContent value="pro" className="h-full m-0">
            <QuestionsTab 
              questions={displayedQuestions}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              solvedQuestions={solvedQuestions}
              isQuestionLocked={isQuestionLocked}
              currentLanguage={currentLanguage}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

interface QuestionsTabProps {
  questions: Array<any>;
  selectedQuestion: any;
  setSelectedQuestion: (question: any) => void;
  solvedQuestions: number[];
  isQuestionLocked: (questionId: number) => boolean;
  currentLanguage: string;
}

const QuestionsTab: React.FC<QuestionsTabProps> = ({ 
  questions, 
  selectedQuestion, 
  setSelectedQuestion,
  solvedQuestions,
  isQuestionLocked,
  currentLanguage
}) => {
  type CategoryGroups = {
    [key: string]: any[];
  };
  
  const groupedQuestions = useMemo(() => {
    let categories: CategoryGroups = {
      "Basics": questions.filter(q => q.id % 10 === 1),
      "Strings": questions.filter(q => q.id % 10 === 2 || q.id % 10 === 3),
      "Arrays": questions.filter(q => q.id % 10 === 4 || q.id % 10 === 5),
      "Advanced": questions.filter(q => q.id % 10 >= 6)
    };
    
    if (currentLanguage === "JavaScript" || currentLanguage === "TypeScript") {
      categories = {
        "Basics": questions.filter(q => q.id % 15 <= 3),
        "Arrays & Strings": questions.filter(q => q.id % 15 > 3 && q.id % 15 <= 8),
        "Functions": questions.filter(q => q.id % 15 > 8 && q.id % 15 <= 12),
        "Advanced": questions.filter(q => q.id % 15 > 12)
      };
    } else if (currentLanguage === "SQL") {
      categories = {
        "Queries": questions.filter(q => q.id % 12 <= 4),
        "Joins": questions.filter(q => q.id % 12 > 4 && q.id % 12 <= 8),
        "Advanced": questions.filter(q => q.id % 12 > 8)
      };
    }
    
    return categories;
  }, [questions, currentLanguage]);
  
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-muted-foreground">
        No questions found. Try a different search.
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => 
          categoryQuestions.length > 0 && (
            <QuestionGroup 
              key={category}
              title={category} 
              questions={categoryQuestions}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              solvedQuestions={solvedQuestions}
              isQuestionLocked={isQuestionLocked}
            />
          )
        )}
        
        {questions.filter(q => 
          !Object.values(groupedQuestions).flat().some(gq => gq.id === q.id)
        ).length > 0 && (
          <QuestionGroup 
            title="Other Challenges" 
            questions={questions.filter(q => 
              !Object.values(groupedQuestions).flat().some(gq => gq.id === q.id)
            )}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            solvedQuestions={solvedQuestions}
            isQuestionLocked={isQuestionLocked}
          />
        )}
      </div>
    </ScrollArea>
  );
};

interface QuestionGroupProps {
  title: string;
  questions: Array<any>;
  selectedQuestion: any;
  setSelectedQuestion: (question: any) => void;
  solvedQuestions: number[];
  isQuestionLocked: (questionId: number) => boolean;
}

const QuestionGroup: React.FC<QuestionGroupProps> = ({
  title,
  questions,
  selectedQuestion,
  setSelectedQuestion,
  solvedQuestions,
  isQuestionLocked
}) => {
  if (questions.length === 0) return null;
  
  const handleSelectQuestion = (question) => {
    if (isQuestionLocked(question.id)) {
      toast({
        title: "Question Locked",
        description: "You need to solve the previous question first.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Selecting question ID:", question.id);
    const fullQuestion = allQuestions.find(q => q.id === question.id);
    if (fullQuestion) {
      console.log("Found full question:", fullQuestion.title);
      setSelectedQuestion(fullQuestion);
    } else {
      console.error("Could not find full question with ID:", question.id);
    }
  };
  
  const sortedQuestions = [...questions].sort((a, b) => a.id - b.id);
  
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm text-muted-foreground">
        {title} ({questions.length})
      </h3>
      <div className="space-y-1">
        {sortedQuestions.map((question) => {
          const locked = isQuestionLocked(question.id);
          const solved = solvedQuestions.includes(question.id);
          
          return (
            <div
              key={question.id}
              className={cn(
                "relative group rounded-xl overflow-hidden transition-all",
                locked && "opacity-70"
              )}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal h-auto py-3 px-4 rounded-xl transition-all",
                  selectedQuestion?.id === question.id && "bg-accent text-accent-foreground",
                  solved && "bg-green-50 dark:bg-green-900/20",
                  locked && "cursor-not-allowed"
                )}
                onClick={() => handleSelectQuestion(question)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {locked ? (
                      <div className="shrink-0 rounded-full w-6 h-6 bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-500">
                        <LockIcon className="h-3.5 w-3.5" />
                      </div>
                    ) : solved ? (
                      <div className="shrink-0 rounded-full w-6 h-6 bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-600 dark:text-green-200">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </div>
                    ) : (
                      <div className="shrink-0 rounded-full w-6 h-6 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-400">
                        {question.id % 100}
                      </div>
                    )}
                    <span className="text-sm">{question.title}</span>
                  </div>
                </div>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPanel;
