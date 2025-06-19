// src/services/socket.ts
import { io, type Socket } from "socket.io-client";
import type { Song } from "@/types/song";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

let socket: Socket | null = null;
let currentUsername: string | null = null;

const ensureSocket = (): Socket => {
  if (!socket) throw new Error("Socket not connected");
  return socket;
};

export const connectSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: false,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket?.id);
      if (currentUsername) {
        socket?.emit("join-session", { username: currentUsername });
      }
    });

    socket.on("disconnect", () => {
      console.warn("❌ Disconnected from socket");
    });

    socket.on("connect_error", (err) => {
      console.error("⚠️ Connection error:", err);
    });

    socket.on("reconnect", (attempt) => {
      console.log(`🔄 Reconnected after ${attempt} attempt(s)`);
    });
  }

  return socket;
};

// -- Emitters --

export const joinSession = (username: string) => {
  const s = connectSocket();
  if (currentUsername !== username) {
    currentUsername = username;
    s.emit("join-session", { username });
    console.log(`👤 Joined as ${username}`);
  }
};

export const selectSong = (song: Song) => {
  ensureSocket().emit("select-song", song);
};

export const quitSession = () => {
  const s = ensureSocket();
  s.emit("quit-session");
  currentUsername = null;
};

// New: Emit song changing (e.g. when admin switches song)
export const emitSongChanging = () => {
  ensureSocket().emit("song-changing");
};

// New: Emit visible line count
export const emitVisibleLines = (count: number) => {
  ensureSocket().emit("update-visible-lines", count);
};

// -- Listeners --

export const onSongSelected = (callback: (song: Song) => void) => {
  const s = connectSocket();
  s.off("song-selected").on("song-selected", callback);
};

export const onSessionEnded = (callback: () => void) => {
  const s = connectSocket();
  s.off("session-ended").on("session-ended", callback);
};

export const onSongChanging = (callback: () => void) => {
  const s = connectSocket();
  s.off("song-changing").on("song-changing", callback);
};

export const onLinesUpdated = (callback: (count: number) => void) => {
  const s = connectSocket();
  s.off("lines-updated").on("lines-updated", callback);
};

// -- Cleanup --

export const disconnectSocket = () => {
  if (!socket) return;
  currentUsername = null;
  socket.disconnect();
  socket = null;
  console.log("🛑 Socket disconnected");
};
