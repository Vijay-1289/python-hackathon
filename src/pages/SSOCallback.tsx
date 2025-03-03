
import React, { useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";

const SSOCallback = () => {
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    // Call handleRedirectCallback with the current URL
    handleRedirectCallback({
      // Pass the redirect URL to be handled
      redirectUrl: window.location.href
    });
  }, [handleRedirectCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="w-16 h-16 bg-primary/20 rounded-xl inline-flex items-center justify-center mb-4">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-medium text-zinc-900">Finalizing authentication...</h2>
        <p className="text-zinc-500 mt-2">You'll be redirected shortly.</p>
      </div>
    </div>
  );
};

export default SSOCallback;
