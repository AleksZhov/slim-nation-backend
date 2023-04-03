import { NextFunction, Request, Response } from "express";
const bcrypt = require('bcrypt')
const createError = require("http-errors")

const { User } = require("../../models/");


const createUser = async (req: Request, res: Response, next: NextFunction) => { 
    const { name, email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const requestedUser = await User.find({email})
    if (requestedUser.length > 0) { next(createError(409, "Email in use")) };
    const newUser = await User.create({
        email,
        name,
        password: hashPassword,
    });
    res.status(201).json({
        user: {
            email: newUser.email,
        name:newUser.name,}
    })

}

module.exports = createUser;