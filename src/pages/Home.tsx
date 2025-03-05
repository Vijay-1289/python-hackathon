
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CodeIcon, 
  CpuIcon, 
  DatabaseIcon, 
  TerminalIcon,
  GlobeIcon,
  ServerIcon,
  BrainIcon,
  SettingsIcon,
  BookIcon,
  PhoneIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import GradientBackground from "@/components/GradientBackground";

const languages = [
  { id: "python", name: "Python", icon: <TerminalIcon className="h-5 w-5" />, color: "bg-blue-500", route: "/" },
  { id: "javascript", name: "JavaScript", icon: <CodeIcon className="h-5 w-5" />, color: "bg-yellow-500", route: "/javascript" },
  { id: "java", name: "Java", icon: <CpuIcon className="h-5 w-5" />, color: "bg-orange-500", route: "/java" },
  { id: "typescript", name: "TypeScript", icon: <CodeIcon className="h-5 w-5" />, color: "bg-blue-600", route: "/typescript" },
  { id: "golang", name: "Go (Golang)", icon: <GlobeIcon className="h-5 w-5" />, color: "bg-cyan-500", route: "/golang" },
  { id: "csharp", name: "C#", icon: <CodeIcon className="h-5 w-5" />, color: "bg-purple-600", route: "/csharp" },
  { id: "ruby", name: "Ruby", icon: <GlobeIcon className="h-5 w-5" />, color: "bg-red-600", route: "/ruby" },
  { id: "swift", name: "Swift", icon: <PhoneIcon className="h-5 w-5" />, color: "bg-orange-600", route: "/swift" },
  { id: "kotlin", name: "Kotlin", icon: <PhoneIcon className="h-5 w-5" />, color: "bg-purple-500", route: "/kotlin" },
  { id: "php", name: "PHP", icon: <ServerIcon className="h-5 w-5" />, color: "bg-indigo-500", route: "/php" },
  { id: "rust", name: "Rust", icon: <SettingsIcon className="h-5 w-5" />, color: "bg-orange-800", route: "/rust" },
  { id: "sql", name: "SQL", icon: <DatabaseIcon className="h-5 w-5" />, color: "bg-green-600", route: "/sql" },
  { id: "r", name: "R", icon: <BrainIcon className="h-5 w-5" />, color: "bg-blue-700", route: "/r" },
  { id: "dart", name: "Dart", icon: <CodeIcon className="h-5 w-5" />, color: "bg-teal-500", route: "/dart" },
];

// Floating animation elements
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 80 + 20;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10 z-0"
            style={{
              width: size,
              height: size,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 150 + 100)}, ${Math.floor(Math.random() * 255)}, 0.3)`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// Code animation for the heading
const CodeAnimation = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="code-container bg-black/30 backdrop-blur-md p-4 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm font-mono">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-green-400"
          >
            &gt; welcome to code challenge
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-blue-300"
          >
            &gt; function learnToCode() &#123;
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="text-yellow-300 ml-4"
          >
            return &quot;Practice makes perfect!&quot;;
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.6 }}
            className="text-blue-300"
          >
            &#125;
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col">
        <FloatingElements />
        
        <header className="border-b border-white/10 p-4 backdrop-blur-md bg-white/5 relative z-10">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-white flex items-center">
              <BookIcon className="mr-2 h-6 w-6" />
              CodeChallenge
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white">About</Button>
              <Button variant="ghost" className="text-white">Contact</Button>
              <Button variant="secondary">Sign In</Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 container mx-auto px-6 py-12 relative z-10">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Master Programming with Challenges
            </motion.h1>
            <motion.p 
              className="text-lg text-white/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Choose a language below and start your coding journey with interactive challenges.
              Earn certificates as you progress and build your skills.
            </motion.p>
          </div>
          
          <CodeAnimation />
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {languages.map((language, index) => (
              <motion.div
                key={language.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link to={language.route} className="block">
                  <div className={`bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 border border-white/5 rounded-xl shadow-xl overflow-hidden group-hover:shadow-2xl`}>
                    <div className={`${language.color} py-3 px-4 flex items-center justify-center`}>
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full">
                        {language.icon}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-white mb-2">{language.name}</h3>
                      <p className="text-white/70 text-sm">
                        Complete challenges, earn a certificate, and master {language.name} programming.
                      </p>
                      <div className="mt-4 flex items-center text-sm text-white/60">
                        <div className="flex space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className="w-2 h-2 rounded-full bg-white/40"></span>
                          ))}
                        </div>
                        <span className="ml-auto">Beginner → Advanced</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </main>
        
        <footer className="border-t border-white/10 py-6 backdrop-blur-sm bg-white/5 relative z-10">
          <div className="container mx-auto text-center text-white/60 text-sm">
            <p>© {new Date().getFullYear()} CodeChallenge - Practice your programming skills</p>
          </div>
        </footer>
      </div>
    </GradientBackground>
  );
};

export default Home;
