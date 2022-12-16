"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var base_controller_1 = require("../../../shared/base.controller");
var partner_repository_1 = require("./partner.repository");
var partnerRepository = new partner_repository_1["default"]();
var PartnerController = /** @class */ (function (_super) {
    __extends(PartnerController, _super);
    function PartnerController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PartnerController;
}(base_controller_1["default"]));
exports["default"] = PartnerController;
