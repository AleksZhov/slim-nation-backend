import { createNewMealBodyValidSchema } from './../../validationSchemas/validationSchemas';
import { NextFunction, Request, Response } from "express";
const createError = require("http-errors")
const { DailyRation } = require('../../models');
const { auth } = require("../../midlwares");


const create = async (req: Request, res: Response, next:NextFunction) => {
      
   
    const { error } = createNewMealBodyValidSchema.validate(req.body);
    if (error) { next(createError(400, error.message)) }
    else {
        const { currentUser, error } = await auth(req, res)
        if (error) { next(createError(400, error.message)) } else {
            try {
                const currentDay = await DailyRation.findOne({ owner: currentUser._id, date: req.body.date });
            if (currentDay) {
                currentDay.dailyDishes.push(req.body.currentDish);
                const result = await currentDay.save();
                res.status(201).json(result)
            } else {
                const currentDay = await DailyRation.create({date:req.body.date, owner:currentUser._id})
                 currentDay.dailyDishes.push(req.body.currentDish);
                const result = await currentDay.save();
                res.status(201).json(result)
            }
            
            } catch (error:any) {
                next(createError(400, error.message))
            
           }
        
    }
    }

    
}
module.exports = create;