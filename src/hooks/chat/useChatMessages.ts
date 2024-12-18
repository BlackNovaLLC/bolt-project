import { useEffect, useState } from 'react';
import { useChatStore } from '../../store/chatStore';
import type { ChatChannel } from '../../types/chat';

export function useChatMessages(channelId: ChatChannel) {
  const { 
    messages,
    error,
    initialized,
    isInitializing,
    initializeChannel,
  } = useChatStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!initialized[channelId] && !isInitializing) {
      let cleanup: (() => void) | undefined;
      
      const initialize = async () => {
        try {
          setIsLoading(true);
          cleanup = await initializeChannel(channelId);
        } catch (error) {
          console.error('Failed to initialize chat:', error);
        } finally {
          setIsLoading(false);
        }
      };

      initialize();

      return () => {
        if (cleanup) cleanup();
      };
    } else {
      setIsLoading(false);
    }
  }, [channelId, initialized, isInitializing, initializeChannel]);

  return {
    messages: messages[channelId] || [],
    error,
    isLoading: isLoading || isInitializing,
  };
}