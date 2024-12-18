-- Enable realtime
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE 
    tasks, 
    chat_messages, 
    notifications;
COMMIT;