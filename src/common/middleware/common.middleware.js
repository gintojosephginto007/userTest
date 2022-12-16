"use strict";
exports.__esModule = true;
exports["default"] = (function (req, res, next) {
    res.body = req.body;
    res.path = req.path;
    next();
});
