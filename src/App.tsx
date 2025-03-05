
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SSOCallback from "./pages/SSOCallback";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sso-callback" element={<SSOCallback />} />
          
          {/* Python route */}
          <Route
            path="/python"
            element={
              <>
                <SignedIn>
                  <Index language="Python" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          
          {/* Language specific routes */}
          <Route
            path="/javascript"
            element={
              <>
                <SignedIn>
                  <Index language="JavaScript" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/java"
            element={
              <>
                <SignedIn>
                  <Index language="Java" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/typescript"
            element={
              <>
                <SignedIn>
                  <Index language="TypeScript" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/golang"
            element={
              <>
                <SignedIn>
                  <Index language="Go" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/csharp"
            element={
              <>
                <SignedIn>
                  <Index language="C#" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/ruby"
            element={
              <>
                <SignedIn>
                  <Index language="Ruby" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/swift"
            element={
              <>
                <SignedIn>
                  <Index language="Swift" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/kotlin"
            element={
              <>
                <SignedIn>
                  <Index language="Kotlin" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/php"
            element={
              <>
                <SignedIn>
                  <Index language="PHP" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/rust"
            element={
              <>
                <SignedIn>
                  <Index language="Rust" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/sql"
            element={
              <>
                <SignedIn>
                  <Index language="SQL" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/r"
            element={
              <>
                <SignedIn>
                  <Index language="R" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/dart"
            element={
              <>
                <SignedIn>
                  <Index language="Dart" />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
