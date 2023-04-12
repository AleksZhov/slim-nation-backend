import { NextFunction, Request, Response } from "express";
const bcrypt = require('bcrypt')
const createError = require("http-errors")

const { User } = require("../../models/");
const {auth} = require("../../midlwares")

const logout = async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = await auth(req, res, next);
    
    if (currentUser) {
     await User.findByIdAndUpdate(currentUser._id, { accessToken: "", refreshToken: "" });

    res.status(204).json({})
}
   
  
};

module.exports = logout;