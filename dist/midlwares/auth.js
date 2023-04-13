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
const { User } = require("../models");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { JWT_SECRET_KEY } = process.env;
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                const currentUser = yield User.findById(id);
                if (!currentUser || !currentUser.accessToken || currentUser.accessToken === "") {
                    return { currentUser: null, error: "Not authorized" };
                }
                ;
                return { currentUser, error: null };
            }
        }
        catch (error) {
            if (error.message === "invalid signature") {
                return { currentUser: null, error: error.message };
            }
        }
    }
});
module.exports = auth;
