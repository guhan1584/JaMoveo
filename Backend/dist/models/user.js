"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const instruments_1 = require("../constants/instruments");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    instrument: {
        type: String,
        required: true,
        enum: instruments_1.ALLOWED_INSTRUMENTS,
        message: "Invalid instrument",
    },
    admin: { type: Boolean, required: true },
}, { timestamps: true });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
