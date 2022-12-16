"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = __importDefault(require("../../config"));
// Load the AWS SDK for Node.js
const aesParam = {
    accessKeyId: config_1.default.awsAccessKey,
    secretAccessKey: config_1.default.awsSecreteAccessKey,
    region: config_1.default.awsRegion
};
aws_sdk_1.default.config.update(aesParam);
const awsAES = new aws_sdk_1.default.SES({ apiVersion: config_1.default.awsSESAppVersion });
exports.default = awsAES;
//# sourceMappingURL=index.js.map