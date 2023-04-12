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
const { User } = require("../../models/");
const validationSchemas_1 = require("../../validationSchemas/validationSchemas");
const { createJWTForUser } = require("../../helpers");
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchemas_1.loginReqBodyValidSchema.validate(req.body);
    if (error) {
        next(createError(400, error.message));
    }
    else {
        const { email, password } = req.body;
        const requestedUser = yield User.findOne({ email });
        if (!requestedUser) {
            next(createError(401, "Email or password wrong"));
        }
        else {
            const result = bcrypt.compareSync(password, requestedUser.password);
            if (!result) {
                next(createError(401, "Email or password wrong"));
            }
            else {
                const accessToken = createJWTForUser(requestedUser._id, "15m");
                const refreshToken = createJWTForUser(requestedUser._id, "7d");
                const refreshedUser = yield User.findByIdAndUpdate(requestedUser._id, { accessToken, refreshToken }, { returnDocument: "after" });
                res.status(201).json({ user: { name: refreshedUser.name, email: refreshedUser.email }, accessToken: refreshedUser.accessToken, refreshToken: refreshedUser.refreshToken });
            }
        }
    }
});
module.exports = loginUser;
