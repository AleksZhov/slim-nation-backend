const express = require('express');
import { NextFunction, Request, Response } from "express";
const { ctrlWrapper } = require('../../helpers/');
const {users:{createUser,login}} = require("../../controllers")

const router = express.Router();

router.post("/sign-in",
    (req: Request, res: Response, next: NextFunction) => { ctrlWrapper(createUser(req, res, next)) })
    
router.post("/login", (req: Request, res: Response, next: NextFunction) => { ctrlWrapper(login(req, res, next)) })

router.get("/current", (req: Request, res: Response) => {
    res.status(200).json({ users: ["a", "b", "c"] })
});

module.exports = router;