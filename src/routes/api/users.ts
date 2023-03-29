const express = require('express');
import { Request, Response } from "express";

const router = express.Router();


router.get("/current", (req: Request, res: Response) => {
    res.status(200).json({ users: ["a", "b", "c"] })
});

module.exports = router;