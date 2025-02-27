
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { TrophyIcon, UserRoundIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const Leaderboard = () => {
  const { leaderboard, username } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedLeaderboard, setSortedLeaderboard] = useState(leaderboard);
  
  // Sort leaderboard by solved count (descending)
  useEffect(() => {
    const sorted = [...leaderboard].sort((a, b) => b.solvedCount - a.solvedCount);
    setSortedLeaderboard(sorted);
  }, [leaderboard]);
  
  // Filter leaderboard based on search query
  const filteredLeaderboard = sortedLeaderboard.filter(entry => 
    entry.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col h-full border rounded-lg bg-card overflow-hidden">
      <div className="p-4 border-b flex items-center">
        <TrophyIcon className="h-4 w-4 mr-2" />
        <h2 className="font-medium">Leaderboard</h2>
      </div>
      
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredLeaderboard.length > 0 ? (
            filteredLeaderboard.map((entry, index) => (
              <div 
                key={entry.username}
                className={cn(
                  "p-3 rounded-md border flex items-center gap-3",
                  entry.username === username && "bg-secondary/50 border-primary/30"
                )}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary font-medium text-xs">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <UserRoundIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium truncate">{entry.username}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span 
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                        entry.level === "beginner" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                        entry.level === "intermediate" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                        entry.level === "pro" && "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      )}
                    >
                      {entry.level}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {entry.solvedCount} solved
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground p-4">
              No users found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Leaderboard;
