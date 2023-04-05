import { NextFunction, Request, Response } from "express";
const { Product } = require('../../models');
const {auth}= require("../../midlwares")
const getAll = async (req: Request, res: Response, next:NextFunction) => {
    const currentUser = await auth(req,res,next)
    const result = await Product.find({owner:currentUser.id});
    res.status(200).json({
        status: "success",
        code: 200,
        data: {result } 
    })
 };
module.exports = getAll;