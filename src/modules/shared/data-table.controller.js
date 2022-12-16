"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var config_1 = require("../../config/config");
var joi_custom_input_rules_1 = require("../../common/validators/joi-custom-input-rules");
// import slaveDb from "../../config/database/mysql-slave-connection";
var base_repository_1 = require("./base.repository");
var baseRepository = new base_repository_1["default"]();
var DataTableController = /** @class */ (function () {
    function DataTableController() {
    }
    DataTableController.prototype.isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    /* protected excuteQuery({ sqlQuery, params, isSingle }: ISqlExcuteParams) {
        return masterDb.query(sqlQuery, params)
            .then(([result]) => ({
                status: true,
                data: isSingle ? this.parseSingleResult(result) : this.parseResult(result),
                error: null
            }));
    } */
    /* protected slaveExcuteQuery({ sqlQuery, params, isSingle }: ISqlExcuteParams) {
        return slaveDb.query(sqlQuery, params)
            .then(([result]) => ({
                status: true,
                data: isSingle ? this.parseSingleResult(result) : this.parseResult(result),
                error: null
            }));
    } */
    DataTableController.prototype.parseSingleResult = function (result) {
        return JSON.parse(JSON.stringify(result))[0] || null;
    };
    DataTableController.prototype.parseResult = function (result) {
        return JSON.parse(JSON.stringify(result)) || null;
    };
    DataTableController.prototype.dataTableQuery = function (queryParam) {
        try {
            var tableQuery = queryParam.tableQuery, countQuery_1 = queryParam.countQuery, havingCountQuery_1 = queryParam.havingCountQuery, bindingParams_1 = queryParam.bindingParams, isSlave = queryParam.isSlave;
            if (!tableQuery || !countQuery_1) {
                throw new Error("(dataTableQuery) Parameter missing");
            }
            /* if (isSlave) {
                return baseRepository.slaveExcuteQuery({ sqlQuery: tableQuery, params: bindingParams })
                    .then((result) => {
                        const data: IDataTableResult = {
                            rows: [],
                            total: 0
                        };
                        if (!result.status) {
                            return data;
                        }
                        data["rows"] = result.data;
                        return baseRepository
                            .slaveExcuteQuery({ sqlQuery: countQuery, params: bindingParams, isSingle: !havingCountQuery })
                            // .then((countResult) => ({ rows: data.rows, total: countResult.data.total }));
                            .then((countResult) => ({ rows: data.rows, total: !havingCountQuery ? countResult.data.total : countResult.data.length }));
                    }).catch((err) => {
                        throw err;
                    });
            } */
            return baseRepository.excuteQuery({ sqlQuery: tableQuery, params: bindingParams_1 })
                .then(function (result) {
                var data = {
                    rows: [],
                    total: 0
                };
                if (!result.status) {
                    return data;
                }
                data["rows"] = result.data;
                return baseRepository
                    .excuteQuery({ sqlQuery: countQuery_1, params: bindingParams_1, isSingle: !havingCountQuery_1 })
                    // .then((countResult) => ({ rows: data.rows, total: countResult.data.total }));
                    .then(function (countResult) { return ({ rows: data.rows, total: !havingCountQuery_1 ? countResult.data.total : countResult.data.length }); });
            })["catch"](function (err) {
                throw err;
            });
        }
        catch (error) {
            throw error;
        }
    };
    /* protected slaveDataTableQuery(queryParam: IDataTableQueryParam): Promise<IDataTableResult> {
        try {
            const { tableQuery, countQuery, havingCountQuery, bindingParams } = queryParam;
            if (!tableQuery || !countQuery) {
                throw new Error("(dataTableQuery) Parameter missing");
            }

            return this.slaveExcuteQuery({ sqlQuery: tableQuery, params: bindingParams })
                .then((result) => {
                    const data: IDataTableResult = {
                        rows: [],
                        total: 0
                    };
                    if (!result.status) {
                        return data;
                    }
                    data["rows"] = result.data;
                    return this.slaveExcuteQuery({ sqlQuery: countQuery, params: bindingParams, isSingle: true })
                        .then((countResult) => ({ rows: data.rows, total: countResult.data ? countResult.data.total : 0 }));
                }).catch((err) => {
                    throw err;
                });
        } catch (error) {
            throw error;
        }
    } */
    DataTableController.prototype.generateQuery = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var projectionList, aTables, tAlias, tColumns, aTableJoins, sIndexColumn, tablesJoins, filters, tablesColumnsAlias, userFilter, sortField, sTable, aColumns, aWhere, aWhereBind, isFoundRowsCount, countQuery, isDebug, exportWhere, exportFinalWhere, exportQuery, tableIndex, tableAlias, cTableColumns, _i, cTableColumns_1, cColumn, filterValue, isDate, isNumber, isRange, isExport, isDateRange, splitArray, fromFieldValue, toFieldValue, splitArray, fromFieldValue, toFieldValue, collectColumnAliase, key, columWithAliase, typeOfColumn, sOrder, sLimit, sWhere, sHaving, strColumns, sQuery, havingCountQuery, queryResponse, exportData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        projectionList = params.projection;
                        aTables = params.tablesList || [];
                        tAlias = params.tablesAlias || [];
                        tColumns = params.tablesColumns || [];
                        aTableJoins = params.tablesJoins || [];
                        sIndexColumn = params.tableIndexColumn;
                        tablesJoins = [[]];
                        filters = params.filter;
                        tablesColumnsAlias = params.tablesColumnsAlias;
                        userFilter = params.userFilter || "";
                        sortField = params.sortField || "";
                        sTable = "";
                        aColumns = [];
                        aWhere = [];
                        aWhereBind = [];
                        isFoundRowsCount = params.isFoundRowsCount || false;
                        countQuery = void 0;
                        isDebug = (params.isDebug || config_1["default"].isDebugDataTable) || false;
                        exportWhere = [];
                        exportFinalWhere = '';
                        exportQuery = '';
                        if (!aTables.length) {
                            throw new Error("tables list or table name missing");
                        }
                        if (!tColumns.length) {
                            throw new Error("tables columns missing");
                        }
                        if (aTableJoins.length) {
                            tablesJoins = __spreadArray([[]], aTableJoins);
                        }
                        if (!sIndexColumn) {
                            throw new Error("table index column defination missing");
                        }
                        // tslint:disable-next-line: forin
                        for (tableIndex in aTables) {
                            tableAlias = aTables[tableIndex];
                            cTableColumns = tColumns[tableIndex];
                            // get table alias from params alias array using current table index
                            if (tAlias.length) {
                                tableAlias = tAlias[tableIndex];
                            }
                            if (cTableColumns) {
                                // cColumn = current column of iteration
                                for (_i = 0, cTableColumns_1 = cTableColumns; _i < cTableColumns_1.length; _i++) {
                                    cColumn = cTableColumns_1[_i];
                                    aColumns.push(tableAlias + "." + cColumn);
                                    if (sortField && cColumn === sortField) {
                                        sortField = "" + (tableAlias + "." + cColumn);
                                    }
                                    if (filters !== undefined && (filters[cColumn] || this.isNumber(filters[cColumn]))) {
                                        filterValue = filters[cColumn];
                                        isDate = joi_custom_input_rules_1.dateFormatHypenYMD.test(filters[cColumn]);
                                        isNumber = this.isNumber(filters[cColumn]);
                                        isRange = joi_custom_input_rules_1.rangeFormat.test(filterValue);
                                        isExport = filters["exportType"] || null;
                                        isDateRange = joi_custom_input_rules_1.rangeDateFormatHypenYMD.test(filterValue);
                                        if (isNumber || isDate) {
                                            if (filters['exportType']) {
                                                if (isDate) {
                                                    exportWhere.push(" " + (tAlias[tableIndex] + "." + cColumn) + " = \"" + filters[cColumn] + "\"");
                                                }
                                                else {
                                                    exportWhere.push(" " + (tAlias[tableIndex] + "." + cColumn) + " = " + filters[cColumn]);
                                                }
                                            }
                                            aWhere.push(" " + (tableAlias + "." + cColumn) + " = ?");
                                            aWhereBind.push("" + filters[cColumn]);
                                        }
                                        else if (isRange) {
                                            splitArray = filterValue.split(":");
                                            fromFieldValue = parseFloat(splitArray[0]);
                                            toFieldValue = parseFloat(splitArray[1]);
                                            if (filters['exportType']) {
                                                exportWhere.push(" " + (tAlias[tableIndex] + "." + cColumn) + " BETWEEN " + fromFieldValue + " AND " + toFieldValue);
                                            }
                                            aWhere.push(" " + (tableAlias + "." + cColumn) + " BETWEEN ? AND ?");
                                            aWhereBind.push.apply(aWhereBind, [fromFieldValue, toFieldValue]);
                                        }
                                        else if (isDateRange) {
                                            splitArray = filterValue.split(":");
                                            fromFieldValue = splitArray[0];
                                            toFieldValue = splitArray[1];
                                            aWhere.push(" " + (tableAlias + "." + cColumn) + " BETWEEN ? AND ?");
                                            aWhereBind.push.apply(aWhereBind, [fromFieldValue, toFieldValue]);
                                        }
                                        else {
                                            if (filters['exportType']) {
                                                exportWhere.push(" " + (tAlias[tableIndex] + "." + cColumn) + " LIKE \"" + filters[cColumn] + "%\"");
                                            }
                                            aWhere.push(" " + (tableAlias + "." + cColumn) + " LIKE ? ");
                                            aWhereBind.push("%" + filterValue + "%");
                                        }
                                    }
                                }
                            }
                            if (tableIndex === "0") {
                                sIndexColumn = tableAlias + "." + sIndexColumn;
                                sTable += aTables[tableIndex] + " AS " + tableAlias;
                            }
                            else {
                                if (tableAlias === "users") {
                                    sTable += " JOIN " + aTables[tableIndex] + " AS " + tableAlias + " ON " + tableAlias + "." + tablesJoins[tableIndex].join(" = ") + " ";
                                }
                                else {
                                    sTable += " LEFT JOIN " + aTables[tableIndex] + " AS " + tableAlias + " ON " + tableAlias + "." + tablesJoins[tableIndex].join(" = ") + " ";
                                }
                            }
                        }
                        if (tablesColumnsAlias && tablesColumnsAlias.length) {
                            collectColumnAliase = [];
                            for (key in tablesColumnsAlias) {
                                if (key) {
                                    columWithAliase = tablesColumnsAlias[key];
                                    typeOfColumn = typeof columWithAliase;
                                    if (typeOfColumn === 'object') {
                                        collectColumnAliase.push(columWithAliase[0]);
                                    }
                                    else {
                                        collectColumnAliase.push(columWithAliase);
                                    }
                                }
                            }
                            aColumns = __spreadArray(__spreadArray([], aColumns), collectColumnAliase);
                        }
                        sOrder = this.getOrderBy(params);
                        sLimit = this.getLimit(params);
                        sWhere = "";
                        /*
                        * Global Filter`
                        */
                        // if (userFilter) {
                        //     sWhere = "WHERE " + userFilter;
                        // }
                        if (aWhere.length) {
                            sWhere = (!sWhere.length ? "WHERE" : " AND ") + aWhere.join(" AND ");
                        }
                        /*
                        * Global Filter`
                        */
                        if (userFilter) {
                            if (sWhere.length) {
                                sWhere = sWhere + " " + userFilter;
                            }
                            else {
                                if (userFilter.match(/AND/g)) {
                                    sWhere = "WHERE 1=1 " + userFilter;
                                }
                                else {
                                    sWhere = userFilter;
                                }
                            }
                        }
                        sHaving = this.getHavingClause(params);
                        strColumns = aColumns.join(", ");
                        sQuery = "SELECT " + strColumns + " ";
                        sQuery += "FROM " + sTable + " ";
                        if (filters && filters['exportType']) {
                            if (exportWhere.length) {
                                exportFinalWhere += 'WHERE ' + exportWhere.join(" AND ");
                            }
                            if (userFilter) {
                                if (exportWhere.length) {
                                    exportFinalWhere += ' AND ' + userFilter;
                                }
                                else {
                                    exportFinalWhere += 'WHERE ' + userFilter;
                                }
                            }
                            exportQuery = sQuery;
                            exportQuery += exportFinalWhere + " ";
                            exportQuery += sHaving + " ";
                            exportQuery += sOrder + " ";
                        }
                        if (sWhere) {
                            sQuery += sWhere + " ";
                        }
                        if (sHaving) {
                            sQuery += sHaving + " ";
                        }
                        if (sOrder) {
                            sQuery += sOrder + " ";
                        }
                        if (sLimit) {
                            sQuery += sLimit + ";";
                        }
                        havingCountQuery = false;
                        /*
                        * Count Query
                        */
                        countQuery = "SELECT COUNT(" + sIndexColumn + ") AS total FROM " + sTable + " " + sWhere + ";";
                        if (isFoundRowsCount) {
                            countQuery = "SELECT FOUND_ROWS() AS total;";
                        }
                        if (sQuery.includes("HAVING") || sQuery.includes("GROUP BY")) {
                            havingCountQuery = true;
                            countQuery = "SELECT " + strColumns + " FROM " + sTable + " " + sWhere + " " + sHaving;
                        }
                        if (isDebug) {
                            // tslint:disable-next-line: no-console
                            console.log('===== Start Query Debug =====');
                            // tslint:disable-next-line: no-console
                            console.log('===== Main Query =====');
                            // tslint:disable-next-line: no-console
                            console.log(sQuery);
                            // tslint:disable-next-line: no-console
                            console.log('===== Where Bind Params =====');
                            // tslint:disable-next-line: no-console
                            console.log(aWhereBind);
                            // tslint:disable-next-line: no-console
                            console.log('===== Count Query =====');
                            // tslint:disable-next-line: no-console
                            console.log(countQuery);
                            // tslint:disable-next-line: no-console
                            console.log('===== Count Query Where Bind Params =====');
                            // tslint:disable-next-line: no-console
                            console.log(aWhereBind);
                            // tslint:disable-next-line: no-console
                            console.log('===== End Query Debug =====');
                        }
                        // tslint:disable-next-line: no-console
                        console.log(sQuery);
                        return [4 /*yield*/, this.dataTableQuery({
                                tableQuery: sQuery,
                                countQuery: countQuery,
                                havingCountQuery: havingCountQuery,
                                bindingParams: aWhereBind,
                                isSlave: params.isSlave || false
                            })];
                    case 1:
                        queryResponse = _a.sent();
                        // .catch((err) => {
                        //     throw err;
                        // });
                        if (filters && filters['exportType']) {
                            exportData = {
                                sql_query: JSON.stringify({ exportQuery: exportQuery, countQuery: queryResponse.total, projection: projectionList }),
                                report_type: filters['exportType'],
                                email: filters['email'],
                                request_by: filters['request_by'],
                                report_name: filters['reportName']
                            };
                            // await sharedRepository.inserExportData(exportData);
                            queryResponse["is_export"] = 1;
                            queryResponse["export_message"] = "Your export report request has been placed successfully, we will email you the download link shortly";
                        }
                        return [2 /*return*/, queryResponse];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DataTableController.prototype.getLimit = function (params) {
        var sLimit = "LIMIT 10";
        if (params && params.pageSize && params.pageNumber !== -1) {
            var offset = (params.pageNumber - 1) * params.pageSize;
            sLimit = "LIMIT " + params.pageSize + " OFFSET " + offset;
        }
        return sLimit;
    };
    DataTableController.prototype.getOrderBy = function (params) {
        var sOrder = "";
        var sortColumns = params.sortColumns || [];
        if (params && params.sortField && params.sortOrder && sortColumns.indexOf(params.sortField) !== -1) {
            sOrder = "ORDER BY ";
            sOrder += params.sortField + " ";
            sOrder += "" + (params.sortOrder === "asc" ? "asc" : "desc");
            if (sOrder === "ORDER BY ") {
                sOrder = "";
            }
        }
        return sOrder;
    };
    DataTableController.prototype.getHavingClause = function (params) {
        // const dateFormatHypenYMD = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        // const rangeFormat = /\d:\d/;
        /* const filterValue = filters[cColumn];
        const isDate = dateFormatHypenYMD.test(filters[cColumn]);
        const isNumber = typeof filterValue === "number";
        const isRange = rangeFormat.test(filterValue);
        const isExport = filters["exportType"] || null; */
        var sHaving = "";
        var aHaving = [];
        var filters = params.filter;
        var tablesColumnsAlias = params.tablesColumnsAlias;
        var aHavingBind = [];
        if (params && params.filter !== undefined && tablesColumnsAlias) {
            for (var key in tablesColumnsAlias) {
                if (key) {
                    var columWithAliase = tablesColumnsAlias[key];
                    var typeOfColumn = typeof columWithAliase;
                    if (typeOfColumn === 'string') {
                        var cAlias = columWithAliase.slice(columWithAliase.lastIndexOf(" AS ") + 4);
                        if (filters[cAlias] || this.isNumber(filters[cAlias])) {
                            var filtersAlias = filters[cAlias];
                            if (typeof filters[cAlias] === "number") {
                                aHaving.push(" " + cAlias + " = " + filtersAlias);
                                // aHaving.push(` (${cAlias} BETWEEN 0 AND ${filtersAlias})`);
                            }
                            else if (joi_custom_input_rules_1.dateFormatHypenYMD.test(filtersAlias)) {
                                aHaving.push(" " + cAlias + " = \"" + filtersAlias + "\"");
                            }
                            else if (joi_custom_input_rules_1.rangeFormat.test(filtersAlias)) {
                                var splitArray = filtersAlias.split(":");
                                var fromFieldValue = parseFloat(splitArray[0]);
                                var toFieldValue = parseFloat(splitArray[1]);
                                aHaving.push("(" + cAlias + " BETWEEN " + fromFieldValue + " AND " + toFieldValue + ")");
                            }
                            else if (joi_custom_input_rules_1.rangeDateFormatHypenYMD.test(filtersAlias)) {
                                var splitArray = filtersAlias.split(":");
                                var fromFieldValue = splitArray[0];
                                var toFieldValue = splitArray[1];
                                aHaving.push("(" + cAlias + " BETWEEN " + fromFieldValue + " AND " + toFieldValue + ")");
                            }
                            else {
                                aHaving.push(" " + cAlias + " LIKE \"%" + filtersAlias + "%\"");
                            }
                        }
                    }
                    if (typeOfColumn === 'object' && columWithAliase.length === 3) {
                        var indexColumnWithAliase = columWithAliase[0];
                        var indexOperator = columWithAliase[1];
                        var compareColumn = columWithAliase[2];
                        var cAlias = indexColumnWithAliase.slice(indexColumnWithAliase.lastIndexOf(" AS ") + 4);
                        if (filters[cAlias] && filters[compareColumn]) {
                            aHaving.push(" " + cAlias + " " + indexOperator + " \"" + filters[cAlias] + "\"");
                        }
                        else {
                            if (filters[cAlias]) {
                                aHaving.push(" " + cAlias + " = \"" + filters[cAlias] + "\"");
                            }
                        }
                    }
                }
            }
        }
        if (aHaving.length) {
            sHaving = "HAVING " + aHaving.join(" AND ") + " ";
        }
        return sHaving;
    };
    return DataTableController;
}());
exports["default"] = DataTableController;
