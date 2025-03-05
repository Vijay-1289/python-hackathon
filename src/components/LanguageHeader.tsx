
import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LanguageHeaderProps {
  language: string;
}

const LanguageHeader = ({ language }: LanguageHeaderProps) => {
  return (
    <div className="fixed top-0 right-0 p-4 z-50">
      <div className="flex items-center gap-2">
        <Link to="/home">
          <Button variant="outline" size="sm" className="gap-2 bg-white/10 backdrop-blur-md">
            <HomeIcon className="h-4 w-4" />
            All Languages
          </Button>
        </Link>
        <span className="text-white text-sm bg-white/10 px-3 py-1 rounded-md backdrop-blur-md">
          Current: {language}
        </span>
      </div>
    </div>
  );
};

export default LanguageHeader;
