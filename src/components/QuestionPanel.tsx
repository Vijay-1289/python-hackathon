
import React, { useState, useMemo } from "react";
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
  const displayedQuestions = useMemo(() => 
    filteredQuestions.filter(question => 
      question.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [filteredQuestions, searchQuery]
  );
  
  // Calculate question counts by difficulty
  const questionCounts = useMemo(() => {
    const counts = {
      beginner: 0,
      intermediate: 0,
      pro: 0
    };
    
    filteredQuestions.forEach(question => {
      counts[question.difficulty]++;
    });
    
    return counts;
  }, [filteredQuestions]);
  
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
              <span className="question-count">{questionCounts.beginner}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="intermediate" 
              className="flex-1"
              onClick={() => setSelectedDifficulty("intermediate")}
            >
              Intermediate
              <span className="question-count">{questionCounts.intermediate}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pro" 
              className="flex-1"
              onClick={() => setSelectedDifficulty("pro")}
            >
              Pro
              <span className="question-count">{questionCounts.pro}</span>
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
  // Group questions by categories
  const groupedQuestions = useMemo(() => {
    const basicOperations = questions.filter(q => q.id >= 1 && q.id <= 14);
    const loopsAndLists = questions.filter(q => q.id >= 15 && q.id <= 30);
    const stringsAndDicts = questions.filter(q => q.id >= 31 && q.id <= 45);
    const functionsAndTuples = questions.filter(q => q.id >= 46 && q.id <= 49);
    
    const recursionAndFunctions = questions.filter(q => q.id >= 50 && q.id <= 64);
    const dataStructures = questions.filter(q => q.id >= 65 && q.id <= 79);
    
    const algorithms = questions.filter(q => q.id >= 80 && q.id <= 94);
    const oop = questions.filter(q => q.id >= 95 && q.id <= 104);
    const advanced = questions.filter(q => q.id >= 105 && q.id <= 114);
    
    return {
      basicOperations,
      loopsAndLists,
      stringsAndDicts,
      functionsAndTuples,
      recursionAndFunctions,
      dataStructures,
      algorithms,
      oop,
      advanced
    };
  }, [questions]);
  
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-4 text-muted-foreground">
        No questions found. Try a different search.
      </div>
    );
  }

  // Determine which groups to show based on question difficulty
  const difficultyCategory = questions[0]?.difficulty || 'beginner';
  
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {difficultyCategory === 'beginner' && (
          <>
            {groupedQuestions.basicOperations.length > 0 && (
              <QuestionGroup 
                title="Basic Python Operations" 
                questions={groupedQuestions.basicOperations}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                solvedQuestions={solvedQuestions}
              />
            )}
            
            {groupedQuestions.loopsAndLists.length > 0 && (
              <QuestionGroup 
                title="Loops and Lists" 
                questions={groupedQuestions.loopsAndLists}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                solvedQuestions={solvedQuestions}
              />
            )}
            
            {groupedQuestions.stringsAndDicts.length > 0 && (
              <QuestionGroup 
                title="Strings and Dictionaries" 
                questions={groupedQuestions.stringsAndDicts}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                solvedQuestions={solvedQuestions}
              />
            )}
            
            {groupedQuestions.functionsAndTuples.length > 0 && (
              <QuestionGroup 
                title="Basic Functions and Tuples" 
                questions={groupedQuestions.functionsAndTuples}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                solvedQuestions={solvedQuestions}
              />
            )}
          </>
        )}
        
        {difficultyCategory === 'intermediate' && (
          <>
            {groupedQuestions.recursionAndFunctions.length > 0 && (
              <QuestionGroup 
                title="Recursion and Advanced Functions" 
                questions={groupedQuestions.recursionAndFunctions}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                solvedQuestions={solvedQuestions}
              />
            )}
            
            {groupedQuestions.dataStructures.length > 0 && (
              <QuestionGroup 
                title="Lists, Sets, and Dictionaries" 
                questions={groupedQuestions.dataStructures}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                solvedQuestions={solvedQuestions}
              />
            )}
          </>
        )}
        
        {difficultyCategory === 'pro' && (
          <>
            {groupedQuestions.algorithms.length > 0 && (
              <QuestionGroup 
                title="Algorithms" 
                questions={groupedQuestions.algorithms}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                solvedQuestions={solvedQuestions}
              />
            )}
            
            {groupedQuestions.oop.length > 0 && (
              <QuestionGroup 
                title="Object-Oriented Programming" 
                questions={groupedQuestions.oop}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                solvedQuestions={solvedQuestions}
              />
            )}
            
            {groupedQuestions.advanced.length > 0 && (
              <QuestionGroup 
                title="Optimization and Advanced Topics" 
                questions={groupedQuestions.advanced}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                solvedQuestions={solvedQuestions}
              />
            )}
          </>
        )}
        
        {/* If there are any questions that don't fit into the categories, show them in a separate group */}
        {questions.filter(q => 
          !Object.values(groupedQuestions).flat().some(gq => gq.id === q.id)
        ).length > 0 && (
          <QuestionGroup 
            title="Other Questions" 
            questions={questions.filter(q => 
              !Object.values(groupedQuestions).flat().some(gq => gq.id === q.id)
            )}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            solvedQuestions={solvedQuestions}
          />
        )}
      </div>
    </ScrollArea>
  );
};

interface QuestionGroupProps {
  title: string;
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

const QuestionGroup: React.FC<QuestionGroupProps> = ({
  title,
  questions,
  selectedQuestion,
  setSelectedQuestion,
  solvedQuestions
}) => {
  if (questions.length === 0) return null;
  
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm text-muted-foreground">{title} ({questions.length})</h3>
      <div className="space-y-1">
        {questions.map((question) => (
          <Button
            key={question.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-normal h-auto py-2 px-3",
              selectedQuestion?.id === question.id && "bg-accent"
            )}
            onClick={() => setSelectedQuestion(question)}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-sm">{question.title}</span>
              {solvedQuestions.includes(question.id) && (
                <CheckIcon className="h-4 w-4 text-green-500" />
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;
