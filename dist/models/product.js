"use strict";
const { Schema, model } = require('mongoose');
const productSchema = Schema({
    productName: String,
    energy: Number,
    protein: Number,
    fat: Number,
    carbs: Number,
    fiber: Number
});
const Product = model("product", productSchema);
module.exports = Product;
