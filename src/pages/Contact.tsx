
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeIcon, BookIcon, MailIcon, PhoneIcon, MapPinIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import GradientBackground from "@/components/GradientBackground";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
  };

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
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-xl"
            >
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white">Contact Us</h1>
                <p className="text-white/70 mt-2">
                  Have questions or feedback? We'd love to hear from you.
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Your message here..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-[150px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </div>

                <div className="space-y-6 text-white">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Get In Touch</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MailIcon className="h-5 w-5 text-blue-400 mt-1 mr-3" />
                        <div>
                          <h3 className="font-medium">Email Us</h3>
                          <p className="text-white/70">support@codechallenge.com</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <PhoneIcon className="h-5 w-5 text-blue-400 mt-1 mr-3" />
                        <div>
                          <h3 className="font-medium">Call Us</h3>
                          <p className="text-white/70">+1 (555) 123-4567</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPinIcon className="h-5 w-5 text-blue-400 mt-1 mr-3" />
                        <div>
                          <h3 className="font-medium">Our Office</h3>
                          <p className="text-white/70">
                            1234 Coding Lane<br />
                            San Francisco, CA 94107<br />
                            United States
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white hover:bg-white/10">
                        <GithubIcon className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white hover:bg-white/10">
                        <LinkedinIcon className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full border-white/20 text-white hover:bg-white/10">
                        <TwitterIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
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

export default Contact;
