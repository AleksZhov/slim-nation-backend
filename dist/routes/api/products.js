"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { products: { getAll, addOne, deleteOne } } = require("../../controllers/");
const { ctrlWrapper } = require('../../helpers/');
const router = express.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { ctrlWrapper(getAll(req, res)); }));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctrlWrapper(addOne(req, res, next));
}));
router.delete("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctrlWrapper(deleteOne(req, res, next));
}));
module.exports = router;
