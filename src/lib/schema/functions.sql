-- Drop existing functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS handle_task_assignment() CASCADE;
DROP FUNCTION IF EXISTS handle_chat_mention() CASCADE;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create task assignment notification function
CREATE OR REPLACE FUNCTION handle_task_assignment()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR OLD.assignee != NEW.assignee THEN
    INSERT INTO notifications (
      user_id,
      type,
      content,
      task_id,
      channel_id
    )
    SELECT 
      p.id,
      'task_assigned',
      format('You have been assigned to task: %s', NEW.title),
      NEW.id,
      NEW.channel
    FROM profiles p
    WHERE p.username = NEW.assignee;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create chat mention notification function
CREATE OR REPLACE FUNCTION handle_chat_mention()
RETURNS TRIGGER AS $$
DECLARE
  mentioned_user RECORD;
  mention TEXT;
BEGIN
  FOR mention IN
    SELECT DISTINCT substring(word FROM '@([a-zA-Z0-9_]+)')
    FROM unnest(regexp_split_to_array(NEW.content, E'\\s+')) AS word
    WHERE word LIKE '@%'
  LOOP
    SELECT id INTO mentioned_user
    FROM profiles
    WHERE username = mention;

    IF FOUND AND mentioned_user.id != NEW.user_id THEN
      INSERT INTO notifications (
        user_id,
        type,
        content,
        channel_id
      ) VALUES (
        mentioned_user.id,
        'mention',
        format('@%s mentioned you in %s chat', NEW.username, NEW.channel_id),
        NEW.channel_id
      );
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;