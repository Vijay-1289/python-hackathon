
import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="absolute top-4 right-4">
        <Link to="/home">
          <Button variant="ghost" className="text-white">
            <HomeIcon className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-md rounded-lg border border-white/20 bg-white/10 p-8 backdrop-blur-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-white/80">Sign in to continue your coding journey</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
