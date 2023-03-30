"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const logger = require("morgan");
const cors = require('cors');
const createError = require("http-errors");
const usersRouter = require("./routes/api/users");
const productsRouter = require("./routes/api/products");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use((req, res, next) => {
    next(createError(404, "Page was not found"));
});
app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});
module.exports = app;
