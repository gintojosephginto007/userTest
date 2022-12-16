"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import db from "../../config/database/mysql-connection";
const base_repository_1 = __importDefault(require("../../../shared/base.repository"));
class PartnerRepository extends base_repository_1.default {
    getAllIncludeBrandList(marketingPartnerId) {
        const sqlQuery = `SELECT (SELECT JSON_ARRAYAGG(JSON_OBJECT('brand_id', id, 'brand_name', brand_name, 'brand_logo', concat(
            (SELECT config_value FROM config_settings WHERE config_constant = 'S3_BUCKET_IMAGE_BASE_URL'), brand_logo))) FROM brand WHERE status = 1) AS include_brand_list,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('brand_id', id, brand_name, brand_name, 'brand_logo', concat(
            (SELECT config_value FROM config_settings WHERE config_constant = 'S3_BUCKET_IMAGE_BASE_URL'), brand_logo))) FROM brand WHERE status = 1 and id in(SELECT brand_id FROM marketing_partner_exclude_brand WHERE status  = 1 AND  marketing_partner_id = ?)) AS exclude_brand_list`;
        return this.excuteQuery({ sqlQuery, params: [marketingPartnerId, marketingPartnerId], isSingle: true })
            .then(result => result);
    }
    getAllCategoryList(marketingPartnerId) {
        const sqlQuery = `SELECT 1 AS 'language_id', (SELECT JSON_ARRAYAGG(JSON_OBJECT('category_id', id, 'category_name', cat_name)) FROM category WHERE status = 1 and language_id =  1 and parent_id is null) AS include_category_list,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('category_id', id, cat_name, cat_name)) FROM category WHERE status = 1 and language_id = 1 and parent_id is null and id in(SELECT category_id FROM marketing_partner_exclude_category WHERE status  = 1 AND  marketing_partner_id = ?)) AS exclude_category_list`;
        return this.excuteQuery({ sqlQuery, params: [marketingPartnerId, marketingPartnerId], isSingle: true })
            .then(result => result);
    }
    invalidateExistingExcludeBrandList(marketingPartnerId) {
        const sqlQuery = `UPDATE marketing_partner_exclude_brand SET status = 0 WHERE marketing_partner_id = ?`;
        return this.excuteQuery({ sqlQuery, params: [marketingPartnerId] })
            .then(result => result);
    }
    saveExcludeBrandList(marketingPartnerId, brandId) {
        const sqlQuery = `INSERT INTO marketing_partner_exclude_brand (marketing_partner_id,brand_id,status) VALUES (?, ?, 1)`;
        return this.excuteQuery({ sqlQuery, params: [marketingPartnerId, brandId] })
            .then(result => result);
    }
    invalidateExistingExcludeCategoryList(marketingPartnerId) {
        const sqlQuery = `UPDATE marketing_partner_exclude_category SET status = 0 WHERE marketing_partner_id = ?`;
        return this.excuteQuery({ sqlQuery, params: [marketingPartnerId] })
            .then(result => result);
    }
    saveExcludeCategoryList(marketingPartnerId, categoryId) {
        const sqlQuery = `INSERT INTO marketing_partner_exclude_category (marketing_partner_id,category_id, status, language_id) VALUES (?, ?, 1, 1)`;
        return this.excuteQuery({ sqlQuery, params: [marketingPartnerId, categoryId] })
            .then(result => result);
    }
    supportLink(emailAddress, topic, queryMessage) {
        const sqlQuery = `INSERT INTO partner_support_queries (topic,message, partner_email_id, status) VALUES (?, ?, ?, 1)`;
        return this.excuteQuery({ sqlQuery, params: [emailAddress, topic, queryMessage] })
            .then(result => result.data);
    }
    getInfluencerCount(partnerId) {
        const sqlQuery = `SELECT count(*) AS inflCount FROM influencer WHERE status = 1 AND marketing_partner = ?`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getTotalShareCount(partnerId) {
        const sqlQuery = `SELECT sum(infOfrShr.share_count) AS shareCount, count(distinct infOfrShr.influencer_id) AS inflCount FROM influencer_offer_share_tracking AS infOfrShr JOIN influencer AS inf ON infOfrShr.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = ?`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getDistinctInfluencerShareCount(partnerId) {
        const sqlQuery = `SELECT count(distinct infOfrShr.influencer_id) AS shareCount FROM influencer_offer_share_tracking AS infOfrShr JOIN influencer AS inf ON infOfrShr.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = ?`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getTotalBrandsShared() {
        const sqlQuery = `SELECT count(distinct CO.brand_id) AS distinctBrand FROM influencer_offer_share_tracking AS IOST JOIN campaign_offers AS CO ON IOST.offer_id = CO.id`;
        return this.excuteQuery({ sqlQuery, params: [], isSingle: true })
            .then(result => result.data);
    }
    getTotalPointsEarnedTillDate(partnerId) {
        const sqlQuery = `SELECT SUM(infPntsBal.total_points_earned_till_date) AS totalPointsEarned, SUM(infPntsBal.total_points_earned_this_month) AS totalPointsEarnedThisMonth FROM influencer_points_balance infPntsBal JOIN influencer AS inf ON infPntsBal.influencer_id = inf.id and inf.status = 1 AND inf.marketing_partner = ?`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getTotalPointsEarnedThisMonth(partnerId) {
        const sqlQuery = `SELECT SUM(infPntsBal.total_points_earned_this_month) AS totalPointsEarnedThisMonth FROM influencer_points_balance infPntsBal JOIN influencer AS inf ON infPntsBal.influencer_id = inf.id and inf.status = 1 AND inf.marketing_partner = ?`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getTotalPointsRedeemedTillDate() {
        const sqlQuery = `SELECT SUM(total_points_redeemed_till_date) AS totalPointsRedeemedTillDate FROM influencer_points_balance`;
        return this.excuteQuery({ sqlQuery, params: [], isSingle: true })
            .then(result => result.data);
    }
    getTotalPointsRedeemedThisMonth(partnerId) {
        const sqlQuery = `SELECT sum(infRedReq.points_to_redeem) AS lastMonthPoints FROM influencer_redemption_requests AS infRedReq JOIN influencer AS inf ON infRedReq.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = ? AND  MONTH(infRedReq.date_requested) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND  YEAR(infRedReq.date_requested) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH)`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getTotalPointsGiftCardRedeemedThisMonth(partnerId) {
        const sqlQuery = `SELECT sum(infRedReqGift.points_to_redeem_currency_value) AS lastMonthPoints FROM influencer_redemption_requests_giftcard AS infRedReqGift JOIN influencer AS inf ON infRedReqGift.influencer_id = inf.id AND  inf.status = 1 AND inf.marketing_partner = ? AND  MONTH(infRedReqGift.date_requested) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND  YEAR(infRedReqGift.date_requested) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH)`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getTotalPointsRedeemedAsPoints(partnerId) {
        const sqlQuery = `SELECT sum(infRedReq.points_curreny_value) AS points FROM influencer_redemption_requests AS infRedReq JOIN influencer AS inf ON infRedReq.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = ?`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getTotalPointsGiftCardRedeemedAsVoucher(partnerId) {
        const sqlQuery = `SELECT sum(infRedReqGft.points_to_redeem_currency_value) AS lastMonthPoints FROM influencer_redemption_requests_giftcard AS infRedReqGft JOIN influencer AS inf ON infRedReqGft.influencer_id = inf.id AND inf.marketing_partner = ? AND inf.status = 1 `;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getTotalPointsEarnedYTD(partnerId) {
        const sqlQuery = `SELECT SUM(infErnRed.points_value_currency) AS totalPointsYTD FROM influencer_earn_redeem AS infErnRed JOIN influencer AS inf ON inf.marketing_partner = ? AND infErnRed.earned_redeemed_flag = 1 AND YEAR(infErnRed.date_earned) = YEAR(CURDATE())`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getTotalPointsRedeemedYTD(partnerId) {
        const sqlQuery = `SELECT sum(infRedReq.points_curreny_value) AS points FROM influencer_redemption_requests AS infRedReq JOIN influencer AS inf ON infRedReq.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = 13 AND YEAR(infRedReq.date_requested) = YEAR(curdate());`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getTotalGIftcardPointsRedeemedYTD(partnerId) {
        const sqlQuery = `SELECT sum(infRedReq.points_to_redeem_currency_value) AS points FROM influencer_redemption_requests_giftcard AS infRedReq JOIN influencer AS inf ON infRedReq.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = 13 AND YEAR(infRedReq.date_requested) = YEAR(curdate());`;
        return this.excuteQuery({ sqlQuery, params: [partnerId], isSingle: true })
            .then(result => result.data);
    }
    getDashboardData(partnerId) {
        const params = {
            partner_id: partnerId
        };
        return this.excuteProcedure({ procedureName: 'getPartnerPortalDashBoardDetails', params })
            .then(result => result);
    }
}
exports.default = PartnerRepository;
//# sourceMappingURL=user.repository.js.map