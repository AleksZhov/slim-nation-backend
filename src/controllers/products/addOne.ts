import { NextFunction, Request, Response } from "express";
const { Product } = require('../../models/')
const createError = require("http-errors")



const addOne = async(req: Request, res: Response,next:NextFunction) => {
    const { productData } = req.body;
    try {
        const newProduct = await Product.create(productData);
    res.status(201).json({ newProduct })
    } catch (error:any) {
       next(createError(400, error._message)) 
        
    }
   
   


}
module.exports =  addOne ;