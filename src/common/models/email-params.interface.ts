export interface EmailTemplate {
    name: string;
    description: string;
    email_to: string;
    email_cc: string;
    email_bcc: string;
    email_from: string;
    subject: string;
    text1: string;
}

export interface EmailOptions {
    loginLink?: boolean;
    isAttachment?: boolean;
    attachment?: string | string[];
}

export interface IEmailParams {
    to: string;
    from: string;
    subject?: string;
    attachment?: string | string[];
    html?: string;
}