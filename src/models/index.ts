import {model} from 'mongoose'
const Product = require('./product');
const User = require('./user'); 
const DailyRation = require("./dailyRation")

module.exports = {Product, User, DailyRation}