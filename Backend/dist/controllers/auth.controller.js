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
exports.loginHandler = exports.signupHandler = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_schema_1 = require("../validations/auth.schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Helper function to generate JWT token
const generateToken = (user) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jsonwebtoken_1.default.sign({
        userId: user._id,
        username: user.username,
        admin: user.admin,
        instrument: user.instrument,
    }, secret, { expiresIn: "24h" });
};
// Helper function to format user response
const formatUserResponse = (user) => ({
    userId: user._id,
    username: user.username,
    admin: user.admin,
    instrument: user.instrument,
});
const signupHandler = (isAdmin) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = auth_schema_1.signupSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ message: parsed.error.flatten().fieldErrors });
            return;
        }
        const { username, password, instrument } = parsed.data;
        const existingUser = yield user_1.default.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({
            username,
            password: hashedPassword,
            instrument,
            admin: isAdmin,
        });
        yield newUser.save();
        // Generate token and format response
        const token = generateToken(newUser);
        const userResponse = formatUserResponse(newUser);
        res.status(201).json({
            message: isAdmin ? "Admin user created" : "User created",
            token,
            user: userResponse,
        });
        return;
    }
    catch (error) {
        console.error("Signup error:", error);
        if (error instanceof Error && error.message.includes("JWT_SECRET")) {
            res.status(500).json({ message: "Server misconfiguration" });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
        return;
    }
});
exports.signupHandler = signupHandler;
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = auth_schema_1.loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ message: parsed.error.flatten().fieldErrors });
            return;
        }
        const { username, password } = parsed.data;
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Generate token and format response using helper functions
        const token = generateToken(user);
        const userResponse = formatUserResponse(user);
        res.status(200).json({
            message: "Login successful",
            token,
            user: userResponse,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        if (error instanceof Error && error.message.includes("JWT_SECRET")) {
            res.status(500).json({ message: "Server misconfiguration" });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
        return;
    }
});
exports.loginHandler = loginHandler;
