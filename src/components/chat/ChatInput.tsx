import React, { useState } from 'react';
import { Send } from 'lucide-react';
import type { ChatChannel } from '../../types/chat';
import { useChatStore } from '../../store/chatStore';
import { useAuthStore } from '../../store/authStore';
import { CommandPalette } from './CommandPalette';

interface ChatInputProps {
  channelId: ChatChannel;
}

export function ChatInput({ channelId }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [showCommands, setShowCommands] = useState(false);
  const { user } = useAuthStore();
  const sendMessage = useChatStore((state) => state.sendMessage);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '/' && !showCommands && message === '') {
      e.preventDefault();
      setShowCommands(true);
      setMessage('/');
    }
  };

  const handleCommandSelect = (command: string) => {
    setMessage(command);
    setShowCommands(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    sendMessage({
      channelId,
      content: message.trim(),
      userId: user.id,
      username: user.username,
      userRole: user.role,
      avatarUrl: user.avatarUrl,
    });

    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message or press / for commands..."
        className="w-full rounded-lg pr-12 py-3 pl-4 bg-[#40414f] border border-gray-600 text-[#ececf1] 
        placeholder-gray-400 focus:border-[#10a37f] focus:ring-[#10a37f] focus:ring-1 
        transition-colors duration-200"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 
        hover:text-[#10a37f] disabled:opacity-50 disabled:hover:text-gray-400 
        transition-colors duration-200"
      >
        <Send className="h-5 w-5" />
      </button>

      {showCommands && (
        <CommandPalette
          isOpen={showCommands}
          onSelect={handleCommandSelect}
          onClose={() => setShowCommands(false)}
          filter={message.slice(1)}
        />
      )}
    </form>
  );
}