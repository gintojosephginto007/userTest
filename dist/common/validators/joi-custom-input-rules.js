"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeDateFormatHypenYMD = exports.emailRegex = exports.rangeFormat = exports.pinCodeRegix = exports.dateFormatHypenYMD = exports.dateFormatSlashYMD = exports.mobileRegex = void 0;
exports.mobileRegex = /^([4-9][0-9]{9,11})$/;
exports.dateFormatSlashYMD = /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/;
exports.dateFormatHypenYMD = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
exports.pinCodeRegix = /^[1-9][0-9]{5}$/;
exports.rangeFormat = /^\d:\d$/;
exports.emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
// export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
exports.rangeDateFormatHypenYMD = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])):([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
//# sourceMappingURL=joi-custom-input-rules.js.map