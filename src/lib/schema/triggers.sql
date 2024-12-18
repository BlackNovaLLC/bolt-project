-- Drop existing triggers
DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS on_task_assignment ON tasks;
DROP TRIGGER IF EXISTS on_chat_mention ON chat_messages;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for task assignments
CREATE TRIGGER on_task_assignment
  AFTER INSERT OR UPDATE OF assignee ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION handle_task_assignment();

-- Create trigger for chat mentions
CREATE TRIGGER on_chat_mention
  AFTER INSERT ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION handle_chat_mention();