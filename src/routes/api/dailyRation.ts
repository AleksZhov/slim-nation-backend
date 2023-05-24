const express = require("express");

import { NextFunction, Request, Response } from "express";
const { ctrlWrapper } = require('../../helpers/')
const {dailyRation:{getOneDailyRation,createMealDish, deleteMealDish}} = require("../../controllers")

const router = express.Router();


router.post("/meals/", async (req: Request, res: Response, next:NextFunction) => { ctrlWrapper(getOneDailyRation(req, res, next)) })

router.post("/", async (req: Request, res: Response, next:NextFunction) => { ctrlWrapper(createMealDish(req, res, next)) })


router.delete("/", async (req: Request, res: Response, next:NextFunction) => { ctrlWrapper(deleteMealDish(req, res, next)) })

module.exports = router;