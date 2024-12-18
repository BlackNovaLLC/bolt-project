import React, { useEffect, useRef } from 'react';
import type { ChatChannel } from '../../types/chat';
import { useChatMessages } from '../../hooks/chat/useChatMessages';
import { ChatMessage } from './ChatMessage';
import { Loader2 } from 'lucide-react';

interface ChatMessagesProps {
  channelId: ChatChannel;
}

export function ChatMessages({ channelId }: ChatMessagesProps) {
  const { messages, error, isLoading } = useChatMessages(channelId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading messages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400 bg-red-500/10 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-center text-gray-400">
          No messages yet. Start a conversation!
        </p>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}