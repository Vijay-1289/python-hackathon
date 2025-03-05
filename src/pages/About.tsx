
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeIcon, BookIcon, ArrowLeftIcon, GraduationCapIcon, AwardIcon, CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import GradientBackground from "@/components/GradientBackground";

const About = () => {
  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col">
        <header className="border-b border-white/10 p-4 backdrop-blur-md bg-white/5 relative z-10">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-white flex items-center">
              <BookIcon className="mr-2 h-6 w-6" />
              CodeChallenge
            </h1>
            <div className="flex items-center space-x-4">
              <Link to="/home">
                <Button variant="ghost" className="text-white">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        <main className="flex-1 container mx-auto py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-xl"
            >
              <div className="mb-8 text-center">
                <GraduationCapIcon className="h-16 w-16 mx-auto text-blue-400 mb-4" />
                <h1 className="text-3xl font-bold text-white">About CodeChallenge</h1>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="space-y-8 text-white/90">
                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <CodeIcon className="mr-2 h-5 w-5 text-blue-400" />
                    Our Mission
                  </h2>
                  <p>
                    CodeChallenge was created with a simple mission: to make programming practice accessible, engaging, 
                    and effective for everyone. We believe that regular coding practice is the key to mastering any 
                    programming language, and our platform is designed to make that process enjoyable and rewarding.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    <AwardIcon className="mr-2 h-5 w-5 text-blue-400" />
                    What We Offer
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Carefully curated challenges across 14 programming languages</li>
                    <li>Progressive difficulty levels from beginner to advanced</li>
                    <li>Real-time feedback on your code submissions</li>
                    <li>Personalized learning paths based on your skill level</li>
                    <li>Achievement certificates to showcase your progress</li>
                    <li>A supportive community of fellow learners</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Our Approach</h2>
                  <p>
                    We believe in learning by doing. Our challenges are designed to reinforce programming concepts 
                    through practical application. Each challenge introduces new concepts or builds upon previous 
                    ones, creating a comprehensive learning experience that steadily improves your skills.
                  </p>
                </div>

                <div className="pt-4">
                  <Link to="/home">
                    <Button className="w-full">
                      <ArrowLeftIcon className="mr-2 h-4 w-4" />
                      Back to Homepage
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
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

export default About;
