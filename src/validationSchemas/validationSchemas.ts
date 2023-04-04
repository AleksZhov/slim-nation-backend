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