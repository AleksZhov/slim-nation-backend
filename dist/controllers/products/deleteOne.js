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
const { Product } = require('../../models/');
const createError = require("http-errors");
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const deletedProduct = yield Product.findByIdAndRemove(id);
        console.log('deletedProduct: ', deletedProduct);
        if (deletedProduct) {
            res.status(201).json(deletedProduct);
        }
        else if (deletedProduct === null) {
            next(createError(404, "Product with this id does not exist"));
        }
    }
    catch (error) {
        next(createError(404, error.message));
    }
});
module.exports = deleteOne;
