import { NextFunction, Request, Response } from "express";
const { Product } = require('../../models');
const {auth}= require("../../midlwares")
const getAll = async (req: Request, res: Response) => {
    const { currentUser, error } = await auth(req, res)
   
    if(!error){  const result = await Product.find({owner:currentUser._id});
    res.status(200).json({
        status: "success",
        code: 200,
        data: result 
    })
    }
    else{res.status(401).json({message:error})}
 };
module.exports = getAll;