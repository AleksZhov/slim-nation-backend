"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DailyRation } = require('../../models');
const { auth } = require("../../midlwares");
const getOneDailyRation = async (req, res) => {
    const { currentUser, error } = await auth(req, res);
    const { date } = req.body;
    if (!error) {
        const result = await DailyRation.find({ owner: currentUser._id, date });
        res.status(200).json({
            status: "success",
            code: 200,
            data: result
        });
    }
    else {
        res.status(401).json({ message: error });
    }
};
module.exports = getOneDailyRation;
