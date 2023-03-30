const express = require("express");
import { Request, Response } from "express";

const { getAll } = require("../../controllers/products")
const { ctrlWrapper } = require('../../helpers/')


const router = express.Router();


router.get("/",
    async(req: Request, res: Response) => { ctrlWrapper(getAll(req, res)) }
    
    // async (req: Request, res: Response) => {
    //     const result = await Product.find({});
    //     res.json({ status: "success", code: 200, data: { result } })
        
    // }
);

module.exports = router;