import { number } from "@hapi/joi"

export interface IFileInfo {
    id: number;
    source: string;
    local_path: string;
    source_id: number;
    source_key: number;
    status: number;
}