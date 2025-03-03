
import React from "react";
import { useSignIn, useSignUp, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import GradientBackground from "@/components/GradientBackground";

const Login = () => {
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const clerk = useClerk();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleAuth = async () => {
    if (!isSignInLoaded || !isSignUpLoaded) return;
    try {
      setIsLoading(true);
      // Using the correct OAuth method and properties from Clerk
      await clerk.openSignIn({
        appearance: {
          elements: {
            rootBox: "mx-auto",
          },
        },
        signInUrl: "/login",
        redirectUrl: "/sso-callback",
        afterSignInUrl: "/",
      });
    } catch (error) {
      console.error("Google auth error:", error);
      toast({
        title: "Authentication Error",
        description: "There was a problem signing in with Google.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 backdrop-blur-sm">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <div className="w-32 h-32 mx-auto mb-4">
              <img 
                src="/lovable-uploads/77a7c0d3-f658-4307-a018-34fa7008f6d4.png" 
                alt="Python Challenge Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-medium text-zinc-900">Python Challenge</h1>
            <p className="text-zinc-500 text-sm">Sign in to track your progress and save your solutions</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-zinc-200 p-6 space-y-4">
            <Button 
              variant="outline" 
              className="w-full rounded-xl h-12 border border-zinc-200 shadow-sm transition-all hover:shadow-md flex items-center justify-center gap-2 bg-white hover:bg-zinc-50"
              onClick={handleGoogleAuth}
              disabled={isLoading}
            >
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span className={isLoading ? "opacity-0" : "opacity-100"}>
                Continue with Google
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-zinc-600 mt-8 bg-white/30 backdrop-blur-sm rounded-lg p-2">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </GradientBackground>
  );
};

export default Login;
