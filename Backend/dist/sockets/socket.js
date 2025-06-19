"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketInstance = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initializeSocket = (server) => {
    // Create Socket.io server
    io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: false,
        },
        transports: ["websocket", "polling"],
    });
    const connectedUsers = new Map();
    // Socket connection handling
    io.on("connection", (socket) => {
        console.log("New socket connection:", socket.id);
        // Player joins rehearsal session
        socket.on("join-session", (data) => {
            if (!data || typeof data.username !== "string") {
                console.warn("Invalid join session payload");
                return;
            }
            // Store user info
            connectedUsers.set(socket.id, data.username);
            socket.join("rehearsal-room");
            console.log(`${data.username} joined the session (${socket.id})`);
            // Broadcast to others
            socket.to("rehearsal-room").emit("user-joined", {
                username: data.username,
                totalUsers: connectedUsers.size,
            });
        });
        // Admin selects a song
        socket.on("select-song", (songData) => {
            const username = connectedUsers.get(socket.id);
            console.log(`Song selection from ${username}:`, songData);
            if (!songData ||
                typeof songData.title !== "string" ||
                !Array.isArray(songData.content)) {
                console.warn("Invalid song data");
                return;
            }
            console.log("Broadcasting song to rehearsal room");
            io.to("rehearsal-room").emit("song-selected", songData);
        });
        // Admin quits session
        socket.on("quit-session", () => {
            io.to("rehearsal-room").emit("session-ended");
        });
        // Add logging for socket events
        socket.on("update-visible-lines", (lineCount) => {
            console.log(`Socket ${socket.id} updating visible lines to ${lineCount}`);
            // Broadcast to all other clients in the room
            socket.broadcast.to("rehearsal-room").emit("lines-updated", lineCount);
        });
        socket.on("error", (error) => {
            console.error("Socket error:", error);
        });
        socket.on("disconnect", () => {
            const username = connectedUsers.get(socket.id);
            connectedUsers.delete(socket.id);
            console.log(`${username || "Unknown user"} disconnected (${socket.id})`);
        });
    });
    return io;
};
exports.initializeSocket = initializeSocket;
const getSocketInstance = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};
exports.getSocketInstance = getSocketInstance;
