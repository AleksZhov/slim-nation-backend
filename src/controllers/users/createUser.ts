import { NextFunction, Request, Response } from "express";
const bcrypt = require('bcrypt')
const createError = require("http-errors")

const { User } = require("../../models/");
import { signInReqBodyValidSchema } from "../../validationSchemas/validationSchemas";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = signInReqBodyValidSchema.validate(req.body);
    if (error) { next(createError(400, error.message)) };
    const { name, email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const requestedUser = await User.find({email})
    if (requestedUser.length > 0) { next(createError(409, "Email in use")) };
    const newUser = await User.create({
        email,
        name,
        password: hashPassword,
        accessToken: '',
        refreshToken:''
    });
    res.status(201).json({
        user: {
            email: newUser.email,
        name:newUser.name,}
    })

}

module.exports = createUser;