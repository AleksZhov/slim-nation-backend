import { Request, Response } from "express";
const { Product } = require('../../models')
const getAll = async (req: Request, res: Response) => {
    const result = await Product.find({});
    res.json({
        status: "success",
        code: 200,
        data: {result } 
    })
 };
module.exports = getAll;