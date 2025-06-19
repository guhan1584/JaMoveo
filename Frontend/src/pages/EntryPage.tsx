"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Music, Users, Crown, Sparkles } from "lucide-react";

const EntryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-x-hidden">
      {/* Animated background elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-sm md:max-w-md relative z-10 bg-white/10 backdrop-blur-lg border-white/20 shadow-lg rounded-2xl">
        <CardHeader className="text-center p-6 md:p-8 pb-4">
          <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Music className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
            Welcome to JaMoveo
          </h1>
          <div className="flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <p className="text-blue-100 text-sm">
              Your collaborative music experience
            </p>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 pt-2">
          <p className="text-center text-blue-100/80 text-sm leading-relaxed mb-6">
            Join the band and make music together in real-time
          </p>

          <div className="space-y-4">
            <Button
              className="w-full h-12 md:h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-base"
              onClick={() => navigate("/signup")}
            >
              <Users className="w-5 h-5 mr-3" />
              Join as Musician
            </Button>

            <Button
              className="w-full h-12 md:h-14 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-base"
              onClick={() => navigate("/admin-signup")}
            >
              <Crown className="w-5 h-5 mr-3" />
              Sign Up as Band Leader
            </Button>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <p className="text-center text-blue-100/60 text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-300 cursor-pointer hover:text-white transition-colors duration-200 font-medium hover:underline"
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EntryPage;
