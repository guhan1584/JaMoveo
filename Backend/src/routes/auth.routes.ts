import { Router } from "express";
import { signupHandler, loginHandler } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signupHandler(false));
router.post("/admin-signup", signupHandler(true));
router.post("/login", loginHandler);

export default router;
