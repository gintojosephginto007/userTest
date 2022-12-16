"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_1 = __importDefault(require("./base.repository"));
class ShareRepository extends base_repository_1.default {
    countryList() {
        const sqlQuery = `SELECT country.id, country.name,country.iso_code,country.isd_code,country.mobile_number_length, country.value_of_one_point,country.currency_id,country.language_id, currency.short_name,currency.long_name,currency.symbol,language.long_english_name,CONCAT(currency.short_name,"(",currency.symbol,")"," - ",currency.long_name) AS default_currency
                            FROM country
                            LEFT JOIN currency ON currency.id = country.currency_id
                            LEFT JOIN language ON language.id = country.language_id
                            WHERE country.status = 1 AND language.status = 1;`;
        return this.excuteQuery({ sqlQuery, params: [], isSingle: false })
            .then(result => result.data);
    }
    getStates(params) {
        const sqlQuery = 'SELECT id, name FROM state WHERE country_id = ? AND status = 1 ORDER BY name ASC;';
        return this.excuteQuery({ sqlQuery, params: [params.country_id] })
            .then(row => row.data);
    }
    getCities(params) {
        const sqlQuery = 'SELECT id, name FROM city WHERE country_id = ? AND state_id = ? AND status = 1 ORDER BY name ASC;';
        return this.excuteQuery({ sqlQuery, params: [params.country_id, params.state_id] })
            .then(row => row.data);
    }
    getPostalCode(params) {
        const sqlQuery = 'SELECT id, post_code FROM post_code_view WHERE state_id = ? AND city_id = ? AND post_code LIKE ? ORDER BY post_code ASC;';
        return this.excuteQuery({ sqlQuery, params: [params.state_id, params.city_id, `${params.search_term}%`] })
            .then(row => row.data);
    }
    getBrands() {
        const sqlQuery = `SELECT brand.id, brand.brand_name FROM brand WHERE brand.status=1;`;
        return this.excuteQuery({ sqlQuery, params: [], isSingle: false })
            .then(row => row.data);
    }
    getCategories(param) {
        const sqlQuery = `select * from((SELECT id, cat_name AS name FROM category WHERE status = 1 AND parent_id = ? AND cat_name NOT IN ('Other', 'Otra', 'अन्य') ORDER BY name ASC)
        UNION
        (SELECT id, cat_name AS name FROM category WHERE status = 1 AND parent_id = ? AND cat_name IN ('Other', 'Otra', 'अन्य') ORDER BY name ASC)) AS result order by result.name asc`;
        return this.excuteQuery({ sqlQuery, params: [param, param] })
            .then(row => row.data);
    }
    getKeyword(params) {
        const sqlQuery = 'SELECT keyword FROM keyword WHERE status = 1 AND language_id = ? AND keyword LIKE ? ORDER BY keyword ASC;';
        return this.excuteQuery({ sqlQuery, params: [params.language_id, `${params.term}%`], isSingle: false })
            .then((row) => row.data);
    }
    getCampaignCities(params) {
        const sqlQuery = `SELECT id, name, state_id FROM city WHERE status = 1 AND country_id = ? AND state_id IN (?) ORDER BY name ASC;`;
        return this.excuteQuery({ sqlQuery, params: [params.country_id, params.states] })
            .then((row) => row.data);
    }
    // state_id: number; cities: number[];
    getCampaignPostalCode(params) {
        // AND state_id = ? AND city_id IN (?)
        const sqlQuery = `SELECT id, post_code, city_id, state_id FROM post_code_view WHERE state_id = ? AND city_id = ? AND post_code LIKE ?;`;
        return this.excuteQuery({ sqlQuery, params: [params.state_id, params.cities, `${params.term}%`] }) // params.state_id, params.cities,
            .then((row) => row.data);
    }
    searchStates(params) {
        const sqlQuery = 'SELECT id, name FROM state WHERE status = 1 AND country_id = ? AND name LIKE ? ORDER BY name ASC;';
        return this.excuteQuery({ sqlQuery, params: [params.country_id, `${params.term}%`] })
            .then(row => row.data);
    }
    // state_id: number;
    searchCities(params) {
        // AND state_id = ?
        const sqlQuery = `SELECT id, name, state_id FROM city WHERE status = 1 AND country_id = ? AND state_id = ? AND name LIKE ? ORDER BY name ASC;`;
        return this.excuteQuery({ sqlQuery, params: [params.country_id, params.state_id, `${params.term}%`] }) // params.state_id,
            .then((row) => row.data);
    }
    getFilePath() {
        const sqlQuery = `SELECT id, source,local_path FROM s3_operations ORDER BY id DESC LIMIT 5`;
        return this.excuteQuery({ sqlQuery, params: [], isSingle: false })
            .then((row) => row.data);
    }
    getLanguageCategories(param) {
        const sqlQuery = `(SELECT id, cat_name AS name FROM category WHERE status = 1 AND parent_id IS NULL AND language_id = ? AND cat_name NOT IN ('Other', 'Otra', 'अन्य') ORDER BY name ASC)
        UNION
        (SELECT id, cat_name AS name FROM category WHERE status = 1 AND parent_id IS NULL AND language_id = ? AND cat_name IN ('Other', 'Otra', 'अन्य'))`;
        return this.excuteQuery({ sqlQuery, params: [param.language_id, param.language_id] })
            .then(row => row.data);
    }
    getLanguages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlQuery = `SELECT JSON_ARRAYAGG(JSON_OBJECT('id',lg.id ,'long_english_name',lg.long_english_name,'display_name',lg.display_name,'short_name',lg.short_name)) AS languageList FROM language AS lg WHERE lg.status = 1;`;
                const row = yield this.excuteQuery({ sqlQuery, params: [], isSingle: true });
                return row.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCampaignImages(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlQuery = `SELECT JSON_OBJECT(
                'campaign_image', CASE
                WHEN (cof.campaign_image = '' OR cof.campaign_image IS NULL) THEN ''
                WHEN (cof.campaign_image REGEXP '^/uploads/{1}') THEN CONCAT_WS('',( SELECT conf_s.config_value FROM config_settings conf_s WHERE conf_s.config_constant = 'PORTAL_BASE_URL'),cof.campaign_image)
                ELSE CONCAT_WS('',( SELECT conf_s.config_value FROM config_settings conf_s WHERE conf_s.config_constant = 'S3_BUCKET_IMAGE_BASE_URL'),cof.campaign_image) END,
                'campaign_thumbnail', CASE
                WHEN (cof.campaign_thumbnail = '' OR cof.campaign_thumbnail IS NULL) THEN ''
                WHEN (cof.campaign_thumbnail REGEXP '^/uploads/{1}') THEN CONCAT_WS('',( SELECT conf_s.config_value FROM config_settings conf_s WHERE conf_s.config_constant = 'PORTAL_BASE_URL'),cof.campaign_thumbnail)
                ELSE CONCAT_WS('',( SELECT conf_s.config_value FROM config_settings conf_s WHERE conf_s.config_constant = 'S3_BUCKET_IMAGE_BASE_URL'),cof.campaign_thumbnail) END
            ) AS images FROM campaign_offers AS cof WHERE id = ?;`;
                const { data } = yield this.excuteQuery({ sqlQuery, params: [params.offer_id], isSingle: true });
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ShareRepository;
//# sourceMappingURL=share.repository.js.map