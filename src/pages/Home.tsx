
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon, CodeIcon, BookOpenIcon, MailIcon, LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import GradientBackground from "@/components/GradientBackground";
import { Badge } from "@/components/ui/badge";

const languages = [
  { name: "Python", path: "/python", color: "bg-blue-600 hover:bg-blue-700" },
  { name: "JavaScript", path: "/javascript", color: "bg-yellow-600 hover:bg-yellow-700" },
  { name: "TypeScript", path: "/typescript", color: "bg-blue-500 hover:bg-blue-600" },
  { name: "Java", path: "/java", color: "bg-red-600 hover:bg-red-700" },
  { name: "Go", path: "/golang", color: "bg-cyan-600 hover:bg-cyan-700" },
  { name: "C#", path: "/csharp", color: "bg-purple-600 hover:bg-purple-700" },
  { name: "Ruby", path: "/ruby", color: "bg-red-500 hover:bg-red-600" },
  { name: "Swift", path: "/swift", color: "bg-orange-600 hover:bg-orange-700" },
  { name: "Kotlin", path: "/kotlin", color: "bg-purple-500 hover:bg-purple-600" },
  { name: "PHP", path: "/php", color: "bg-indigo-600 hover:bg-indigo-700" },
  { name: "Rust", path: "/rust", color: "bg-orange-700 hover:bg-orange-800" },
  { name: "SQL", path: "/sql", color: "bg-gray-600 hover:bg-gray-700" },
  { name: "R", path: "/r", color: "bg-blue-600 hover:bg-blue-700" },
  { name: "Dart", path: "/dart", color: "bg-teal-600 hover:bg-teal-700" }
];

const Home = () => {
  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col antialiased">
        <header className="border-b border-white/10 py-4 backdrop-blur-md">
          <div className="container flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-white">
              CodeMaster
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="sm" className="flex items-center gap-1">
                  <LogInIcon className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 container py-10">
          <section className="py-12 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Master Your Coding Skills
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Practice coding challenges in multiple programming languages and improve your problem-solving abilities.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/python">
                  <Button size="lg" className="gap-2">
                    Start Coding Now
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="gap-2 border-white/20 text-white hover:bg-white/10">
                    <BookOpenIcon className="h-4 w-4" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </section>

          <section className="py-12">
            <h2 className="text-3xl font-bold text-white text-center mb-10">
              Choose Your Language
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={lang.path}>
                    <Card className="h-full bg-white/10 border-white/5 backdrop-blur-sm hover:bg-white/20 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white">{lang.name}</CardTitle>
                        <CardDescription className="text-white/70">
                          Solve {lang.name} coding challenges
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white/60 text-sm">
                          Practice with interactive {lang.name} questions and get instant feedback.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Badge className={`${lang.color}`}>
                          {lang.name}
                        </Badge>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Why Practice with Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/5"
              >
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-4">
                  <CodeIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Multiple Languages</h3>
                <p className="text-white/70">
                  Practice in 14 different programming languages to expand your skills.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/5"
              >
                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Interactive Learning</h3>
                <p className="text-white/70">
                  Get instant feedback on your code and learn from your mistakes.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/5"
              >
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Track Progress</h3>
                <p className="text-white/70">
                  Complete challenges and earn certificates to showcase your skills.
                </p>
              </motion.div>
            </div>
          </section>
          
          <section className="py-12 text-center">
            <Link to="/contact">
              <Button variant="outline" size="lg" className="gap-2 border-white/20 text-white hover:bg-white/10">
                <MailIcon className="h-4 w-4" />
                Contact Us
              </Button>
            </Link>
          </section>
        </main>
        
        <footer className="border-t border-white/10 py-6 backdrop-blur-sm">
          <div className="container text-center text-white/60 text-sm">
            <p>© {new Date().getFullYear()} CodeMaster. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </GradientBackground>
  );
};

export default Home;
