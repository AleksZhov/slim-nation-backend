"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const createError = require("http-errors");
const { User } = require("../../models/");
const { auth } = require("../../midlwares");
const logout = async (req, res) => {
    const { currentUser, error } = await auth(req, res);
    if (!error) {
        await User.findByIdAndUpdate(currentUser._id, { accessToken: "", refreshToken: "" });
        res.status(204).json({});
    }
    else {
        res.status(401).json({ message: error.message });
    }
};
module.exports = logout;
