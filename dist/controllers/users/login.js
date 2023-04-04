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
const validationSchemas_1 = require("../../validationSchemas/validationSchemas");
require('dotenv').config();
const { JWT_SECRET_KEY } = process.env;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchemas_1.loginReqBodyValidSchema.validate(req.body);
    if (error) {
        next(createError(400, error.message));
    }
    ;
    const { email, password } = req.body;
    const requestedUser = yield User.findOne({ email });
    if (!requestedUser) {
        next(createError(401, "Email or password wrong"));
    }
    ;
    const result = bcrypt.compareSync(password, requestedUser.password);
    if (!result) {
        next(createError(401, "Email or password wrong"));
    }
    ;
    const jwtPayload = { id: requestedUser._id };
    const accessToken = jwt.sign(jwtPayload, JWT_SECRET_KEY, { expiresIn: "7d" });
    const refreshToken = jwt.sign(jwtPayload, JWT_SECRET_KEY, { expiresIn: "15m" });
    const refreshedUser = yield User.findByIdAndUpdate(requestedUser._id, { accessToken, refreshToken }, { returnDocument: "after" });
    console.log('refreshedUser: ', refreshedUser);
    res.status(201).json({ user: { name: refreshedUser.name, email: refreshedUser.email }, accessToken: refreshedUser.accessToken, refreshToken: refreshedUser.refreshToken });
});
module.exports = loginUser;
