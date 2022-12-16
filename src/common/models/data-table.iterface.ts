export interface IProjectionMeta {
    column: string;
    as: string;
}
export interface IQueryParam {
    tablesList: string[];
    tablesAlias: string[];
    tablesColumns: any[];
    tableIndexColumn: string;
    tablesJoins?: any[];
    tablesColumnsAlias?: string[];
    filter?: { [key: string]: any };
    pageSize?: number;
    pageNumber?: number;
    sortField?: string;
    sortOrder?: string;
    userFilter?: string;
    projection?: { column: string; as: string }[];
    sortColumns?: string[];
    isFoundRowsCount: boolean;
    isDebug?: boolean;
    isSlave?: boolean;
}

export interface IDataTableQueryParam {
    tableQuery: string;
    countQuery: string;
    havingCountQuery: boolean;
    bindingParams: string[];
    isSlave?: boolean;
}

export interface IDataTableResult {
    rows: any[];
    total: number;
    is_export?: number;
    export_message?: string;
}
