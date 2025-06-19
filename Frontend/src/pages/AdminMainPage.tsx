"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Music, Sparkles, Crown, LogOut } from "lucide-react";

const AdminMainPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate("/admin/results", { state: { query } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-x-hidden">
      {/* Animated background elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Main Card - Responsive */}
      <Card className="w-full max-w-sm md:max-w-2xl relative z-10 bg-white/10 backdrop-blur-lg border-white/20 shadow-lg rounded-2xl">
        <Button
          onClick={handleLogout}
          className="absolute top-4 left-4 z-50 h-10 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span className="sm:hidden">Exit</span>
        </Button>
        <CardHeader className="text-center p-6 md:p-8 pb-6 md:pb-8">
          <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-2xl">
            <Crown className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mb-2">
            Band Leader Dashboard
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
            <p className="text-white/70 text-sm md:text-lg">
              Search and select songs for your band
            </p>
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6 md:space-y-8 p-6 md:p-8 pt-0">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
              Find Your Next Song
            </h2>
            <p className="text-white/60 text-sm md:text-base">
              Search our library in English or Hebrew
            </p>
          </div>

          {/* Search Section - Responsive */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4 md:h-5 md:w-5" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 md:pl-12 pr-4 h-12 md:h-14 bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400/20 text-base md:text-lg rounded-xl transition-all duration-200"
                    placeholder="Type song name or artist..."
                    autoFocus
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Music className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Instrument Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-center">
            <div className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="text-xl md:text-2xl font-bold text-purple-400 mb-2">
                🎸
              </div>
              <p className="text-white/70 text-xs md:text-sm">Guitar & Bass</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="text-xl md:text-2xl font-bold text-blue-400 mb-2">
                🎹
              </div>
              <p className="text-white/70 text-xs md:text-sm">Piano & Keys</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 md:p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="text-xl md:text-2xl font-bold text-pink-400 mb-2">
                🎤
              </div>
              <p className="text-white/70 text-xs md:text-sm">Vocals & More</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMainPage;
