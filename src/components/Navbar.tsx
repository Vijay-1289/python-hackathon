
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { MoonIcon, SunIcon, CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";

interface NavbarProps {
  language?: string;
}

const Navbar = ({ language = "Python" }: NavbarProps) => {
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <header className="w-full border-b border-zinc-200 backdrop-blur-sm bg-white/90 sticky top-0 z-40 transition-all duration-200 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="container flex items-center justify-between h-14 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-xl flex items-center justify-center">
            <CodeIcon className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-lg font-medium">{language} Challenge</h1>
          <div className="hidden md:flex items-center gap-2 ml-2">
            <div className="px-2 py-1 bg-zinc-100 rounded-full text-xs font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200">
              30 {language} Questions
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Beginner • Intermediate • Pro
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full h-9 w-9"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-[18px] w-[18px]" />
            ) : (
              <MoonIcon className="h-[18px] w-[18px]" />
            )}
          </Button>
          <UserButton afterSignOutUrl="/login" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
