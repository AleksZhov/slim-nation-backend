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
    mealID: Joi.string().min(20).max(25).required(),
    mealWeight: Joi.number().min(0).max(5000).required()
});
