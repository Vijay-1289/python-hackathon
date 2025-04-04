
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";

interface LanguageHeaderProps {
  language: string;
}

const LanguageHeader = ({ language }: LanguageHeaderProps) => {
  const { setCurrentLanguage } = useAppContext();
  
  // Set the language in context when it changes
  React.useEffect(() => {
    setCurrentLanguage(language);
  }, [language, setCurrentLanguage]);
  
  // Define badges for each language
  const getBadgeColor = () => {
    const colors = {
      "Python": "bg-blue-600 hover:bg-blue-700",
      "JavaScript": "bg-yellow-600 hover:bg-yellow-700",
      "TypeScript": "bg-blue-500 hover:bg-blue-600",
      "Java": "bg-red-600 hover:bg-red-700",
      "Go": "bg-cyan-600 hover:bg-cyan-700",
      "C#": "bg-purple-600 hover:bg-purple-700",
      "Ruby": "bg-red-500 hover:bg-red-600",
      "Swift": "bg-orange-600 hover:bg-orange-700",
      "Kotlin": "bg-purple-500 hover:bg-purple-600",
      "PHP": "bg-indigo-600 hover:bg-indigo-700",
      "Rust": "bg-orange-700 hover:bg-orange-800",
      "SQL": "bg-gray-600 hover:bg-gray-700",
      "R": "bg-blue-600 hover:bg-blue-700",
      "Dart": "bg-teal-600 hover:bg-teal-700"
    };
    
    return colors[language] || "bg-zinc-600 hover:bg-zinc-700";
  };
  
  return (
    <div className="border-b backdrop-blur-md py-3 bg-white/80 dark:bg-black/20">
      <div className="container flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          {language} Coding Challenge
          <Badge className={`ml-2 ${getBadgeColor()}`}>{language}</Badge>
        </h1>
      </div>
    </div>
  );
};

export default LanguageHeader;
