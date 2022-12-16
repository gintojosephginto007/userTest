export interface SmsMetaData {
    id: number;
    type: string;
    url: string;
    username: string;
    password: string;
    from: string;
    drl_mask: string;
}

export interface SmsParams {
    templateName: string,
    to: string,
    message: string,
    sms_type: number
}

export interface SmsContent {
    [key: string]: any;
    sms_type: number;
    sub_merchant_id?: number;
}

export interface SMSTemplate {
    sms_name: string;
    title: string;
    message: string;
}