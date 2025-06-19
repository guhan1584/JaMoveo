import { Router } from "express";
import { getSongHandler } from "../controllers/song.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getSongHandler);

export default router;
