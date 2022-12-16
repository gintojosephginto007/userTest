export interface IQueueMessage {
    id: number;
    identified_id: number;
    notification_type: string;
    notification_cron_id: number;
    notification_trans_id: number;
    notification_message: string;
    target_table_name: string;
    records_count: number;
    loop_count: number;
    fcm_batch_limit: number;
}