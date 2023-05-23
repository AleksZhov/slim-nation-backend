"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMealDishBodyValidSchema = exports.createNewMealBodyValidSchema = exports.createProductBodyValidShema = exports.signInReqBodyValidSchema = exports.loginReqBodyValidSchema = void 0;
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
    date: Joi.string().min(8).max(16).required(),
    currentDish: Joi.object({
        productName: Joi.string().min(3).required(),
        energy: Joi.number().integer().greater(-1).less(1000).required(),
        protein: Joi.number().greater(-1).less(101).required(),
        fat: Joi.number().greater(-1).less(101).required(),
        carbs: Joi.number().greater(-1).less(101).required(),
        fiber: Joi.number().greater(-1).less(101).required(),
        weight: Joi.number().integer().greater(5).less(5000).required()
    })
});
exports.deleteMealDishBodyValidSchema = Joi.object({
    date: Joi.string().min(8).max(15).required(),
    id: Joi.string().min(24).max(26).required(),
});
