const express = require('express');
import { NextFunction, Request, Response } from "express";
const { ctrlWrapper } = require('../../helpers/');
const {users:{createUser,login, logout, refresh}} = require("../../controllers")

const router = express.Router();

router.post("/sign-in",
    (req: Request, res: Response, next: NextFunction) => { ctrlWrapper(createUser(req, res, next)) })
    
router.post("/login", (req: Request, res: Response, next: NextFunction) => { ctrlWrapper(login(req, res, next)) })

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
    ctrlWrapper(logout(req, res, next))
});
router.get("/refresh", (req: Request, res: Response, next: NextFunction) => {
    ctrlWrapper(refresh(req, res, next))
})

module.exports = router;