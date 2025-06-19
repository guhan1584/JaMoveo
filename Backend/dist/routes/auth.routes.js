"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/signup", (0, auth_controller_1.signupHandler)(false));
router.post("/admin-signup", (0, auth_controller_1.signupHandler)(true));
router.post("/login", auth_controller_1.loginHandler);
exports.default = router;
