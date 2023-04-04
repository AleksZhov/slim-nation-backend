import { NextFunction, Request, Response } from "express";
const bcrypt = require('bcrypt')
const createError = require("http-errors")
const jwt = require("jsonwebtoken")
const { User } = require("../../models/");
import { loginReqBodyValidSchema } from "../../validationSchemas/validationSchemas";
require('dotenv').config();



const { JWT_SECRET_KEY } = process.env;

const loginUser = async (req: Request, res: Response, next: NextFunction) => {

const { error } = loginReqBodyValidSchema.validate(req.body);
    if (error) { next(createError(400, error.message)) };

    const { email, password } = req.body;
    const requestedUser = await User.findOne({ email });
    if (!requestedUser) { next(createError(401, "Email or password wrong")) };
    const result = bcrypt.compareSync(password, requestedUser.password);
    if (!result) { next(createError(401, "Email or password wrong")) };
    const jwtPayload = { id: requestedUser._id }
    const accessToken = jwt.sign(jwtPayload, JWT_SECRET_KEY, { expiresIn: "7d" });
    const refreshToken = jwt.sign(jwtPayload, JWT_SECRET_KEY, { expiresIn: "15m" })
    const refreshedUser = await User.findByIdAndUpdate(requestedUser._id, { accessToken, refreshToken },{returnDocument:"after"});
    console.log('refreshedUser: ', refreshedUser);

    res.status(201).json({ user: { name: refreshedUser.name, email: refreshedUser.email },accessToken:refreshedUser.accessToken,refreshToken:refreshedUser.refreshToken})

}
module.exports = loginUser;