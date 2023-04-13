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
const { Product } = require('../../models');
const { auth } = require("../../midlwares");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentUser, error } = yield auth(req, res);
    if (!error) {
        const result = yield Product.find({ owner: currentUser._id });
        res.status(200).json({
            status: "success",
            code: 200,
            data: result
        });
    }
    else {
        res.status(401).json({ message: error });
    }
});
module.exports = getAll;
