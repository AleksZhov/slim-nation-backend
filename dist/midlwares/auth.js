"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { User } = require("../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { JWT_SECRET_KEY } = process.env;
const auth = async (req, res) => {
    const { authorization } = req.headers;
    if (authorization) {
        const [bearer, token] = authorization.split(" ");
        if (bearer !== "Bearer") {
            return { currentUser: null, error: "Not authorized" };
        }
        ;
        try {
            const { id } = jwt.verify(token, JWT_SECRET_KEY);
            if (id) {
                const currentUser = await User.findById(id);
                if (!currentUser || !currentUser.accessToken || currentUser.accessToken === "") {
                    return { currentUser: null, error: "Not authorized" };
                }
                ;
                return { currentUser, error: null };
            }
        }
        catch (error) {
            console.log(error.message);
            return { currentUser: null, error: error.message };
        }
    }
};
module.exports = auth;
