"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = __importDefault(require("../../config"));
const s3Params = {
    apiVersion: config_1.default.awsS3AppVersion,
    accessKeyId: config_1.default.awsAccessKey,
    secretAccessKey: config_1.default.awsSecreteAccessKey,
    region: config_1.default.awsRegion,
};
aws_sdk_1.default.config.update(s3Params);
const awsS3 = new aws_sdk_1.default.S3();
exports.default = awsS3;
//# sourceMappingURL=index.js.map