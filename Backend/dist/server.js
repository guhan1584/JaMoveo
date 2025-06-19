"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const socket_1 = require("./sockets/socket");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
// Create HTTP server
const server = (0, http_1.createServer)(app_1.default);
// Initialize Socket.io
(0, socket_1.initializeSocket)(server);
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
}
mongoose_1.default
    .connect(process.env.MONGO_URI, { dbName: "JaMoveo" })
    .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => console.error("Mongo connection error:", err));
