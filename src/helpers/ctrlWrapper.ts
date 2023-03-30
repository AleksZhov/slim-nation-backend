import { Request, Response, NextFunction } from "express"
const ctrlWrapper = (ctrl:Function): Function => {
    const func = async (req:Request, res:Response, next:NextFunction) => {
        try {
            await ctrl(req, res, next)
        } catch (err) {
            next(err)
        }
    }
    return func;
}
module.exports = ctrlWrapper;