-- Drop existing types first
DROP TYPE IF EXISTS task_status CASCADE;
DROP TYPE IF EXISTS channel_type CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;

-- Create custom types with error handling
DO $$ BEGIN
  CREATE TYPE task_status AS ENUM ('Not Started', 'In Progress', 'Completed');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE channel_type AS ENUM (
    'resources', 'dev', 'copywriting', 'media-buying', 
    'creatives', 'sales', 'tasks', 'activity'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE notification_type AS ENUM (
    'task_assigned', 'task_updated', 'mention', 'comment'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;