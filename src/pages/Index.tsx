
import React, { useEffect } from "react";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import QuestionPanel from "@/components/QuestionPanel";
import CodeEditor from "@/components/CodeEditor";
import TestResults from "@/components/TestResults";
import Leaderboard from "@/components/Leaderboard";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-background antialiased">
        <Navbar />
        
        <main className="flex-1 container py-6 px-4 md:px-6 max-w-full">
          {isMobile ? (
            <MobileLayout />
          ) : (
            <DesktopLayout />
          )}
        </main>
        
        <footer className="border-t py-4 text-center text-sm text-muted-foreground">
          <div className="container">
            Practice Palace - Python Coding Platform
          </div>
        </footer>
      </div>
    </AppProvider>
  );
};

const DesktopLayout = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-10rem)]"
    >
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <QuestionPanel />
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={55} minSize={40}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70} minSize={30}>
            <CodeEditor />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={30} minSize={15}>
            <TestResults />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={25} minSize={15} maxSize={30}>
        <Leaderboard />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

const MobileLayout = () => {
  const [activeTab, setActiveTab] = React.useState<"questions" | "editor" | "results" | "leaderboard">("questions");
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border rounded-lg p-2 bg-card">
        <button
          className={`flex-1 p-2 text-center rounded ${activeTab === "questions" ? "bg-primary text-primary-foreground" : ""}`}
          onClick={() => setActiveTab("questions")}
        >
          Questions
        </button>
        <button
          className={`flex-1 p-2 text-center rounded ${activeTab === "editor" ? "bg-primary text-primary-foreground" : ""}`}
          onClick={() => setActiveTab("editor")}
        >
          Editor
        </button>
        <button
          className={`flex-1 p-2 text-center rounded ${activeTab === "results" ? "bg-primary text-primary-foreground" : ""}`}
          onClick={() => setActiveTab("results")}
        >
          Output
        </button>
        <button
          className={`flex-1 p-2 text-center rounded ${activeTab === "leaderboard" ? "bg-primary text-primary-foreground" : ""}`}
          onClick={() => setActiveTab("leaderboard")}
        >
          Leaderboard
        </button>
      </div>
      
      <div className="h-[calc(100vh-15rem)]">
        {activeTab === "questions" && <QuestionPanel />}
        {activeTab === "editor" && <CodeEditor />}
        {activeTab === "results" && <TestResults />}
        {activeTab === "leaderboard" && <Leaderboard />}
      </div>
    </div>
  );
};

export default Index;
