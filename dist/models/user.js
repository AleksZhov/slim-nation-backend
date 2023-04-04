"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require("mongoose");
const userSchema = Schema({
    name: { type: String, required: [true, "Missing name field"] },
    email: { type: String, required: [true, "Missing email field"] },
    password: { type: String, required: [true, "Missing password field"] },
    refreshToken: String,
    accessToken: String,
}, { versionKey: false, timestamps: true });
const User = model("user", userSchema);
module.exports = User;
