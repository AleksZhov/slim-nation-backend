"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const createError = require("http-errors");
const { User } = require("../../models/");
const validationSchemas_1 = require("../../validationSchemas/validationSchemas");
const createUser = async (req, res, next) => {
    const { error } = validationSchemas_1.signInReqBodyValidSchema.validate(req.body);
    if (error) {
        next(createError(400, error.message));
    }
    else {
        const { name, email, password } = req.body;
        const requestedUser = await User.find({ email });
        if (requestedUser.length > 0) {
            next(createError(409, "Email in use"));
        }
        else {
            const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            const newUser = await User.create({
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
        }
    }
};
module.exports = createUser;
