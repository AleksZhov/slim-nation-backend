import { NextFunction, Request, Response } from "express";
const bcrypt = require('bcrypt')
const createError = require("http-errors")
const { User } = require("../../models/");
import { loginReqBodyValidSchema } from "../../validationSchemas/validationSchemas";
const {createJWTForUser} = require("../../helpers")


const loginUser = async (req: Request, res: Response, next: NextFunction) => {

const { error } = loginReqBodyValidSchema.validate(req.body);
    if (error) { next(createError(400, error.message)) };

    const { email, password } = req.body;
    const requestedUser = await User.findOne({ email });
    if (!requestedUser) { next(createError(401, "Email or password wrong")) };
    const result = bcrypt.compareSync(password, requestedUser.password);
    if (!result) { next(createError(401, "Email or password wrong")) };
    const accessToken = createJWTForUser(requestedUser._id, "15m")
    const refreshToken = createJWTForUser(requestedUser._id, "7d")
    const refreshedUser = await User.findByIdAndUpdate(requestedUser._id, { accessToken, refreshToken },{returnDocument:"after"});
   

    res.status(201).json({ user: { name: refreshedUser.name, email: refreshedUser.email },accessToken:refreshedUser.accessToken,refreshToken:refreshedUser.refreshToken})

}
module.exports = loginUser;