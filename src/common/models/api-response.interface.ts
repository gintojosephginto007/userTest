import { NextFunction, Response } from 'express'

export interface IApiResponse {
    response: Response;
    msgType?: string;
    statusFlag: boolean;
    statusCode: number;
    message?: string;
    data?: {
        [key: string]: any;
        message?: string;
    };
    error?: any;
}

export interface IpDocument extends Document {
    ip_address: string;
    city: string;
    state: string;
    country: string;
    location: any;
    area_code?: any;
    status?: boolean;
}

export interface ILocationInfoResponse {
    geoplugin_city: string;
    geoplugin_regionName: string;
    geoplugin_countryName: string;
    geoplugin_areaCode: string;
    geoplugin_latitude: string;
    geoplugin_longitude: string;
}
