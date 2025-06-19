"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSongHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getSongHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.admin) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    }
    try {
        const heyJudeRaw = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "data", "hey_jude.json"), "utf8");
        const veechSheloRaw = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "..", "data", "veech_shelo.json"), "utf8");
        const heyJudeContent = JSON.parse(heyJudeRaw);
        const veechSheloContent = JSON.parse(veechSheloRaw);
        const songs = [
            {
                title: "Hey Jude",
                author: "The Beatles",
                content: heyJudeContent,
                language: "en",
            },
            {
                title: "ואיך שלא",
                author: "אריאל זילבר",
                content: veechSheloContent,
                language: "he",
            },
        ];
        res.status(200).json(songs);
    }
    catch (error) {
        console.error("Error reading song files:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSongHandler = getSongHandler;
