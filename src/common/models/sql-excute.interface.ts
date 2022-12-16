
export interface ISqlExcuteResult {
    status: boolean;
    data: any;
    error: any;
}

export interface ISqlExcuteParams {
    sqlQuery: string;
    params: any;
    isSingle?: boolean;
}

export interface InputParamsType {
    [key: string]: any;
}

export interface IProcedureParams {
    procedureName: string;
    params: InputParamsType;
}

export class ISpResponse {
    data: any;
    status: "SUCCESS" | "FAILURE";
    message: string;
    statusCode: number;
}
