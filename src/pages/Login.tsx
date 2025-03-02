
import React from "react";
import { useAuth, SignIn } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          Python Challenge
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in to practice your Python skills
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <SignIn
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
                footerActionLink: "text-primary hover:text-primary/90",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
