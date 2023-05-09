"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { ctrlWrapper } = require('../../helpers/');
const { dailyRation: { getOne } } = require("../../controllers");
const router = express.Router();
router.get("/", async (req, res) => { ctrlWrapper(getOne(req, res)); });
router.post("/", async (req, res) => { ctrlWrapper(getOne(req, res)); });
module.exports = router;
