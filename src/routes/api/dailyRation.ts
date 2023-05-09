const express = require("express");

import { NextFunction, Request, Response } from "express";
const { ctrlWrapper } = require('../../helpers/')
const {dailyRation:{getOne}} = require("../../controllers")

const router = express.Router();


router.get("/", async (req: Request, res: Response) => { ctrlWrapper(getOne(req, res)) })

router.post("/", async (req: Request, res: Response) => { ctrlWrapper(getOne(req, res)) })
module.exports = router;
