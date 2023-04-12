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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/");
const { createJWTForUser } = require("../../helpers");
require('dotenv').config();
const { JWT_SECRET_KEY } = process.env;
const refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (authorization) {
        const [bearer, token] = authorization.split(" ");
        if (bearer !== "Bearer") {
            next(createError(401, " Not authorized"));
        }
        else {
            try {
                const { id } = jwt.verify(token, JWT_SECRET_KEY);
                const currentUser = yield User.findById(id);
                if (!currentUser || !currentUser.refreshToken || currentUser.refreshToken === "") {
                    next(createError(401, "Not authorized"));
                }
                ;
                const accessToken = createJWTForUser(currentUser._id, "15m");
                const refreshToken = createJWTForUser(currentUser._id, "7d");
                const refreshedUser = yield User.findByIdAndUpdate(currentUser._id, { refreshToken, accessToken }, { returnDocument: "after" });
                res.status(201).json({ user: { name: refreshedUser.name, email: refreshedUser.email }, accessToken: refreshedUser.accessToken, refreshToken: refreshedUser.refreshToken });
            }
            catch (error) {
                if (error.message === "invalid signature") {
                    next(createError(401, "invalid signature"));
                }
            }
        }
    }
});
module.exports = refresh;
