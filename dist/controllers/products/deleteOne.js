"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Product } = require('../../models/');
const createError = require("http-errors");
const deleteOne = async (req, res, next) => {
    const { id } = req.body;
    try {
        const deletedProduct = await Product.findByIdAndRemove(id);
        if (deletedProduct) {
            res.status(201).json(deletedProduct);
        }
        else if (deletedProduct === null || !id) {
            next(createError(404, "Product with this id does not exist"));
        }
    }
    catch (error) {
        next(createError(404, error.message));
    }
};
module.exports = deleteOne;
