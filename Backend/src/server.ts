import mongoose from "mongoose";
import { createServer } from "http";
import app from "./app";
import { initializeSocket } from "./sockets/socket";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

// Create HTTP server
const server = createServer(app);

// Initialize Socket.io
initializeSocket(server);

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

mongoose
  .connect(process.env.MONGO_URI, { dbName: "JaMoveo" })
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Mongo connection error:", err));
