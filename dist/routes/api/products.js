"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { products: { getAll, addOne, deleteOne } } = require("../../controllers/");
const { ctrlWrapper } = require('../../helpers/');
const router = express.Router();
router.get("/", async (req, res) => { ctrlWrapper(getAll(req, res)); });
router.post("/", async (req, res, next) => {
    ctrlWrapper(addOne(req, res, next));
});
router.delete("/", async (req, res, next) => {
    ctrlWrapper(deleteOne(req, res, next));
});
module.exports = router;
