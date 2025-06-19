"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Clock, Users, Headphones, LogOut } from "lucide-react";
import { connectSocket, joinSession, onSongSelected } from "@/sockets/sockets";

const UserMainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const username = user?.username || "Anonymous";

    // Connect socket and join session
    connectSocket();
    joinSession(username);

    // Listen for song selection
    onSongSelected((song) => {
      console.log("User received song:", song);
      navigate("/live", { state: { song } });
    });

    return () => {
      // Clean up listeners but don't disconnect
      const socket = connectSocket();
      socket.off("song-selected");
    };
  }, [navigate]);

  const handleExit = () => {
    // Clear user data and go back to entry page
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-x-hidden">
      {/* Animated background elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Exit Button - Fixed Top Right */}

      {/* Main Card - Responsive */}
      <Card className="w-full max-w-sm md:max-w-lg relative z-10 bg-white/10 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
        <Button
          onClick={handleExit}
          className="fixed top-4 left-4 z-50 h-10 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="sm:hidden">Exit</span>
        </Button>
        <CardContent className="flex flex-col items-center justify-center space-y-6 md:space-y-8 p-8 md:p-16">
          {/* Animated music icon - Responsive */}
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Music className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Main content - Responsive */}
          <div className="text-center space-y-3 md:space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Ready to Rock!
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed px-2">
              Waiting for the band leader to select our next song...
            </p>
          </div>

          {/* Status indicators - Responsive */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/60">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-sm">Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Headphones className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm">Waiting</span>
            </div>
          </div>

          {/* Animated waiting indicator */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
          </div>

          {/* Footer text - Responsive */}
          <p className="text-white/50 text-xs md:text-sm text-center max-w-xs md:max-w-md leading-relaxed">
            Your instrument and preferences are ready. The session will begin as
            soon as a song is selected.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserMainPage;
