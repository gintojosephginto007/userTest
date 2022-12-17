"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __importDefault(require("i18n"));
const config_1 = __importDefault(require("../config"));
i18n_1.default.configure({
    locales: ['en_US', 'es_ES', 'joi_en_US', 'joi_es_ES', 'joi_hi_IN'],
    defaultLocale: config_1.default.localizationLanguage,
    // directory: path.resolve('./assets/locales/', 'i18n')
});
exports.default = i18n_1.default;
//# sourceMappingURL=index.js.map