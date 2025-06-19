import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import fs from "fs";
import path from "path";
import { Song, SongLine } from "../types/song";

export const getSongHandler = async (req: AuthRequest, res: Response) => {
  if (!req.admin) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  try {
    const heyJudeRaw = fs.readFileSync(
      path.join(__dirname, "..", "..", "data", "hey_jude.json"),
      "utf8"
    );
    const veechSheloRaw = fs.readFileSync(
      path.join(__dirname, "..", "..", "data", "veech_shelo.json"),
      "utf8"
    );

    const heyJudeContent = JSON.parse(heyJudeRaw) as SongLine[];
    const veechSheloContent = JSON.parse(veechSheloRaw) as SongLine[];

    const songs: Song[] = [
      { title: "Hey Jude", author: "The Beatles", content: heyJudeContent },
      {
        title: "ואיך שלא",
        author: "אריאל זילבר",
        content: veechSheloContent,
      },
    ];

    res.status(200).json(songs);
  } catch (error) {
    console.error("Error reading song files:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
