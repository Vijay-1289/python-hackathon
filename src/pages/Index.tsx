
import React, { useEffect } from "react";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import QuestionPanel from "@/components/QuestionPanel";
import CodeEditor from "@/components/CodeEditor";
import TestResults from "@/components/TestResults";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  // Add console logs to help debug
  useEffect(() => {
    console.log("Index component mounted");
  }, []);
  
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-zinc-50 antialiased dark:bg-zinc-900">
        <Navbar />
        
        <main className="flex-1 container py-6 px-4 md:px-6 max-w-full">
          {isMobile ? (
            <MobileLayout />
          ) : (
            <DesktopLayout />
          )}
        </main>
        
        <footer className="border-t py-4 text-center text-sm text-zinc-500 dark:border-zinc-800">
          <div className="container">
            Python Challenge - Practice your Python skills
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
      <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
        <div className="ios-card h-full overflow-hidden">
          <QuestionPanel />
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={75} minSize={40}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70} minSize={30}>
            <div className="ios-card h-full overflow-hidden">
              <CodeEditor />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={30} minSize={15}>
            <div className="ios-card h-full overflow-hidden">
              <TestResults />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

const MobileLayout = () => {
  const [activeTab, setActiveTab] = React.useState<"questions" | "editor" | "results">("questions");
  
  return (
    <div className="space-y-4">
      <div className="ios-segmented-control">
        <button
          className={`ios-segmented-item flex-1 ${activeTab === "questions" ? "active" : ""}`}
          onClick={() => setActiveTab("questions")}
        >
          Questions
        </button>
        <button
          className={`ios-segmented-item flex-1 ${activeTab === "editor" ? "active" : ""}`}
          onClick={() => setActiveTab("editor")}
        >
          Editor
        </button>
        <button
          className={`ios-segmented-item flex-1 ${activeTab === "results" ? "active" : ""}`}
          onClick={() => setActiveTab("results")}
        >
          Output
        </button>
      </div>
      
      <div className="h-[calc(100vh-15rem)] ios-card overflow-hidden">
        {activeTab === "questions" && <QuestionPanel />}
        {activeTab === "editor" && <CodeEditor />}
        {activeTab === "results" && <TestResults />}
      </div>
    </div>
  );
};

export default Index;
