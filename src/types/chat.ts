export type ChatChannel = 
  | 'resources'
  | 'dev'
  | 'copywriting'
  | 'media-buying'
  | 'creatives'
  | 'sales'
  | 'tasks'
  | 'activity';  // Added activity channel

export interface ChatMessage {
  id: string;
  channelId: ChatChannel;
  userId: string;
  content: string;
  username: string;
  userRole: string;
  avatarUrl?: string | null;
  createdAt: string;
}