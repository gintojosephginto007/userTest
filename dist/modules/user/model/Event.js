"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.EventSchema = new Schema({
    influencer_id: {
        type: Number,
        required: true,
    },
    offer_id: {
        type: Number,
        required: true,
    },
    language_id: {
        type: Number,
        required: true,
        default: 1
    },
    offershare: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'offershare'
    },
    // 1: Valid / 2: Duplicate / 3: Invalid / 4: Suspect
    click_status: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        default: 1,
    },
    processed: {
        type: Boolean,
        required: true,
        default: false,
    },
    timestamp_counter_value: {
        type: String,
        required: true,
    },
    referral_share_code: {
        type: String,
        required: true
    },
    verify_sender: {
        type: Boolean,
        required: true,
        default: false,
    },
    stop_offer: {
        type: Boolean,
        required: true,
        default: false,
    },
    unknown_sender: {
        type: Boolean,
        required: true,
        default: false,
    },
    is_redirected: {
        type: Boolean,
        required: true,
        default: false,
    },
    device_id_as_cookie: {
        type: String,
        required: true
    },
    recipient_mobile_number: {
        type: String,
    },
    sponsor_id: {
        type: Number,
    },
    sponsor_name: {
        type: String,
    },
    brand_id: {
        type: Number,
    },
    brand_name: {
        type: String,
    },
    campaign_name: {
        type: String,
    },
    company_ip: {
        type: Boolean,
        required: true,
        default: false,
    },
    recipient_ip_address: { type: String },
    browser_agent: { type: String },
    platform: { type: String },
    os: { type: String },
    os_version: { type: String },
    hardware_type: { type: String },
    model: { type: String },
    ip_address_matched: { type: Boolean, default: false, },
    os_matched: { type: Boolean, default: false, },
    os_version_matched: { type: Boolean, default: false, },
    hardware_type_matched: { type: Boolean, default: false, },
    model_matched: { type: Boolean, default: false },
    location: { type: Object },
    area_code: { type: Number },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    approval_status: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true,
        default: 1,
    },
    // Click Point/Approavl Statuses
    // 1: pending for approval
    // 2: Approved by admin
    // 3: points given
    pending_for_point_status: {
        type: Number,
        enum: [1, 2, 3],
        required: true,
        default: 1,
    },
    // 1: Standard Hold, 2: 2nd Click/3rd Click, 3: Invalid
    // 4: Excessive clicks from same IP suspected non-office ( for more than 1, less than x clicks)
    // 5: Excessive clicks from same IP suspected office (for more than x clicks)
    // 6: More than X clicks in Y hour for a influencer+offer
    // 7: More than X clicks in a day for a influencer+offer
    // 8: More than X clicks cumulative TD for an influencer+offer
    // 10: Self click suspect or invalid
    // hold_reason: [{type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8]}],
    hold_reason: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    hold_reason_multiple: [{ type: Number, enum: [4, 5, 6, 7, 8, 10] }],
    approve_reject_date: {
        type: Date
    },
    hold_until: {
        type: Date
    },
    approved_rejected_by_admin_name: {
        type: String
    },
    reject_reason: {
        type: String
    },
    offer_cpc: {
        type: Number
    },
    mp_cpc_percent: {
        type: Number
    },
    i_cpc_performance_percent: {
        type: Number
    },
    value_of_one_point: {
        type: Number
    },
}, {
    timestamps: true,
    versionKey: false
});
const Event = mongoose_1.default.model("Event", exports.EventSchema);
exports.default = Event;
//# sourceMappingURL=Event.js.map