import { NextFunction, Request, Response } from "express";
const { User } = require("../models");
const createError = require("http-errors")
const jwt = require("jsonwebtoken");
require('dotenv').config();

const { JWT_SECRET_KEY } = process.env;

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
  
    if (authorization) {
        const [bearer, token] = authorization.split(" ");
      
        if (bearer !== "Bearer") { next(createError(401, " Not authorized")) };

       try {
           const { id } = jwt.verify(token, JWT_SECRET_KEY);
           
        const currentUser = await User.findById(id);
           if (!currentUser || !currentUser.accessToken || currentUser.accessToken === "") { next(createError(401, "Not authorized")) };
           return currentUser;
       } catch (error:any) {
           if (error.message === "invalid signature") {
               next(createError(401, "invalid signature"))
           }
       }
    }
}

module.exports = auth;