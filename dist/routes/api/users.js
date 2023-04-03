"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { ctrlWrapper } = require('../../helpers/');
const { users: { createUser } } = require("../../controllers");
const router = express.Router();
router.post("/sign-in", (req, res, next) => { ctrlWrapper(createUser(req, res, next)); });
router.get("/current", (req, res) => {
    res.status(200).json({ users: ["a", "b", "c"] });
});
module.exports = router;
