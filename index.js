"use strict";
exports.__esModule = true;
// const express = require('express');
var module_1 = require();
var app = (0, module_1["default"])();
var port = 3001;
app.get('/', function (req, res) {
    res.send("Hello world");
});
app.listen(port, function () { console.log("Example applicatio listening on port ".concat(port)); });
