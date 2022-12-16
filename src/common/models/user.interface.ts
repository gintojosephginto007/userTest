export interface IUser {
    name: any;
    link_generation_time: any;
    id?: number;
    email_address?: string;
    username?: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
    gender: any;
    status: number;
    is_login: number;
    isAdmin?: boolean;
    company_code?: string
    company_status?: number;
    company_name?: string;
    isFirstLogin?: any;
    temporary_password?: string;
    designation?: string;
    company_id?: number;
    role?: number;
    full_name?: string;
}