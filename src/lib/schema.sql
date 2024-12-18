-- Update tasks table schema
ALTER TABLE IF EXISTS tasks RENAME COLUMN name TO title;

-- Ensure proper column types and constraints
ALTER TABLE tasks 
  ALTER COLUMN title SET NOT NULL,
  ALTER COLUMN status SET DEFAULT 'Not Started',
  ALTER COLUMN assignee SET NOT NULL,
  ALTER COLUMN created_by SET NOT NULL,
  ALTER COLUMN due_date SET NOT NULL,
  ALTER COLUMN channel SET NOT NULL;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_title ON tasks(title);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON tasks(assignee);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_channel ON tasks(channel);

-- Enable row level security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all tasks"
  ON tasks FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update assigned tasks"
  ON tasks FOR UPDATE
  USING (
    assignee = (SELECT username FROM profiles WHERE id = auth.uid())
    OR
    created_by = (SELECT username FROM profiles WHERE id = auth.uid())
  );

-- Enable realtime
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE tasks;
COMMIT;