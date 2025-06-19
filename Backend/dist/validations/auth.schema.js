"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
const instruments_1 = require("../constants/instruments");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(2, { message: "Username must be at least 2 characters long" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
    instrument: zod_1.z.enum(instruments_1.ALLOWED_INSTRUMENTS, {
        errorMap: () => ({
            message: "Please select a valid instrument from the list",
        }),
    }),
    admin: zod_1.z.boolean(),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(2, { message: "Username must be at least 2 characters long" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});
