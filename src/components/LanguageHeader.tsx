
import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, BookIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LanguageHeaderProps {
  language: string;
}

const LanguageHeader = ({ language }: LanguageHeaderProps) => {
  // Function to get a color for the language badge
  const getLanguageColor = (lang: string): string => {
    const colors: Record<string, string> = {
      "Python": "bg-blue-500",
      "JavaScript": "bg-yellow-500",
      "Java": "bg-orange-500",
      "TypeScript": "bg-blue-600",
      "Go": "bg-cyan-500",
      "C#": "bg-purple-600",
      "Ruby": "bg-red-600",
      "Swift": "bg-orange-600",
      "Kotlin": "bg-purple-500",
      "PHP": "bg-indigo-500",
      "Rust": "bg-orange-800",
      "SQL": "bg-green-600",
      "R": "bg-blue-700",
      "Dart": "bg-teal-500"
    };
    
    return colors[lang] || "bg-gray-500";
  };

  return (
    <div className="fixed top-0 right-0 p-4 z-50">
      <div className="flex items-center gap-2">
        <Link to="/home">
          <Button variant="outline" size="sm" className="gap-2 bg-white/10 backdrop-blur-md">
            <HomeIcon className="h-4 w-4" />
            All Languages
          </Button>
        </Link>
        <span className={`text-white text-sm px-3 py-1 rounded-md backdrop-blur-md ${getLanguageColor(language)}`}>
          Current: {language}
        </span>
      </div>
    </div>
  );
};

export default LanguageHeader;
