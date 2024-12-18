import { supabase } from '../../../config/supabase';
import { AppError } from '../../error';
import type { ChatMessage, ChatChannel } from '../../../types/chat';

class ChatService {
  async getChannelMessages(channelId: ChatChannel): Promise<ChatMessage[]> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new AppError('User not authenticated', 'auth/unauthorized', authError);
      }

      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Chat fetch error:', error);
        throw new AppError('Failed to fetch messages', 'chat/fetch-error', error);
      }

      return data.map(msg => ({
        id: msg.id,
        channelId: msg.channel_id,
        userId: msg.user_id,
        content: msg.content,
        username: msg.username,
        userRole: msg.user_role,
        avatarUrl: msg.avatar_url,
        createdAt: msg.created_at,
      }));
    } catch (error) {
      console.error('Fetch messages error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to fetch messages', 'chat/fetch-error', error);
    }
  }

  async sendMessage(messageData: Omit<ChatMessage, 'id' | 'createdAt'>): Promise<ChatMessage> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new AppError('User not authenticated', 'auth/unauthorized', authError);
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username, role')
        .eq('id', user.id)
        .single();

      if (profileError || !profile) {
        throw new AppError('User profile not found', 'auth/profile-error', profileError);
      }

      const { data: message, error } = await supabase
        .from('chat_messages')
        .insert({
          channel_id: messageData.channelId,
          user_id: user.id,
          content: messageData.content,
          username: profile.username,
          user_role: profile.role,
          avatar_url: messageData.avatarUrl,
        })
        .select()
        .single();

      if (error) {
        throw new AppError('Failed to send message', 'chat/send-error', error);
      }

      return {
        id: message.id,
        channelId: message.channel_id,
        userId: message.user_id,
        content: message.content,
        username: message.username,
        userRole: message.user_role,
        avatarUrl: message.avatar_url,
        createdAt: message.created_at,
      };
    } catch (error) {
      console.error('Send message error:', error);
      throw error instanceof AppError 
        ? error 
        : new AppError('Failed to send message', 'chat/send-error', error);
    }
  }

  subscribeToChannel(channelId: ChatChannel, onMessage: (message: ChatMessage) => void): () => void {
    const channel = supabase
      .channel(`chat:${channelId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `channel_id=eq.${channelId}`,
        },
        (payload) => {
          if (!payload.new) return;
          const msg = payload.new;
          onMessage({
            id: msg.id,
            channelId: msg.channel_id,
            userId: msg.user_id,
            content: msg.content,
            username: msg.username,
            userRole: msg.user_role,
            avatarUrl: msg.avatar_url,
            createdAt: msg.created_at,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
}

export const chatService = new ChatService();