"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createError = require("http-errors");
const { DailyRation } = require('../../models');
const { auth } = require("../../midlwares");
const validationSchemas_1 = require("../../validationSchemas/validationSchemas");
const deleteMealDish = async (req, res, next) => {
    const { error } = validationSchemas_1.deleteMealDishBodyValidSchema.validate(req.body);
    if (error) {
        next(createError(400, error.message));
    }
    else {
        const { currentUser, error } = await auth(req, res);
        if (error) {
            next(createError(403, error.message));
        }
        else {
            try {
                const currentDay = await DailyRation.findOne({ owner: currentUser._id, date: req.body.date });
                if (currentDay) {
                    const result = currentDay.dailyDishes.id(req.body.id);
                    if (result) {
                        currentDay.dailyDishes.id(req.body.id).deleteOne();
                        await currentDay.save();
                        res.status(201).json(currentDay);
                    }
                    else {
                        next(createError(400, `Not found dish with ${req.body.id} id `));
                    }
                }
            }
            catch (error) {
                next(createError(400, error.message));
            }
        }
    }
};
module.exports = deleteMealDish;
