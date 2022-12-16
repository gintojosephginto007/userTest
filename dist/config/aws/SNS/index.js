"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = __importDefault(require("../../../config/config"));
// Load the AWS SDK for Node.js
const snsParam = {
    accessKeyId: config_1.default.awsAccessKey,
    secretAccessKey: config_1.default.awsSecreteAccessKey,
    region: config_1.default.awsRegion
};
aws_sdk_1.default.config.update(snsParam);
const awsSNS = new aws_sdk_1.default.SNS({ apiVersion: config_1.default.awsSNSAppVersion });
exports.default = awsSNS;
//# sourceMappingURL=index.js.map