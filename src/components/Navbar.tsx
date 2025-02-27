
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { MoonIcon, SunIcon, CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <header className="w-full border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-40 transition-all duration-200">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <CodeIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-medium">Python Challenge</h1>
          <div className="hidden md:flex items-center gap-2 ml-2">
            <div className="px-2 py-1 bg-secondary rounded-md text-xs font-medium text-secondary-foreground">
              200 Python Questions
            </div>
            <div className="text-xs text-muted-foreground">
              Beginner • Intermediate • Pro
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
