import { create } from 'zustand';
import type { ChatMessage, ChatChannel } from '../types/chat';
import { AppError } from '../utils/error';
import { chatService } from '../utils/chat/services/chatService';

interface ChatState {
  messages: Record<ChatChannel, ChatMessage[]>;
  error: string | null;
  initialized: Record<ChatChannel, boolean>;
  isInitializing: boolean;
  updateMessages: (channelId: ChatChannel, messages: ChatMessage[]) => void;
  addMessage: (channelId: ChatChannel, message: ChatMessage) => void;
  sendMessage: (message: Omit<ChatMessage, 'id' | 'createdAt'>) => Promise<void>;
  clearError: () => void;
  setInitializing: (value: boolean) => void;
  initializeChannel: (channelId: ChatChannel) => Promise<() => void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: {} as Record<ChatChannel, ChatMessage[]>,
  error: null,
  initialized: {} as Record<ChatChannel, boolean>,
  isInitializing: false,

  setInitializing: (value) => set({ isInitializing: value }),

  updateMessages: (channelId, messages) => 
    set((state) => ({
      messages: {
        ...state.messages,
        [channelId]: messages,
      },
      initialized: {
        ...state.initialized,
        [channelId]: true,
      },
    })),

  addMessage: (channelId, message) =>
    set((state) => {
      const channelMessages = state.messages[channelId] || [];
      const isDuplicate = channelMessages.some(m => m.id === message.id);
      
      if (isDuplicate) return state;

      return {
        messages: {
          ...state.messages,
          [channelId]: [...channelMessages, message],
        },
      };
    }),

  sendMessage: async (messageData) => {
    try {
      const message = await chatService.sendMessage(messageData);
      set((state) => ({
        messages: {
          ...state.messages,
          [messageData.channelId]: [
            ...(state.messages[messageData.channelId] || []),
            message,
          ],
        },
        error: null,
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
      set({ 
        error: error instanceof AppError ? error.message : 'Failed to send message' 
      });
      throw error;
    }
  },

  initializeChannel: async (channelId) => {
    const state = get();
    if (state.initialized[channelId] || state.isInitializing) {
      return () => {};
    }

    set({ isInitializing: true });
    try {
      const messages = await chatService.getChannelMessages(channelId);
      set(state => ({
        messages: {
          ...state.messages,
          [channelId]: messages,
        },
        initialized: {
          ...state.initialized,
          [channelId]: true,
        },
        isInitializing: false,
      }));

      return chatService.subscribeToChannel(channelId, (message) => {
        get().addMessage(channelId, message);
      });
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      set({ 
        error: error instanceof AppError ? error.message : 'Failed to initialize chat',
        isInitializing: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));