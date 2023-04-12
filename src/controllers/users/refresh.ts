import { NextFunction, Request, Response } from "express";
const bcrypt = require('bcrypt')
const createError = require("http-errors")
const jwt = require("jsonwebtoken")
const { User } = require("../../models/");
const {createJWTForUser} = require("../../helpers")

require('dotenv').config();
const { JWT_SECRET_KEY } = process.env;


const refresh = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (authorization) {
        const [bearer, token] = authorization.split(" ");
      
        if (bearer !== "Bearer") { next(createError(401, " Not authorized")) } else {
              try {
           const { id } = jwt.verify(token, JWT_SECRET_KEY);
           
        const currentUser = await User.findById(id);
               if (!currentUser || !currentUser.refreshToken || currentUser.refreshToken === "") { next(createError(401, "Not authorized")) };
 const accessToken = createJWTForUser(currentUser._id, "15m")
    const refreshToken = createJWTForUser(currentUser._id, "7d")

    const refreshedUser = await User.findByIdAndUpdate(currentUser._id,{refreshToken, accessToken},{returnDocument:"after"})
                res.status(201).json({ user: { name: refreshedUser.name, email: refreshedUser.email },accessToken:refreshedUser.accessToken,refreshToken:refreshedUser.refreshToken})
          
       } catch (error:any) {
           if (error.message === "invalid signature") {
               next(createError(401, "invalid signature"))
           }
       }
        }
    }
};
module.exports = refresh;