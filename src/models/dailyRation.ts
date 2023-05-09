import * as mongoose from "mongoose";
const { Schema, model } = require('mongoose');

const dailyDishesSchema = new Schema({
    productName: {type:String, required:[true, "Missing productName field"]},
    energy: {type:Number, required:[true, "Missing energy field"]},
    protein: {type:Number, required:[true, "Missing protein field"]},
    fat: {type:Number, required:[true, "Missing fat field"]},
    carbs: {type:Number, required:[true, "Missing carbs field"]},
    fiber: { type: Number, required: [true, "Missing fiber field"] },
    weight:{type:Number, required:[true, " Missing weight field"]}
})

const dailyRationSchema = new Schema({
    date: { type: String, required: [true, "Missing date field"] },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    dailyDishes:[dailyDishesSchema]
})

const DailyRation = model("dailyRation", dailyRationSchema);

module.exports = DailyRation;