"use strict";
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { JWT_SECRET_KEY } = process.env;
const createJWTforUser = (id, expiresIn) => {
    const payload = { id };
    const JWT = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
    return JWT;
};
module.exports = createJWTforUser;
