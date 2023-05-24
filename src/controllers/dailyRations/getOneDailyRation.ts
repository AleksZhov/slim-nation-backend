import { NextFunction, Request, Response } from "express";
const { DailyRation } = require('../../models');
const { auth } = require("../../midlwares")

const getOneDailyRation = async (req: Request, res: Response) => {
    const { currentUser, error } = await auth(req, res);
  const { date } = req.body;
  if(!error){  const result = await DailyRation.findOne({owner:currentUser._id, date});
    res.status(200).json(
        result 
    )
    }
    else{res.status(401).json({message:error})}

}
module.exports = getOneDailyRation;