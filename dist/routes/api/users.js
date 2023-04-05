"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { ctrlWrapper } = require('../../helpers/');
const { users: { createUser, login, logout, refresh } } = require("../../controllers");
const router = express.Router();
router.post("/sign-in", (req, res, next) => { ctrlWrapper(createUser(req, res, next)); });
router.post("/login", (req, res, next) => { ctrlWrapper(login(req, res, next)); });
router.get("/logout", (req, res, next) => {
    ctrlWrapper(logout(req, res, next));
});
router.get("/refresh", (req, res, next) => {
    ctrlWrapper(refresh(req, res, next));
});
module.exports = router;
