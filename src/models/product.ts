const { Schema, model } = require('mongoose');
// import { IProductData } from "../types";
const productSchema =new Schema({
    productName: {type:String, required:[true, "Missing productName field"]},
    energy: {type:Number, required:[true, "Missing energy field"]},
    protein: {type:Number, required:[true, "Missing protein field"]},
    fat: {type:Number, required:[true, "Missing fat field"]},
    carbs: {type:Number, required:[true, "Missing carbs field"]},
    fiber: {type:Number, required:[true, "Missing fiber field"]}
});

const Product = model("product", productSchema);

module.exports = Product;