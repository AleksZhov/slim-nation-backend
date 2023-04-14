"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Product } = require('../../models/');
const createError = require("http-errors");
const { auth } = require("../../midlwares");
const { createProductBodyValidShema } = require("../../validationSchemas/validationSchemas");
const addOne = async (req, res, next) => {
    const { error } = createProductBodyValidShema.validate(req.body);
    if (error) {
        next(createError(400, error.message));
    }
    ;
    const { currentUser } = await auth(req, res);
    try {
        const newProduct = await Product.create({ ...req.body, owner: currentUser._id });
        res.status(201).json({ newProduct });
    }
    catch (error) {
        next(createError(400, error._message));
    }
};
module.exports = addOne;
