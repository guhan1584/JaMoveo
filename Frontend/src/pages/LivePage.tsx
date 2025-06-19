"use client";

import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Song } from "@/types/song";
import {
  joinSession,
  onSongSelected,
  onSessionEnded,
  onSongChanging,
  onLinesUpdated,
  quitSession,
  emitSongChanging,
  connectSocket,
} from "@/sockets/sockets";
import { Button } from "@/components/ui/button";
import { Power, Crown, Users, Play, Pause, SkipForward } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { useScrolling } from "@/hooks/useScrolling";

const LivePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [song, setSong] = useState<Song | null>(location.state?.song || null);
  const socket = useMemo(() => connectSocket(), []);
  const userRole = useUserRole();

  const { scrolling, setScrolling, visibleLines, setVisibleLines, contentRef } =
    useScrolling({ userRole, song });

  useEffect(() => {
    const currentPath = location.pathname;
    if (userRole.isAdmin && currentPath === "/live") {
      navigate("/admin/live");
      return;
    } else if (!userRole.isAdmin && currentPath === "/admin/live") {
      navigate("/live");
      return;
    }

    joinSession(userRole.username);

    onSongSelected((receivedSong) => {
      setSong(receivedSong);
      setVisibleLines(1);
    });

    onSessionEnded(() => {
      alert("Session ended by admin");
      navigate(userRole.isAdmin ? "/admin" : "/user");
    });

    onSongChanging(() => {
      setSong(null);
    });

    return () => {
      socket.off("song-selected");
      socket.off("session-ended");
      socket.off("song-changing");
    };
  }, [navigate, userRole.username, userRole.isAdmin]);

  useEffect(() => {
    onLinesUpdated((newLineCount: number) => {
      setVisibleLines(newLineCount);
    });
    return () => {
      socket.off("lines-updated");
    };
  }, [socket]);

  const handleChangeSong = () => {
    if (userRole.isAdmin) {
      emitSongChanging();
      navigate("/admin");
    }
  };

  const handleQuit = () => {
    if (userRole.isAdmin) {
      if (
        window.confirm(
          "Are you sure you want to end the session for all players?"
        )
      ) {
        quitSession();
        window.location.href = "/";
      }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      quitSession();
      window.location.href = "/";
    }
  };

  const songWithAuthor = song as Song & { author?: string };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col px-4 relative overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex items-center justify-between py-4">
        <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            {userRole.isAdmin ? (
              <Crown className="w-4 h-4 text-yellow-400" />
            ) : (
              <Users className="w-4 h-4 text-blue-400" />
            )}
            <span className="text-white font-medium">
              {userRole.isAdmin ? "Band Leader" : userRole.instrument}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {userRole.isAdmin && (
            <>
              <Button
                onClick={handleChangeSong}
                className="h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Switch Song</span>
                <span className="sm:hidden">Switch</span>
              </Button>
              <Button
                onClick={handleQuit}
                className="h-10 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Power className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">End Session</span>
                <span className="sm:hidden">End</span>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-start justify-center pt-2 pb-4">
        <div className="w-full max-w-6xl h-[75vh] bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl rounded-2xl p-6 flex flex-col mt-4">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
              {song?.title}
            </h1>
            {songWithAuthor.author && (
              <p className="text-blue-100 text-lg">
                by {songWithAuthor.author}
              </p>
            )}
          </div>

          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            style={{
              maxHeight: "calc(75vh - 100px)",
              minHeight: "calc(75vh - 100px)",
            }}
          >
            <div className="space-y-8 p-4 mb-10">
              {song?.content.slice(0, visibleLines).map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${lineIndex * 0.1}s` }}
                >
                  {userRole.instrument === "vocal" ? (
                    <div className="text-center">
                      <div className="inline-flex flex-wrap gap-3 justify-center items-baseline">
                        {line.map((wordToken, wordIndex) => (
                          <span
                            key={wordIndex}
                            className="text-white text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed"
                          >
                            {wordToken.lyrics}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="inline-flex flex-wrap gap-8 justify-center items-end">
                        {line.map((wordToken, wordIndex) => (
                          <div
                            key={wordIndex}
                            className="flex flex-col items-center min-w-0"
                          >
                            <div className="h-12 flex items-center justify-center mb-2">
                              {wordToken.chords && (
                                <div className="text-yellow-300 font-bold text-xl sm:text-2xl lg:text-3xl whitespace-nowrap">
                                  {wordToken.chords}
                                </div>
                              )}
                            </div>
                            <div className="text-white text-lg sm:text-2xl lg:text-3xl font-medium whitespace-nowrap">
                              {wordToken.lyrics}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {userRole.isAdmin && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => setScrolling((prev) => !prev)}
            className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
              scrolling
                ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                : "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            }`}
            aria-label="Toggle scroll"
          >
            {scrolling ? (
              <Pause className="w-7 h-7 text-white" />
            ) : (
              <Play className="w-7 h-7 text-white ml-1 " />
            )}
          </button>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </div>
  );
};

export default LivePage;
