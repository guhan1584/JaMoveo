"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connectSocket, joinSession, selectSong } from "@/sockets/sockets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Music, Play, Search, Loader2, LogOut } from "lucide-react";
import type { Song } from "@/types/song";
import api from "@/config/axios";

const AdminResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query || "";

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filtered = songs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    // Get admin info
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const username = user?.username || "Admin";

    // Connect socket only once
    connectSocket();
    joinSession(username);

    // Fetch songs
    api
      .get("/songs")
      .then((res) => {
        setSongs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load songs.");
        setLoading(false);
      });

    // No cleanup needed for socket as we want to maintain the connection
  }, []);

  const handleSelectSong = (song: Song) => {
    console.log("Admin selecting song for broadcast");
    selectSong(song);
    navigate("/admin/live", { state: { song } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4 relative overflow-x-hidden flex items-center justify-center">
      {/* Responsive background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Main container - Centered both horizontally and vertically */}
      <div className="w-full max-w-sm md:max-w-4xl relative z-10">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-lg rounded-2xl">
          <CardHeader className="p-6 md:p-8 pb-4 md:pb-6">
            {/* Navigation Buttons - Left and Right */}
            <div className="flex items-center justify-between w-full mb-6">
              {/* Back to Search - Left */}
              <Button
                variant="ghost"
                onClick={() => navigate("/admin")}
                className="bg-gradient-to-r from-slate-700/40 to-gray-800/40 hover:from-slate-600/60 hover:to-gray-700/60 border border-slate-500/40 hover:border-white/40 text-slate-200 hover:text-white rounded-xl p-3 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-sm md:text-base">Back to Search</span>
              </Button>

              {/* Exit Button - Right */}
              <Button
                onClick={handleLogout}
                className="h-10 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="sm:hidden">Exit</span>
              </Button>
            </div>

            {/* Search Results Info - Center */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Search Results
              </h2>
              <p className="text-white/70 text-base md:text-lg">
                Found songs matching "{query}"
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8 pt-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
                <p className="text-white/70 text-lg">Loading songs...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-red-400 text-lg">{error}</p>
              </div>
            ) : filtered.length > 0 ? (
              <div className="space-y-4">
                <p className="text-white/60 text-sm md:text-base mb-4">
                  {filtered.length} song{filtered.length !== 1 ? "s" : ""} found
                </p>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  {filtered.map((song, index) => (
                    <div
                      key={song.title}
                      className="group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Button
                        className="w-full h-auto p-4 md:p-6 bg-gradient-to-r from-blue-700/50 to-cyan-800/50 hover:from-blue-600/60 hover:to-cyan-700/60 border border-blue-300/30 hover:border-blue-300/50 rounded-xl transition-all duration-300 transform hover:scale-[1.02] group text-left backdrop-blur-sm"
                        variant="ghost"
                        onClick={() => handleSelectSong(song)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-4 flex-1 min-w-0">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0">
                              <Music className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>
                            <div className="text-left min-w-0 flex-1">
                              <h3 className="text-white font-semibold text-base md:text-lg group-hover:text-cyan-200 transition-colors duration-300 truncate">
                                {song.title}
                              </h3>
                              {song.author && (
                                <p className="text-white/70 text-sm md:text-base truncate">
                                  by {song.author}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 ml-4">
                            <Play className="w-5 h-5 text-cyan-300" />
                            <span className="text-cyan-300 font-medium text-base hidden sm:inline">
                              Select
                            </span>
                          </div>
                        </div>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white/40" />
                </div>
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-2">
                  No songs found
                </h3>
                <p className="text-white/60 text-base md:text-lg mb-6">
                  Try searching with different keywords
                </p>
                <Button
                  onClick={() => navigate("/admin")}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300"
                >
                  <Search className="w-4 h-4 mr-2" />
                  New Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminResultsPage;
