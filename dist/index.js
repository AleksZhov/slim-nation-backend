"use strict";
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const { PORT = 3001, DB_HOST } = process.env;
mongoose.connect(DB_HOST)
    .then(() => { console.log("Database connected"); })
    .then(app.listen(PORT, () => console.log(`Example application listening on port ${PORT}`)))
    .catch((err) => { console.log(err.message); process.exit(1); });
