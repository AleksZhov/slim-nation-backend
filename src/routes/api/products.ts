const express = require("express");
import { NextFunction, Request, Response } from "express";
import { AddProductRequest } from "../../types";

const { products: { getAll, addOne, deleteOne } } = require("../../controllers/")
const { ctrlWrapper } = require('../../helpers/')


const router = express.Router();


router.get("/",
    async(req: Request, res: Response) => { ctrlWrapper(getAll(req, res)) }
);

router.post("/",
    async (req: Request, res: Response, next:NextFunction) => {
        ctrlWrapper(addOne(req, res,next))
    })

router.delete("/",
    async (req: Request, res: Response, next: NextFunction) => {
        ctrlWrapper(deleteOne(req, res, next))
    })

module.exports = router;