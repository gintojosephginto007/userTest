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
// import db from "../../config/database/mysql-connection";
var base_repository_1 = require("../../../shared/base.repository");
var PartnerRepository = /** @class */ (function (_super) {
    __extends(PartnerRepository, _super);
    function PartnerRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PartnerRepository.prototype.getAllIncludeBrandList = function (marketingPartnerId) {
        var sqlQuery = "SELECT (SELECT JSON_ARRAYAGG(JSON_OBJECT('brand_id', id, 'brand_name', brand_name, 'brand_logo', concat(\n            (SELECT config_value FROM config_settings WHERE config_constant = 'S3_BUCKET_IMAGE_BASE_URL'), brand_logo))) FROM brand WHERE status = 1) AS include_brand_list,\n            (SELECT JSON_ARRAYAGG(JSON_OBJECT('brand_id', id, brand_name, brand_name, 'brand_logo', concat(\n            (SELECT config_value FROM config_settings WHERE config_constant = 'S3_BUCKET_IMAGE_BASE_URL'), brand_logo))) FROM brand WHERE status = 1 and id in(SELECT brand_id FROM marketing_partner_exclude_brand WHERE status  = 1 AND  marketing_partner_id = ?)) AS exclude_brand_list";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [marketingPartnerId, marketingPartnerId], isSingle: true })
            .then(function (result) { return result; });
    };
    PartnerRepository.prototype.getAllCategoryList = function (marketingPartnerId) {
        var sqlQuery = "SELECT 1 AS 'language_id', (SELECT JSON_ARRAYAGG(JSON_OBJECT('category_id', id, 'category_name', cat_name)) FROM category WHERE status = 1 and language_id =  1 and parent_id is null) AS include_category_list,\n            (SELECT JSON_ARRAYAGG(JSON_OBJECT('category_id', id, cat_name, cat_name)) FROM category WHERE status = 1 and language_id = 1 and parent_id is null and id in(SELECT category_id FROM marketing_partner_exclude_category WHERE status  = 1 AND  marketing_partner_id = ?)) AS exclude_category_list";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [marketingPartnerId, marketingPartnerId], isSingle: true })
            .then(function (result) { return result; });
    };
    PartnerRepository.prototype.invalidateExistingExcludeBrandList = function (marketingPartnerId) {
        var sqlQuery = "UPDATE marketing_partner_exclude_brand SET status = 0 WHERE marketing_partner_id = ?";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [marketingPartnerId] })
            .then(function (result) { return result; });
    };
    PartnerRepository.prototype.saveExcludeBrandList = function (marketingPartnerId, brandId) {
        var sqlQuery = "INSERT INTO marketing_partner_exclude_brand (marketing_partner_id,brand_id,status) VALUES (?, ?, 1)";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [marketingPartnerId, brandId] })
            .then(function (result) { return result; });
    };
    PartnerRepository.prototype.invalidateExistingExcludeCategoryList = function (marketingPartnerId) {
        var sqlQuery = "UPDATE marketing_partner_exclude_category SET status = 0 WHERE marketing_partner_id = ?";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [marketingPartnerId] })
            .then(function (result) { return result; });
    };
    PartnerRepository.prototype.saveExcludeCategoryList = function (marketingPartnerId, categoryId) {
        var sqlQuery = "INSERT INTO marketing_partner_exclude_category (marketing_partner_id,category_id, status, language_id) VALUES (?, ?, 1, 1)";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [marketingPartnerId, categoryId] })
            .then(function (result) { return result; });
    };
    PartnerRepository.prototype.supportLink = function (emailAddress, topic, queryMessage) {
        var sqlQuery = "INSERT INTO partner_support_queries (topic,message, partner_email_id, status) VALUES (?, ?, ?, 1)";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [emailAddress, topic, queryMessage] })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getInfluencerCount = function (partnerId) {
        var sqlQuery = "SELECT count(*) AS inflCount FROM influencer WHERE status = 1 AND marketing_partner = ?";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalShareCount = function (partnerId) {
        var sqlQuery = "SELECT sum(infOfrShr.share_count) AS shareCount, count(distinct infOfrShr.influencer_id) AS inflCount FROM influencer_offer_share_tracking AS infOfrShr JOIN influencer AS inf ON infOfrShr.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = ?";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getDistinctInfluencerShareCount = function (partnerId) {
        var sqlQuery = "SELECT count(distinct infOfrShr.influencer_id) AS shareCount FROM influencer_offer_share_tracking AS infOfrShr JOIN influencer AS inf ON infOfrShr.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = ?";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalBrandsShared = function () {
        var sqlQuery = "SELECT count(distinct CO.brand_id) AS distinctBrand FROM influencer_offer_share_tracking AS IOST JOIN campaign_offers AS CO ON IOST.offer_id = CO.id";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalPointsEarnedTillDate = function (partnerId) {
        var sqlQuery = "SELECT SUM(infPntsBal.total_points_earned_till_date) AS totalPointsEarned, SUM(infPntsBal.total_points_earned_this_month) AS totalPointsEarnedThisMonth FROM influencer_points_balance infPntsBal JOIN influencer AS inf ON infPntsBal.influencer_id = inf.id and inf.status = 1 AND inf.marketing_partner = ?";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalPointsEarnedThisMonth = function (partnerId) {
        var sqlQuery = "SELECT SUM(infPntsBal.total_points_earned_this_month) AS totalPointsEarnedThisMonth FROM influencer_points_balance infPntsBal JOIN influencer AS inf ON infPntsBal.influencer_id = inf.id and inf.status = 1 AND inf.marketing_partner = ?";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalPointsRedeemedTillDate = function () {
        var sqlQuery = "SELECT SUM(total_points_redeemed_till_date) AS totalPointsRedeemedTillDate FROM influencer_points_balance";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalPointsRedeemedThisMonth = function (partnerId) {
        var sqlQuery = "SELECT sum(infRedReq.points_to_redeem) AS lastMonthPoints FROM influencer_redemption_requests AS infRedReq JOIN influencer AS inf ON infRedReq.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = ? AND  MONTH(infRedReq.date_requested) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND  YEAR(infRedReq.date_requested) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH)";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalPointsGiftCardRedeemedThisMonth = function (partnerId) {
        var sqlQuery = "SELECT sum(infRedReqGift.points_to_redeem_currency_value) AS lastMonthPoints FROM influencer_redemption_requests_giftcard AS infRedReqGift JOIN influencer AS inf ON infRedReqGift.influencer_id = inf.id AND  inf.status = 1 AND inf.marketing_partner = ? AND  MONTH(infRedReqGift.date_requested) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND  YEAR(infRedReqGift.date_requested) = YEAR(CURRENT_DATE - INTERVAL 1 MONTH)";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalPointsRedeemedAsPoints = function (partnerId) {
        var sqlQuery = "SELECT sum(infRedReq.points_curreny_value) AS points FROM influencer_redemption_requests AS infRedReq JOIN influencer AS inf ON infRedReq.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = ?";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalPointsGiftCardRedeemedAsVoucher = function (partnerId) {
        var sqlQuery = "SELECT sum(infRedReqGft.points_to_redeem_currency_value) AS lastMonthPoints FROM influencer_redemption_requests_giftcard AS infRedReqGft JOIN influencer AS inf ON infRedReqGft.influencer_id = inf.id AND inf.marketing_partner = ? AND inf.status = 1 ";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalPointsEarnedYTD = function (partnerId) {
        var sqlQuery = "SELECT SUM(infErnRed.points_value_currency) AS totalPointsYTD FROM influencer_earn_redeem AS infErnRed JOIN influencer AS inf ON inf.marketing_partner = ? AND infErnRed.earned_redeemed_flag = 1 AND YEAR(infErnRed.date_earned) = YEAR(CURDATE())";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalPointsRedeemedYTD = function (partnerId) {
        var sqlQuery = "SELECT sum(infRedReq.points_curreny_value) AS points FROM influencer_redemption_requests AS infRedReq JOIN influencer AS inf ON infRedReq.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = 13 AND YEAR(infRedReq.date_requested) = YEAR(curdate());";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getTotalGIftcardPointsRedeemedYTD = function (partnerId) {
        var sqlQuery = "SELECT sum(infRedReq.points_to_redeem_currency_value) AS points FROM influencer_redemption_requests_giftcard AS infRedReq JOIN influencer AS inf ON infRedReq.influencer_id = inf.id AND inf.status = 1 AND inf.marketing_partner = 13 AND YEAR(infRedReq.date_requested) = YEAR(curdate());";
        return this.excuteQuery({ sqlQuery: sqlQuery, params: [partnerId], isSingle: true })
            .then(function (result) { return result.data; });
    };
    PartnerRepository.prototype.getDashboardData = function (partnerId) {
        var params = {
            partner_id: partnerId
        };
        return this.excuteProcedure({ procedureName: 'getPartnerPortalDashBoardDetails', params: params })
            .then(function (result) { return result; });
    };
    return PartnerRepository;
}(base_repository_1["default"]));
exports["default"] = PartnerRepository;
