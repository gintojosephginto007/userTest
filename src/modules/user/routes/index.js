"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_route_1 = require("../modules/user/user.route");
var router = express_1["default"].Router({ caseSensitive: true });
router.use("/user", user_route_1["default"]);
exports["default"] = router;
