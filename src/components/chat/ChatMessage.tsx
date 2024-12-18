import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../types/chat';
import { CommandProcessor } from './CommandProcessor';
import { parseCommand } from '../../utils/commands/commandParser';
import { formatDate } from '../../utils/date/dateUtils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const command = parseCommand(message.content);

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-x-3">
        {message.avatarUrl ? (
          <img
            src={message.avatarUrl}
            alt={message.username}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-[#10a37f] flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {message.username.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-x-2">
            <span className="text-sm font-medium text-[#ececf1]">
              {message.username}
            </span>
            <span className="text-xs text-gray-400">
              {formatDate(message.createdAt)}
            </span>
          </div>
          <p className="text-sm text-[#ececf1] leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
      
      {command && (
        <div className="ml-11">
          <CommandProcessor command={command} />
        </div>
      )}
    </div>
  );
}