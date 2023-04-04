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
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validationSchemas_1.signInReqBodyValidSchema.validate(req.body);
    if (error) {
        next(createError(400, error.message));
    }
    ;
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const requestedUser = yield User.find({ email });
    if (requestedUser.length > 0) {
        next(createError(409, "Email in use"));
    }
    ;
    const newUser = yield User.create({
        email,
        name,
        password: hashPassword,
        accessToken: '',
        refreshToken: ''
    });
    res.status(201).json({
        user: {
            email: newUser.email,
            name: newUser.name,
        }
    });
});
module.exports = createUser;
