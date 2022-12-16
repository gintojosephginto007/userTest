import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import config from "../../config/config";
import { IDataTableQueryParam, IDataTableResult, IQueryParam } from "../../common/models/data-table.iterface";
import { ISqlExcuteParams } from "../../common/models/sql-excute.interface";
import { dateFormatHypenYMD, rangeDateFormatHypenYMD, rangeFormat } from "../../common/validators/joi-custom-input-rules";
import masterDb from "../../config/database/mysql-master-connection";
// import slaveDb from "../../config/database/mysql-slave-connection";
import BaseRepository from "./base.repository";
const baseRepository = new BaseRepository();
class DataTableController {

    protected isNumber(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    protected parseSingleResult(result: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader) {
        return JSON.parse(JSON.stringify(result))[0] || null;
    }

    protected parseResult(result: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader) {
        return JSON.parse(JSON.stringify(result)) || null;
    }

}

export default DataTableController;
