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
const { auth } = require("../../midlwares");
const { createProductBodyValidShema } = require("../../validationSchemas/validationSchemas");
const addOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = createProductBodyValidShema.validate(req.body);
    if (error) {
        next(createError(400, error.message));
    }
    ;
    const { currentUser } = yield auth(req, res);
    try {
        const newProduct = yield Product.create(Object.assign(Object.assign({}, req.body), { owner: currentUser._id }));
        res.status(201).json({ newProduct });
    }
    catch (error) {
        next(createError(400, error._message));
    }
});
module.exports = addOne;
