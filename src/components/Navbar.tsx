
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { MoonIcon, SunIcon, UserRoundIcon, TrophyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Navbar = () => {
  const { darkMode, toggleDarkMode, username, setUsername } = useAppContext();
  const [nameInput, setNameInput] = useState(username);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSaveUsername = () => {
    setUsername(nameInput);
    setDialogOpen(false);
  };

  return (
    <header className="w-full border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-40 transition-all duration-200">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <TrophyIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-medium">Practice Palace</h1>
          <div className="hidden md:block ml-2 px-2 py-1 bg-secondary rounded-md text-xs font-medium text-secondary-foreground">
            Python
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 text-sm"
              >
                <UserRoundIcon className="h-4 w-4" />
                {username ? username : "Set Username"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Set Your Username</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                </div>
                <Button onClick={handleSaveUsername} className="w-full">
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>

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
