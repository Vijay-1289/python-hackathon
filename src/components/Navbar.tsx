
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, HomeIcon, LogOutIcon } from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";

interface NavbarProps {
  language: string;
}

const languages = [
  { name: "Python", path: "/python" },
  { name: "JavaScript", path: "/javascript" },
  { name: "TypeScript", path: "/typescript" },
  { name: "Java", path: "/java" },
  { name: "Go", path: "/golang" },
  { name: "C#", path: "/csharp" },
  { name: "Ruby", path: "/ruby" },
  { name: "Swift", path: "/swift" },
  { name: "Kotlin", path: "/kotlin" },
  { name: "PHP", path: "/php" },
  { name: "Rust", path: "/rust" },
  { name: "SQL", path: "/sql" },
  { name: "R", path: "/r" },
  { name: "Dart", path: "/dart" }
];

const Navbar = ({ language }: NavbarProps) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  
  return (
    <header className="border-b border-white/10 py-4 backdrop-blur-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-white/80">
              <HomeIcon className="h-5 w-5" />
            </span>
            CodeMaster
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1 text-white hover:bg-white/10">
                Languages
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 grid grid-cols-2">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.name} asChild>
                  <Link to={lang.path} className={`${lang.name === language ? 'bg-primary/10 font-medium' : ''}`}>
                    {lang.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/about">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              About
            </Button>
          </Link>
          
          <Link to="/contact">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Contact
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-white/80 hidden md:inline-block">
                {user.fullName || user.username || 'User'}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
                onClick={() => signOut()}
              >
                <LogOutIcon className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="secondary" size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
