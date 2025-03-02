
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthRequired } from "./components/Auth/AuthRequired";

// Import the Google authentication key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "temporary_key_for_development";

function App() {
  // Check if we're in development and display a warning if the key is missing
  if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && import.meta.env.DEV) {
    console.warn("Missing Clerk Publishable Key. Authentication features won't work properly.");
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRequired>
                <Index />
              </AuthRequired>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
