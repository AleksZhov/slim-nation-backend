"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
router.get("/current", (req, res) => {
    res.status(200).json({ users: ["a", "b", "c"] });
});
module.exports = router;
