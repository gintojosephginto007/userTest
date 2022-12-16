"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    res.body = req.body;
    res.path = req.path;
    next();
};
//# sourceMappingURL=common.middleware.js.map