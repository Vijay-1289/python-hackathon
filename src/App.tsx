
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <Index />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sso-callback" element={<SSOCallback />} />
          
          {/* Language specific routes */}
          <Route
            path="/javascript"
            element={
              <>
                <SignedIn>
                  <Index />
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
                  <Index />
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
                  <Index />
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
                  <Index />
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
                  <Index />
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
                  <Index />
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
                  <Index />
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
                  <Index />
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
                  <Index />
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
                  <Index />
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
                  <Index />
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
                  <Index />
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
                  <Index />
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
