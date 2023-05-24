import { NextFunction, Request, Response } from "express";
const createError = require("http-errors")
const { DailyRation } = require('../../models');
const { auth } = require("../../midlwares");
import { deleteMealDishBodyValidSchema } from "../../validationSchemas/validationSchemas";

const deleteMealDish = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = deleteMealDishBodyValidSchema.validate(req.body);
    if (error) {
        next(createError(400, error.message))
    } else {
        const { currentUser, error } = await auth(req, res)
        if (error) { next(createError(403, error.message)) } else {
            try {
                const currentDay = await DailyRation.findOne({ owner: currentUser._id, date: req.body.date });
                if (currentDay) {
                    
                    const result = currentDay.dailyDishes.id(req.body.id);
                    if (result) {
                        currentDay.dailyDishes.id(req.body.id).deleteOne();
                         await currentDay.save();
                    res.status(201).json(currentDay);
                    } else {
                        next(createError( 400, `Not found dish with ${req.body.id} id `))
                    }}
            } catch (error:any) {
                next(createError(400, error.message))
            }}}}

module.exports = deleteMealDish;