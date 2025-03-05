import React, { useEffect, useState } from "react";
import { AppProvider, useAppContext } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import QuestionPanel from "@/components/QuestionPanel";
import CodeEditor from "@/components/CodeEditor";
import TestResults from "@/components/TestResults";
import AIAssistant from "@/components/AIAssistant";
import AnimationEffects from "@/components/AnimationEffects";
import Certificate from "@/components/Certificate";
import LanguageHeader from "@/components/LanguageHeader";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";
import GradientBackground from "@/components/GradientBackground";
import { useUser } from "@clerk/clerk-react";

interface IndexProps {
  language?: string;
}

const Index = ({ language = "Python" }: IndexProps) => {
  const isMobile = useIsMobile();
  const { user } = useUser();
  
  // Add console logs to help debug
  useEffect(() => {
    console.log("Index component mounted, user:", user?.id);
    console.log("Current language:", language);
  }, [user, language]);
  
  return (
    <AppProvider>
      <IndexContent isMobile={isMobile} language={language} />
    </AppProvider>
  );
};

const IndexContent = ({ isMobile, language }: { isMobile: boolean, language: string }) => {
  const { allQuestionsCompleted, userName } = useAppContext();
  const { user } = useUser();
  const [showCertificate, setShowCertificate] = useState(false);
  
  // Show certificate when all questions are completed
  useEffect(() => {
    if (allQuestionsCompleted) {
      setShowCertificate(true);
    }
  }, [allQuestionsCompleted]);
  
  // Get the display name - prefer the userName from context, fallback to Clerk user name
  const displayName = userName || user?.fullName || "Coding Champion";
  
  return (
    <GradientBackground>
      <div className="flex flex-col min-h-screen antialiased">
        <Navbar />
        <LanguageHeader language={language} />
        
        <main className="flex-1 container py-6 px-4 md:px-6 max-w-full">
          {isMobile ? (
            <MobileLayout />
          ) : (
            <DesktopLayout />
          )}
        </main>
        
        <footer className="border-t border-white/10 py-4 text-center text-sm text-zinc-500 backdrop-blur-sm">
          <div className="container">
            {language} Challenge - Practice your {language} skills
          </div>
        </footer>
        <AnimationEffects />
        <AIAssistant />
        
        {showCertificate && (
          <Certificate 
            userName={displayName} 
            onClose={() => setShowCertificate(false)} 
          />
        )}
      </div>
    </GradientBackground>
  );
};

const DesktopLayout = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-10rem)]"
    >
      <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
        <div className="ios-card h-full overflow-hidden bg-white/80 backdrop-blur-md">
          <QuestionPanel />
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={75} minSize={40}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70} minSize={30}>
            <div className="ios-card h-full overflow-hidden bg-white/80 backdrop-blur-md">
              <CodeEditor />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={30} minSize={15}>
            <div className="ios-card h-full overflow-hidden bg-white/80 backdrop-blur-md">
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
      <div className="ios-segmented-control bg-white/80 backdrop-blur-md">
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
      
      <div className="h-[calc(100vh-15rem)] ios-card overflow-hidden bg-white/80 backdrop-blur-md">
        {activeTab === "questions" && <QuestionPanel />}
        {activeTab === "editor" && <CodeEditor />}
        {activeTab === "results" && <TestResults />}
      </div>
    </div>
  );
};

export default Index;
