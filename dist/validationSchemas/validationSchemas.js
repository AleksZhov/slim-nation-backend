"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewMealBodyValidSchema = exports.createProductBodyValidShema = exports.signInReqBodyValidSchema = exports.loginReqBodyValidSchema = void 0;
const Joi = require('joi');
exports.loginReqBodyValidSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password: Joi.string().min(5).required(),
});
exports.signInReqBodyValidSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password: Joi.string().min(5).required(),
});
exports.createProductBodyValidShema = Joi.object({
    productName: Joi.string().min(3).required(),
    energy: Joi.number().required(),
    protein: Joi.number().required(),
    fat: Joi.number().required(),
    carbs: Joi.number().required(),
    fiber: Joi.number().required(),
});
exports.createNewMealBodyValidSchema = Joi.object({
    date: Joi.string().min(8).max(15).required(),
    currentDish: Joi.object({
        productName: { type: String, required: [true, "Missing productName field"] },
        energy: { type: Number, required: [true, "Missing energy field"] },
        protein: { type: Number, required: [true, "Missing protein field"] },
        fat: { type: Number, required: [true, "Missing fat field"] },
        carbs: { type: Number, required: [true, "Missing carbs field"] },
        fiber: { type: Number, required: [true, "Missing fiber field"] },
        weight: Joi.number().greater(0).less(5000).required()
    })
});
