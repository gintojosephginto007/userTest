"use strict";
exports.__esModule = true;
var i18n_1 = require("i18n");
var path_1 = require("path");
var config_1 = require("../config");
i18n_1["default"].configure({
    locales: ['en_US', 'es_ES', 'joi_en_US', 'joi_es_ES', 'joi_hi_IN'],
    defaultLocale: config_1["default"].localizationLanguage,
    directory: path_1["default"].resolve('./assets/locales/', 'i18n')
});
exports["default"] = i18n_1["default"];
