"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationSchemas_1 = require("../../validationSchemas/validationSchemas");
const createError = require("http-errors");
const { DailyRation } = require('../../models');
const { auth } = require("../../midlwares");
const createMealDish = async (req, res, next) => {
    const { error } = validationSchemas_1.createNewMealBodyValidSchema.validate(req.body);
    if (error) {
        next(createError(400, error.message));
    }
    else {
        const { currentUser, error } = await auth(req, res);
        if (error) {
            console.log(typeof error);
            next(createError(403, error));
        }
        else {
            try {
                const currentDay = await DailyRation.findOne({ owner: currentUser._id, date: req.body.date });
                if (currentDay) {
                    currentDay.dailyDishes.push(req.body.currentDish);
                    const result = await currentDay.save();
                    res.status(201).json(result);
                }
                else {
                    const currentDay = await DailyRation.create({ date: req.body.date, owner: currentUser._id });
                    currentDay.dailyDishes.push(req.body.currentDish);
                    const result = await currentDay.save();
                    res.status(201).json(result);
                }
            }
            catch (error) {
                next(createError(400, error.message));
            }
        }
    }
};
module.exports = createMealDish;
