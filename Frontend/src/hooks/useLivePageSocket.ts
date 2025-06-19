import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  joinSession,
  onSongSelected,
  onSessionEnded,
  onSongChanging,
  onLinesUpdated,
  connectSocket,
} from "@/sockets/sockets";
import type { Song } from "@/types/song";

interface UseLivePageSocketProps {
  userRole: { isAdmin: boolean; username: string };
  setSong: (song: Song | null) => void;
  setVisibleLines: (lines: number) => void;
}

export const useLivePageSocket = ({
  userRole,
  setSong,
  setVisibleLines,
}: UseLivePageSocketProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const socket = connectSocket();

  // Socket effects
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
  }, [navigate, userRole.username, userRole.isAdmin, setSong, setVisibleLines]);

  // Listen for line updates
  useEffect(() => {
    onLinesUpdated((newLineCount: number) => {
      setVisibleLines(newLineCount);
    });
    return () => {
      socket.off("lines-updated");
    };
  }, [setVisibleLines]);

  return { socket };
};
