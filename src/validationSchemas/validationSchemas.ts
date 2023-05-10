import { object } from 'joi';

const Joi = require('joi')

export const loginReqBodyValidSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password: Joi.string().min(5).required(),
});

export const signInReqBodyValidSchema = Joi.object({
        name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    password: Joi.string().min(5).required(),

});

export const createProductBodyValidShema = Joi.object({
    productName: Joi.string().min(3).required(),
    energy:Joi.number().required(),
    protein:Joi.number().required(),
    fat:Joi.number().required(),
    carbs:Joi.number().required(),
    fiber:Joi.number().required(),
})

export const createNewMealBodyValidSchema = Joi.object({
    date:Joi.string().min(8).max(15).required(),
    currentDish: Joi.object({
       productName: Joi.string().min(3).required(),
    energy: Joi.number().integer().greater(-1).less(1000).required(),
    protein: Joi.number().integer().greater(-1).less(101).required(),
    fat: Joi.number().integer().greater(-1).less(101).required(),
    carbs: Joi.number().integer().greater(-1).less(101).required(),
        fiber: Joi.number().integer().greater(-1).less(101).required(),
    weight:Joi.number().integer().greater(5).less(5000).required()
    })
})

export const deleteMealDishBodyValidSchema = Joi.object({
    date: Joi.string().min(8).max(15).required(),
    id:Joi.string().min(24).max(26).required(),
})